import axios from 'axios'
import { useEffect, useState } from 'react';
import { goBack } from '../../router/Coordinator';
import { url } from './../../constants/baseUrl';
import { useNavigate } from 'react-router';

export const Beneficiaries = () => {
    const [beneficiaries, setBeneficiaries] = useState([])
    // const navigate = useNavigate()

    const handleBack = (event) => {
        event.preventDefault();
        // goBack(navigate)
    }

    const showBeneficiaries = () => {
        axios.get(`${url}beneficiaries`)
            .then((res) => {
                console.log(res.data)
                setBeneficiaries(res.data.getBeneficiaries)
            })
            .catch((er) => {
                console.error(er)
            })
    }

    const list = beneficiaries && beneficiaries.map((p) => {
        return (
            <div key={p.id}>
                <div>
                    <p>ID: {p.id}</p>
                    <p>Registro Escolhido: {p.plan}</p>
                    <p>Número de Beneficiários: {p.quantity}</p>
                    <p>Beneficiários:</p>
                    {p.beneficiaries.map((b) => {
                        return (
                            <p>Nome: {b.name}, Idade: {b.age}</p>
                        )
                    })}

                </div>
            </div>
        )
    })

    useEffect(() => {
        showBeneficiaries()
    }, [])

    return (
        <div>
            <button onClick={handleBack}>Voltar</button>
            <h1> Lista de Beneficiários </h1>
                {list}
        </div>
    )
}