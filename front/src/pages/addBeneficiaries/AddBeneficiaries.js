import axios from 'axios'
import { useForm } from "react-hook-form";
import { goBack } from '../../router/Coordinator';
import { useNavigate } from 'react-router';
import { url } from './../../constants/baseUrl';
import { DivMain, TitleH2 } from './style'
import Card from 'react-bootstrap/Card';


export const AddBeneficiaries = () => {

    const { register, handleSubmit, watch, resetField, formState: { errors } } = useForm({ defaultValues: { quantity: 1 }, shouldUnregister: true })
    // register: quais inputs do formulário vamos registrar
    // handleSubmit: lidará com o envio das informações que estão no nosso input
    // errors: aviso de erros na hora da validação 

    const navigate = useNavigate()

    const handleBack = (event) => {
        event.preventDefault();
        goBack(navigate)
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
        <DivMain>
            <TitleH2>Cadastro de beneficiários</TitleH2>
            <Card style={{ width: '30rem', padding: '10px' }}>
                <form onSubmit={handleSubmit(data => onSubmitForm(data))}>

                    <p> Insira o número do plano desejado:</p>
                    <input placeholder={"Plano desejado"} type='number' {...register('plan', { required: 'É necessário digitar o número do plano desejado!', valueAsNumber: true })} />
                    <span style={{ color: 'red' }}>{errors?.plan?.message}</span>
                    <br />
                    <br />
                    <p> Quantos beneficiários gostaria de cadastrar?</p>
                    <input placeholder={"Quantidade de beneficiários"} type='number' min={1}  {...register('quantity', { required: 'É necessário escolher a quantidade de beneficiários que serão cadastrados!', valueAsNumber: true })} />
                    <span style={{ color: 'red' }}>{errors?.quantity?.message}</span>
                    <br />
                    <br />
                    <p> Preencha as informações de seus beneficiários: </p>
                    {quantity > 0 && Array.from(Array(Number(quantity))).map((_, index) => {
                        return (
                            <div key={index}>
                                <p> Digite as informações do beneficiário número: {index + 1}</p>
                                <input placeholder={"Nome"} {...register(`beneficiaries.${index}.name`, { required: 'Digite o nome do beneficiário' })} />
                                <span style={{ color: 'red' }}>{errors?.beneficiaries?.[index]?.name?.message}</span>

                                <input placeholder={"Idade"} type='number' {...register(`beneficiaries.${index}.age`, { required: 'Digite a idade do beneficiário', valueAsNumber: true })} />
                                <span style={{ color: 'red' }}>{errors?.beneficiaries?.[index]?.age?.message}</span>
                            </div>
                        )
                    })}
                </form>
            </Card>
            <br />
            <button onClick={handleClick} > Cadastrar beneficiários </button>
            <br />
            <button onClick={handleBack}>Voltar para a página inicial</button>
        </DivMain>
    )
}