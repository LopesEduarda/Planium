import axios from 'axios'
import { useForm } from "react-hook-form";
import { goBack } from '../../router/Coordinator';
import { useNavigate } from 'react-router';
import { url } from './../../constants/baseUrl';
import styled from 'styled-components'

export const EstilizacaoDivPrincipal = styled.div`
        display: flex;
        flex-direction: column;
        input {
                width: 200px;
        }
        select {
                width: 200px;
        }
        button {
                width: 250px;
        }
`

export const AddBeneficiaries = () => {

    const { register, handleSubmit, watch, resetField, formState: { errors } } = useForm({ defaultValues: { qntdBeneficiarios: 1 }, shouldUnregister: true })
    // register: quais inputs do formulário vamos registrar
    // handleSubmit: lidará com o envio das informações que estão no nosso input
    // errors: aviso de erros na hora da validação 

    // const navigate = useNavigate()

    const handleBack = (event) => {
        event.preventDefault();
        // goBack(navigate)
    }

    const quantity = watch('quantity')
    const handleClick = () => resetField('quantity', 'beneficiaries')


    const onSubmitForm = async (data) => {

        let chosenPlan = {
            "quantity": data.quantity,
            "plan": data.plan,
            "beneficiaries": data.beneficiaries
        }

        await axios.post(`${url}addbeneficiaries`, chosenPlan)
            .then((res) => {
                alert('Beneficiary created successfully!')
                window.stop()
            })
            .catch((error) => {
                console.log(error)
            })

    }

    return (
        <div>
            <div className='card-post' >
                <h1>Adicionar beneficiário</h1>

                <form onSubmit={handleSubmit(data => onSubmitForm(data))}>
                    <EstilizacaoDivPrincipal>
                        <div className='fields'>
                            <label>Plano escolhido:</label>
                            <br />
                            <input placeholder={"Plano escolhido"} type='number' {...register('plan', { required: 'É necessário digitar o número do plano escolhido!', valueAsNumber: true })} />
                            <span style={{ color: 'red' }}>{errors?.plan?.message}</span>
                        </div>
                        <br />

                        <div className='fields'>
                            <label>Quantos beneficiários deseja cadastrar?</label>
                            <br />
                            <input placeholder={"Quantidade de beneficiários"} type='number' min={1}  {...register('quantity', { required: 'É necessário escolher quantos beneficiadores serão cadastrados no plano escolhido!', valueAsNumber: true })} />
                            <span style={{ color: 'red' }}>{errors?.quantity?.message}</span>
                        </div>
                        <br />

                        <div className='fields'>
                            <label>Preencha seus beneficiários:</label>
                            <br />
                            {quantity > 0 && Array.from(Array(Number(quantity))).map((_, index) => {
                                return (
                                    <div key={index}>
                                        <p> Digite as informações do beneficiario número: {index + 1}</p>
                                        <input placeholder={"Nome"} {...register(`beneficiaries.${index}.name`, { required: 'Digite o nome' })} />
                                        <span style={{ color: 'red' }}>{errors?.beneficiaries?.[index]?.name?.message}</span>

                                        <input placeholder={"Idade"} type='number' {...register(`beneficiaries.${index}.age`, { required: 'Digite a idade', valueAsNumber: true })} />
                                        <span style={{ color: 'red' }}>{errors?.beneficiaries?.[index]?.age?.message}</span>
                                        <br />
                                        <br />
                                    </div>
                                )
                            })}

                            <button onClick={handleClick}>Cadastrar beneficiário</button>
                        </div>
                    </EstilizacaoDivPrincipal>
                </form>

            </div>
        </div>
    )
}