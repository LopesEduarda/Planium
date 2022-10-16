import axios from 'axios'
import { useEffect, useState } from 'react';
import { goBack } from '../../router/Coordinator';
import { url } from './../../constants/baseUrl';
import { useNavigate } from 'react-router';
import Card from 'react-bootstrap/Card';
import { DivMain, TitleH2 } from './style'

export const Beneficiaries = () => {
    const [beneficiaries, setBeneficiaries] = useState([])
    const navigate = useNavigate()

    const handleBack = (event) => {
        event.preventDefault();
        goBack(navigate)
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
            <Card style={{ width: '18rem' }}>
                <Card.Body>
                    <Card.Title>{p.nome}</Card.Title>
                    <Card.Text>
                        <p>Número do plano escolhido: {p.plan}</p>
                        <p>Número de Beneficiários: {p.quantity}</p>
                        <p>Beneficiários:</p>
                        {p.beneficiaries.map((b) => {
                            return (
                                <p>Nome: {b.name}, Idade: {b.age}</p>
                            )
                        })}
                    </Card.Text>
                </Card.Body>
            </Card>
        )
    })

    useEffect(() => {
        showBeneficiaries()
    }, [])

    return (
        <DivMain>
            <TitleH2> Lista de Beneficiários </TitleH2>
            {list}
            <br />
            <button onClick={handleBack}>Voltar para a página inicial</button>
        </DivMain>
    )
}