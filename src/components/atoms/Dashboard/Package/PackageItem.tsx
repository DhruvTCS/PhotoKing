import React, { useState } from 'react'
import styled from 'styled-components'
import { Package } from '../../../../Data/package.dto'
import SubmitButton from '../../Login/SubmitButton'
import { useAppDispatch, useAppSelector } from '../../../../Redux/Hooks'
import { setCurrentPackage } from '../../../../Redux/Slice/Dashboard/PackageSlice'
import { useNavigate } from 'react-router-dom'
import DeletePopup from '../Folder/DeletePopup'
import { deletePackageAPI } from '../../../../Redux/ApiCalls/Dashboard/PackageAPI'
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
    return (
        <Container onClick={() => handleClick()}>
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
                <PackagePrice>{packageData.price} ₹</PackagePrice>
            </LeftContainer>
            <RightContainer>
                <SubmitButton
                    text="Delete"
                    width={100}
                    onClick={(e) => { e.stopPropagation(); setIsDeletePopup(true) }}
                    needArrow={false}
                />
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
`
const PackageName = styled.p`
  margin: 0;
  font-family: Urbanist, sans-serif;
  font-size: 17px;
  font-weight: 600;
  line-height: 22.8px;
  text-align: left;
  text-decoration: underline;
`
const PackagePrice = styled.p`
  font-family: Urbanist, sans-serif;
  font-size: 16px;
  font-weight: 500;
  line-height: 22.8px;
  text-align: left;
  margin: 0;
`
