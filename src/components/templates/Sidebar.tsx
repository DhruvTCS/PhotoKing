import React, { useState } from 'react'
import styled from 'styled-components'
import CompanyLogo from '../molecules/Logo/CompanyLogo'
import { OptionProps, sidebarOptions } from '../../Data/SiderbarOptionsData'
import { useNavigate } from 'react-router-dom'

const SidebarContainer = styled.div`
width: 364px;
height: 1090px;

background-color:white;
z-index:1;
`
const LogoContainer = styled.div`
position:absolute;
left:30px;
`
const SiderbarOptionsContainer = styled.div`
display:flex;
flex-direction:column;
position:relative;
top:100px;
left :20px;
height:80%;
width:80%;
cursor:pointer;
`
const OptionContainer = styled.div<OptionProps>`
 fill:black;
 display:flex;
 flex-direction:row;
 align-items:center;
 margin:13px 0px 0px 0px;
 width: 260px;
height: 50px;
${props => props.isActive ?
        `
    background: linear-gradient(360deg, #7A11A1 0%, #C62BC9 100%);
    box-shadow: 0px 4px 18px 0px #A720B966;
    border-radius:10px;
    ` :
        null
    }

`
const Optiontext = styled.p<OptionProps>`
font-family: "Urbanist" sans-serif;
font-size: 16px;
font-weight: 500;
line-height: 19.2px;
text-align: left;
${props => props.isActive ?
        `
    color:white;
    ` :
        null
    }
`;

const IconContainer = styled.div`
`;
const PngIcon = styled.img`

`
const PNGContainer = styled.div<OptionProps>`

   `;
const SVGContainer = styled.div<OptionProps>`

margin-right:26px;
   margin-left:15px;
   ${props => props.isActive ?
        `
        padding:5px;
        border-radius:50%;
    background-color:white;
    ` :
        null
    }
`;
const Sidebar: React.FC = () => {
    const [activeTab, setActiveTab] = useState(sidebarOptions[0]);
    const navigate = useNavigate();
    const handleClick = (clickedTab: any) => {
        setActiveTab(clickedTab);
        navigate(clickedTab.redirection);
    }
    return (
        <SidebarContainer>
            <LogoContainer >

                <CompanyLogo />
            </LogoContainer>
            <SiderbarOptionsContainer>
                {sidebarOptions.map(option => (
                    <OptionContainer isActive={option.key === activeTab.key} onClick={() => handleClick(option)}>
                        <IconContainer  >
                            {option.isPng ?
                                <PNGContainer isActive={option.key === activeTab.key} >

                                    <PngIcon src={option.icon} />
                                </PNGContainer>
                                :
                                <SVGContainer isActive={option.key === activeTab.key} >

                                    <option.icon />
                                </SVGContainer>
                            }

                        </IconContainer>
                        <Optiontext isActive={option.key === activeTab.key}>{option.key}</Optiontext>
                    </OptionContainer>
                ))}
            </SiderbarOptionsContainer>
        </SidebarContainer>
    )
}

export default Sidebar