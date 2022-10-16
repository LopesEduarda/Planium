import React from "react"
import axios from 'axios'
import { useEffect, useState } from 'react';
import { url } from './../../constants/baseUrl';
import { useNavigate } from 'react-router';
import { goBack } from '../../router/Coordinator';
import Card from 'react-bootstrap/Card';
import { DivMain, TitleH2 } from './style'

export const Prices = () => {
    const [prices, setPrices] = useState([])
    const navigate = useNavigate()

    const handleBack = (event) => {
        event.preventDefault();
        goBack(navigate)
    }

    const showPrices = () => {
        axios.get(`${url}prices`)
            .then((res) => {
                console.log(res.data)
                setPrices(res.data.getPrices)
            })
            .catch((er) => {
                console.error(er)
            })
    }

    const list = prices && prices.map((p) => {
        return (
            <Card style={{ width: '18rem' }}>
                <Card.Body>
                    <Card.Title>Código do plano: {p.codigo}</Card.Title>
                    <Card.Text>
                    <Card.Subtitle className="mb-2 text-muted">Número mínimo de beneficiadores desse plano: {p.minimo_vidas}</Card.Subtitle>
                    <p>Valor do plano para pessoas com idade até 17 anos: {p.faixa1},00</p>
                    <p>Valor do plano para pessoas com idade entre 18 e 40 anos: {p.faixa2},00</p>
                    <p>Valor do plano para pessoas com idade à partir de 41 anos: {p.faixa3},00</p>
                    </Card.Text>
                </Card.Body>
            </Card>
        )
    })

    useEffect(() => {
        showPrices()
    }, [])

    return (
        <DivMain>
            <TitleH2> Lista de Preços </TitleH2>
            {list}
            <br />
            <button onClick={handleBack}>Voltar para a página inicial</button>
        </DivMain>
    )

}