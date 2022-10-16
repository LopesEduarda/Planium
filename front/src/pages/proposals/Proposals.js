import axios from 'axios'
import { useEffect, useState } from 'react';
import { url } from './../../constants/baseUrl';
import { useNavigate } from 'react-router';
import { goBack } from '../../router/Coordinator';
import Card from 'react-bootstrap/Card';
import { DivMain, TitleH2 } from './style'

export const Proposals = () => {
    const [proposals, setProposals] = useState([])
    const navigate = useNavigate()

    const handleBack = (event) => {
        event.preventDefault();
        goBack(navigate)
    }

    const showProposals = () => {
        axios.get(`${url}proposals`)
            .then((res) => {
                console.log(res.data)
                setProposals(res.data.getProposals)
            })
            .catch((er) => {
                console.error(er)
            })
    }

    const list = proposals.map((p) => {
        return (
            <Card style={{ width: '20rem' }}>
                <Card.Body>
                    <Card.Title><p>Plano escolhido: {p.plan}</p></Card.Title>
                    <Card.Text>
                        <p>Número de Beneficiadores: {p.quantity}</p>
                        <p>Beneficiários:</p>

                        {p.beneficiaries.map((proposal) => {
                            return (
                                <p>Nome: {proposal.name}, Idade: {proposal.age}, Preço: {proposal.price}</p>
                            )
                        })}
                        <p> Preço total da proposta: {p.finalPrice}</p>
                    </Card.Text>
                </Card.Body>
            </Card>
        )
    })

    useEffect(() => {
        showProposals()
    }, [])

    return (
        <DivMain>
            <TitleH2>Propostas</TitleH2>
            {list}
            <br />
            <button onClick={handleBack}>Voltar para a página inicial</button>
        </DivMain>
    )
}