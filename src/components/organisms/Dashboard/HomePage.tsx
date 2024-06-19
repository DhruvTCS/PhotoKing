import React from 'react'
import styled from 'styled-components'
import Members from '../../molecules/Dashboard/HomePage/Members'
import Albums from '../../molecules/Dashboard/HomePage/Albums'

const HomePageContainer = styled.div`
width:100%;
height:100%;
`

const HomePage: React.FC = () => {
    return (
        <HomePageContainer>
            <Members />
            <Albums />

        </HomePageContainer>
    )
}

export default HomePage