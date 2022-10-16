import axios from 'axios';
import { useEffect, useState } from 'react';
import { url } from './../../constants/baseUrl';

export const Plans = () => {
    const [plans, setPlans] = useState([]);
    console.log('console', plans && plans)
    const handleBack = (event) => {
        event.preventDefault();
        // goBack(navigate)
    }

    const showPlans = () => {
        axios.get(`${url}plans`)
            .then((res) => {
                // console.log(res.data)
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
            <div key={p.codigo}>
                <div>
                    <p>Registro: {p.registro}</p>
                    <p>Nome: {p.nome}</p>
                    <p>Código: {p.codigo}</p>
                </div>
            </div>
        )
    })

    return (
        <div>
            <button onClick={handleBack}>Voltar</button>
            <h2>Planos</h2>
            {list}
        </div>
    )
}