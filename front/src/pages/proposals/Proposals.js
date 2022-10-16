import axios from 'axios'
import { useEffect, useState } from 'react';
import { url } from './../../constants/baseUrl';
import { useNavigate } from 'react-router';

export const Proposals = () => {

    // const navigate = useNavigate()
    const [proposals, setProposals] = useState([])
    console.log(proposals)

    const handleBack = (event) => {
        event.preventDefault();
        // goBack(navigate)
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
            <div key={p.id}>
                <div>
                    <p>ID: {p.id}</p>
                    <p>Plano escolhido: {p.plan}</p>
                    <p>Número de Beneficiadores: {p.quantity}</p>
                    <p>Beneficiários:</p>

                    {p.beneficiaries.map((proposal) => {
                        return (
                            <p>Nome: {proposal.name}, Idade: {proposal.age}, Preço: {proposal.price}</p>
                        )
                    })}

                    <p> Preço total da proposta: {p.finalPrice}</p>
                </div>
            </div>
        )
    })

    useEffect(() => {
        showProposals()
    }, [])

    return (
        <div>
            <button onClick={handleBack}>Voltar</button>
            <h1>Propostas</h1>
            {list}
        </div>
    )
}