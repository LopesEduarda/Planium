import React from "react"
import IMG from '../../assets/plano-de-fundo.png'
import styled from 'styled-components'

export const DivImg = styled.img`
    margin-top: -50px;
`

export const Home = () => {
    return (
        <div>
            <DivImg src={IMG} />
        </div>
    )
}

export default Home;