import React from "react"
import axios from 'axios'
import { useEffect, useState } from 'react';
import { url } from './../../constants/baseUrl';
import { useNavigate } from 'react-router';
import { goBack } from '../../router/Coordinator';


export const Prices = () => {
    const [prices, setPrices] = useState([])


    const handleBack = (event) => {
        event.preventDefault();
        // goBack(navigate)
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
            <div>
                <div>
                    <p>Código: {p.codigo}</p>
                    <p>Número mínimo de beneficiadores desse plano: {p.minimo_vidas}</p>
                    <p>Valor do plano para pessoas com idade até 17 anos: {p.faixa1}</p>
                    <p>Valor do plano para pessoas com idade entre 18 e 40 anos: {p.faixa2}</p>
                    <p>Valor do plano para pessoas com idade à partir de 41 anos: {p.faixa3}</p>
                </div>
            </div>
        )
    })

    useEffect(() => {
        showPrices()
    }, [])

    return (
        <div>
            <h1> Lista de Preços </h1>
            {list}
        </div>
    )

}