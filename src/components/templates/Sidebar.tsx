import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import CompanyLogo from '../molecules/Logo/CompanyLogo'
import { OptionProps, sidebarOptions } from '../../Data/SiderbarOptionsData'
import { useLocation, useNavigate } from 'react-router-dom'
import CompanyLogoPNG from '../../assets/images/Logo.png'
import CancelSidebarPNG from '../../assets/Icons/Sidebar/closeSidebar.png'
import openSidebarImage from '../../assets/Icons/Sidebar/openSidebarArrow.png'
import { useAppDispatch } from '../../Redux/Hooks'
import { clearToken } from '../../Redux/Slice/Auth/AuthSlice'
import LogoutPopup from '../atoms/Dashboard/HomePage/LogOutPopUp'
const SidebarContainer = styled.div<{ isExpand: boolean }>`
  width: ${(props) => (props.isExpand ? '19%' : '5%')};
  height: 1090px;
  transition: all 0.2s ease-in-out;
  background-color: white;
//   z-index: 4;
`

const ActionSidebarconatiner = styled.div<{ isExpand: boolean }>`
  display: flex;
  justify-content: end;
  cursor: pointer;
  ${(props) =>
        props.isExpand
            ? `
        margin:10px;
        margin-bottom:0px;
        `
            : `
    margin:3px;
            `}
`

const CancleSidebar = styled.img`
height:24px;
width: 24px;
`
const OpenSidebar = styled.img`
  height: 24px;
  width: 24px;
`

const LogoContainer = styled.div<{ isExpand: boolean }>`
    width:100%;
    display: flex;

    justify-content:center;
  transition: all 0.4s ease-in-out;
  ${(props) =>
        !props.isExpand
            ? `
            margin-top:30px;
    `
            : `
    
left:30px;
    `}
`

const CompanyLogoIcon = styled.img`
  height: 60px;
  width: 74px;
`
const SiderbarOptionsContainer = styled.div<{ isExpand: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  top: 40px;
  margin-left: ${(props) => (props.isExpand ? '20px' : '10px')};
  // left :20px;
  height: 80%;
  width: 80%;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
`
const OptionContainer = styled.div<OptionProps>`
  fill: black;
  display: flex;
  flex-direction: row;
  align-items: center;
  width: ${(props) => (props.isExpanded ? '98%' : '30px')};
  height: ${(props) => (props.isExpanded ? '50px' : '30px')};
  ${(props) =>
        props.isExpanded
            ? `
        padding-right:2px;
    `
            : `
     margin-top:10px;`}
  padding:10px;
  ${(props) =>
        props.isActive
            ? `
    background: linear-gradient(360deg, #7A11A1 0%, #C62BC9 100%);
    box-shadow: 0px 4px 18px 0px #A720B966;
    border-radius:10px;
    `
            : null}
`
const Optiontext = styled.p<OptionProps>`
  font-family: 'Urbanist', sans-serif;
  font-size: 19px;
  font-weight: 600;
  line-height: 19.2px;
  text-align: left;
  margin-left: 20px;

  ${(props) =>
        props.isActive
            ? `
    color:white;
    `
            : null}
`

const IconContainer = styled.div``
const PngIcon = styled.img`
  height: 35px;
  width: 35px;
`
const DashboardIcon = styled.img`
  height: 28px;
  width: 28px;
`
const ClosePngIcon = styled.img`
height: 30px;
  width: 30px;
`
const Sidebar: React.FC<{ isExpand: boolean; toggelExpand: () => void }> = ({
    isExpand,
    toggelExpand,
}) => {
    const [activeTab, setActiveTab] = useState(sidebarOptions[0])
    const navigate = useNavigate();

    const location = useLocation()
    const handleClick = (clickedTab: any) => {

        setActiveTab(clickedTab)
        navigate(clickedTab.redirection)
    }
    const currentPath = location.pathname
    // const navigate = useNavigate();
    useEffect(() => {
        sidebarOptions.forEach((Option) => {
            if (Option.redirection === currentPath) {
                setActiveTab(Option)
            }
        })
    }, [currentPath])
    return (
        <SidebarContainer isExpand={isExpand}>
            <ActionSidebarconatiner isExpand={isExpand}>
                {isExpand ? (
                    <CancleSidebar
                        src={CancelSidebarPNG}
                        onClick={() => toggelExpand()}
                    />
                ) : (
                    <OpenSidebar src={openSidebarImage} onClick={() => toggelExpand()} />
                )}
            </ActionSidebarconatiner>
            <LogoContainer isExpand={isExpand}>
                {isExpand ? <CompanyLogo /> : <CompanyLogoIcon src={CompanyLogoPNG} />}
            </LogoContainer>
            <SiderbarOptionsContainer isExpand={isExpand}>
                {sidebarOptions.map((option) =>
                    isExpand ? (
                        <OptionContainer
                            isExpanded={isExpand}
                            isActive={option.key === activeTab.key}
                            onClick={() => handleClick(option)}
                        >
                            {option.key === "Dashboard"

                                ?
                                <IconContainer>
                                    <DashboardIcon
                                        src={
                                            option.key === activeTab.key
                                                ? option.whiteIcon
                                                : option.icon
                                        }
                                    />
                                </IconContainer>
                                :
                                <IconContainer>
                                    <PngIcon
                                        src={
                                            option.key === activeTab.key
                                                ? option.whiteIcon
                                                : option.icon
                                        }
                                    />
                                </IconContainer>
                            }


                            <Optiontext
                                isActive={option.key === activeTab.key}
                                isExpanded={isExpand}
                            >
                                {option.key}
                            </Optiontext>
                        </OptionContainer>
                    ) : (
                        <OptionContainer
                            isExpanded={isExpand}
                            isActive={option.key === activeTab.key}
                            onClick={() => handleClick(option)}
                        >
                            {option.key === "Dashboard"

                                ?
                                <IconContainer>
                                    <DashboardIcon
                                        src={
                                            option.key === activeTab.key
                                                ? option.whiteIcon
                                                : option.icon
                                        }
                                    />
                                </IconContainer>
                                :
                                <IconContainer>
                                    <ClosePngIcon
                                        src={
                                            option.key === activeTab.key
                                                ? option.whiteIcon
                                                : option.icon
                                        }
                                    />
                                </IconContainer>
                            }
                        </OptionContainer>
                    ),
                )}
            </SiderbarOptionsContainer>
        </SidebarContainer>
    )
}

export default Sidebar
