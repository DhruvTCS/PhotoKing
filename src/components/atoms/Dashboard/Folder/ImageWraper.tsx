// ImageWithSkeleton.js
import React, { useState, useEffect, Fragment } from 'react';
import styled from 'styled-components';
import previewImage from '../../../../assets/images/previewImage.png'
// Wrapper to contain the image and skeleton loader


// Styled image component
const WraperDiv = styled.div`
height:100px;
width:100px;
display:flex;
align-items: center;
justify-content: center;
border-radius: 4px;
border: 0.5px solid #d1d1d1;
`
const PreviewImage = styled.img<{ loaded: boolean }>`
${props => props.loaded ? `
    
height:100px;
width:100px;
    `: `
    
height:25px;
width:25px;
    `}
`

const SkeletonImageDiv = styled.div`
background-color: gray;
width: 100px;
height: 100px;
`
const SkeletonImage = styled.img`
height:30px;
width:30px;
`;
interface ImageWrapper {
    imgURL: string;
}

const ImageWithSkeleton: React.FC<ImageWrapper> = ({ imgURL }) => {

    const [loaded, setLoaded] = useState(false);


    const handleImageLoaded = () => {
        // console.log("called")
        setLoaded(true);
    };

    return (
        <Fragment>
            <WraperDiv>


                <PreviewImage
                    src={!loaded ? previewImage : imgURL}
                    alt="Loaded content"
                    loaded={loaded}
                    onLoad={() => handleImageLoaded()}

                />
            </WraperDiv>


        </Fragment>
    );
};

export default ImageWithSkeleton;