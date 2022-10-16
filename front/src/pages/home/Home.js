import React from "react"
import IMG from '../../assets/plano-de-saude.png'
import styled from 'styled-components'

export const DivImg = styled.img`
    margin-top: -80px;
    min-width: 100vw;
    max-height: 100vh;
    opacity: 0.9;
`

export const TitleH1 = styled.h1`
display: flex;
flex-direction: row-reverse;
margin-right: 100px;
color: black;
`

export const Home = () => {
    return (
        <div>
            <TitleH1> . </TitleH1>
            <DivImg src={IMG} />
        </div>
    )
}

export default Home;