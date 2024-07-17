import React, { useState } from 'react'
import styled from 'styled-components'
import { Package } from '../../../../Data/package.dto'
import SubmitButton from '../../Login/SubmitButton'
import { useAppDispatch, useAppSelector } from '../../../../Redux/Hooks'
import { setCurrentPackage } from '../../../../Redux/Slice/Dashboard/PackageSlice'
import { useNavigate } from 'react-router-dom'
import DeletePopup from '../Folder/DeletePopup'
import { deletePackageAPI } from '../../../../Redux/ApiCalls/Dashboard/PackageAPI'
import DeleteIconPNG from '../../../../assets/Icons/deleteIcon.png'
import EditIconPNG from '../../../../assets/Icons/editPackage.png'
interface PackageItemProps {
    packageData: Package
}

const PackageItem: React.FC<PackageItemProps> = ({ packageData }) => {
    const dispatch = useAppDispatch()
    const { } = useAppSelector((state) => state.package)
    const navigate = useNavigate()
    const [isDeletePopup, setIsDeletePopup] = useState(false)
    const handleClick = () => {
        dispatch(setCurrentPackage(packageData))
        navigate('/dashboard/package/single')
    }
    const handleDeletePackage = (id: number) => {
        dispatch(deletePackageAPI({ package_id: id }))
        setIsDeletePopup(false);
        console.log("delete package", packageData)
    }
    const formatToINR = (amount: number): string => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            maximumFractionDigits: 0,
        }).format(amount);
    };
    return (
        <Container >
            {isDeletePopup && (
                <DeletePopup
                    text="Are you sure you want to delete package."
                    buttonText="Delete"
                    cancel={() => setIsDeletePopup(false)}
                    Delete={() => handleDeletePackage(packageData.id)}
                />
            )}
            <LeftContainer>
                <PackageName>{packageData.title}</PackageName>
                <PackagePrice>{formatToINR(packageData.price)}</PackagePrice>
            </LeftContainer>
            <RightContainer>
                <EditIcon src={EditIconPNG} onClick={() => handleClick()} />
                <DeleteIcon src={DeleteIconPNG} onClick={() => setIsDeletePopup(true)} />
            </RightContainer>
        </Container>
    )
}

export default PackageItem

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 70px;
`
const LeftContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: baseline;
`
const RightContainer = styled.div`
  // padding-right:30px;
  width:7%;
  justify-content:space-between;
  display: flex;
  align-items: center;

`
const PackageName = styled.p`
  margin: 0;
  font-family: Urbanist, sans-serif;
  font-size: 17px;
  font-weight: 600;
  line-height: 22.8px;
  text-align: left;
`
const PackagePrice = styled.p`
  font-family: Urbanist, sans-serif;
  font-size: 16px;
  font-weight: 500;
  line-height: 22.8px;
  text-align: left;
  margin: 0;
  margin-top:10px;
  `
const DeleteIcon = styled.img`
width:45px;
height:45px;
cursor:pointer;
`;

const EditIcon = styled.img`
width:35px;
cursor:pointer;
height:35px;
`;