import React from 'react'
import styled from 'styled-components'
import SubmitButton from '../../Login/SubmitButton';

interface ReasonModalProps {
    selectedReason: number;
    handleReasonChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    reason: string;
    setReason: (data: string) => void;
    setShowReasonModal: (data: boolean) => void;
    handleSubmit: () => void;

}

const ModalOverlay = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  z-index:1000;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
`;

const ModalContent = styled.div`
  background-color: white;
color: black;
font-family: Urbanist,sans-serif;

  padding: 20px;
  border-radius: 5px;
  width: 450px;
  height:350px;
  max-width: 80%;
  position: relative;
`;

const CloseButton = styled.button`
width:150px;
height:54px;
border:none;
border-radius: 16px 16px 16px 16px;
font-family: Urbanist, sans-serif;
font-size: 16px;
font-weight: 500;
line-height: 19.2px;
text-align: center;
color: black;
margin-left:30px;
background-color:#bcbaba;

`;

const Textarea = styled.input`
  width: 100%;
  height: 40px;
  margin-top: 10px;
  border-radius: 7px;
`;

const SubmitButtonContainer = styled.div`
margin-top:25px;
display:flex;
align-items: center;
justify-content: center;
`
const ReasonHeading = styled.div`
width: 100%;
height: 34px;
font-family: Urbanist,sans-serif;
font-size: 28px;
font-weight: 600;
line-height: 34px;
text-align: center;
margin-bottom:20px;
`

const ReasonListContainer = styled.div`
display :flex;
flex-direction: column;
justify-content: left;
align-items: left;
`
const ReasonLabelContainer = styled.label`
text-align: left;
display:flex;
flex-direction: row;
align-items: center;
width: 100%;
justify-content:center;
margin-bottom:5px;
`

const ReasonLabel = styled.label`
font-family: Urbanist,sans-serif;
font-size: 18px;
width:100%;
font-weight: 500;
line-height: 34px;
text-align: left;
margin-left:10px;
cursor:pointer;

`
const ReasonInput = styled.input`
  width: 20px;
  height: 20px;
  appearance: none;
  border: 1px solid #ccc;
  border-radius: 50%;
  outline: none;
  cursor: pointer;
  position: relative;
  display:flex;
  align-items: center;
  justify-content: center;
  background-color: white;
 &:checked::before {
    content: '';
    width: 14px;
    height: 14px;
    border-radius: 50%;
    background-color: #AE2AB1; /* Change this to your desired color */
    position: absolute;
    top: 50%;
    left: 51%;
    transform: translate(-50%, -50%);
  }
`

const ReasonModal: React.FC<ReasonModalProps> = ({ selectedReason, handleReasonChange, reason, setReason, setShowReasonModal, handleSubmit }) => {

    return (
        <ModalOverlay>
            <ModalContent onClick={(e) => { e.stopPropagation() }}>
                <ReasonHeading>Reason for lock the album</ReasonHeading>
                <ReasonListContainer>

                    <ReasonLabelContainer>
                        <ReasonInput
                            type="radio"
                            id="radio1"
                            value={1}
                            checked={selectedReason === 1}
                            onChange={handleReasonChange}

                        />
                        <ReasonLabel htmlFor='radio1'>

                            For relate to security
                        </ReasonLabel>

                    </ReasonLabelContainer>
                    <ReasonLabelContainer>
                        <ReasonInput
                            type="radio"
                            id="radio2"
                            value={2}
                            checked={selectedReason === 2}
                            onChange={handleReasonChange}
                        />
                        <ReasonLabel htmlFor='radio2'>

                            For team member only
                        </ReasonLabel>

                    </ReasonLabelContainer>
                    <ReasonLabelContainer>
                        <ReasonInput
                            type="radio"
                            id="radio3"
                            value={3}
                            checked={selectedReason === 3}
                            onChange={handleReasonChange}
                        />
                        <ReasonLabel htmlFor='radio3'>

                            For personal use
                        </ReasonLabel>

                    </ReasonLabelContainer>
                    <ReasonLabelContainer>
                        <ReasonInput
                            type="radio"
                            value={4}
                            id="radio4"
                            checked={selectedReason === 4}
                            onChange={handleReasonChange}
                        />
                        <ReasonLabel htmlFor='radio4'>

                            Other
                        </ReasonLabel>
                    </ReasonLabelContainer>
                    {selectedReason === 4 && (
                        <Textarea
                            value={reason}
                            onChange={(e) => setReason(e.target.value)}
                            placeholder="Enter your reason"
                        />
                    )}
                </ReasonListContainer>
                <SubmitButtonContainer >
                    {/* {loading ?


<LoadingDots position={{ type: "absolute", top: "41px", left: "135px" }} />

: */}


                    <SubmitButton onClick={() => handleSubmit()} width={150} text='Submit' needArrow={false} active={false} />
                    <CloseButton onClick={() => setShowReasonModal(false)} >Cancel</CloseButton>
                    {/* } */}

                </SubmitButtonContainer>
            </ModalContent>
        </ModalOverlay>
    )
}

export default ReasonModal