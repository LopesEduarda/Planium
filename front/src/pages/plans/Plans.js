import axios from 'axios';
import { useEffect, useState } from 'react';
import { url } from './../../constants/baseUrl';
import { goBack } from '../../router/Coordinator';
import { useNavigate } from 'react-router';
import Card from 'react-bootstrap/Card';
import { DivMain, TitleH2 } from './style'

export const Plans = () => {
    const [plans, setPlans] = useState([]);
    const navigate = useNavigate()

    const handleBack = (event) => {
        event.preventDefault();
        goBack(navigate)
    }

    const showPlans = () => {
        axios.get(`${url}plans`)
            .then((res) => {
                console.log(res.data)
                setPlans(res.data.getPlans)
            })
            .catch((er) => {
                console.error(er)
            })
    }

    useEffect(() => {
        showPlans()
    }, [])

    const list = plans && plans.map((p) => {
        return (
            <Card style={{ width: '18rem' }}>
                <Card.Body>
                    <Card.Title>{p.nome}</Card.Title>
                    <Card.Text>
                        Registro: {p.registro}
                        <br />
                        Código: {p.codigo}
                    </Card.Text>
                </Card.Body>
            </Card>
        )
    })

    return (
        <DivMain>
            <TitleH2>Planos disponíveis</TitleH2>
            {list}
            <br />
            <button onClick={handleBack}>Voltar para a página inicial</button>
        </DivMain>
    )
}