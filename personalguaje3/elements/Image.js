import styled from "styled-components";
import React from "react";
import { symbol } from "prop-types";


const Image = (props) =>{
    const {shape,src,size,margin,padding} = props;


    const styles = {
        src:src,
        size:size,
        margin:margin,
        padding:padding
    }
    
    if(shape ==="circle"){
        return(
            <ImageCircle {...styles}>

            </ImageCircle>
        )
    }
    if(shape ==="rectangle")
    return(
        <AspectOutter>
            <AspectInner {...styles}>

            </AspectInner>
        </AspectOutter>
    )
return(
    <React.Fragment>
        <ImageDefault {...styles}></ImageDefault>
    </React.Fragment>
)

}

Image.defaultProps = {
    shape: "circle",
    src:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSfSozchojvNgOjInEW98n570p70OopLGJJgQ&usqp=CAU",
    size: 36,
    margin: false,
    padding: false
}

const ImageDefault = styled.div`
        --size: ${(props)=> props.size}px;
        width: var(--size);
        height: var(--size);
        background-image: url("${(props)=>props.src}");
        background-size: cover;   
        margin: ${(props)=> props.margin};
        padding: ${(props)=> props.padding}; 
`

const AspectOutter = styled.div`
    width: 70%;
    min-width: 250px;
`;

const AspectInner = styled.div`
    position: relative;
    padding-top: 75%;
    overflow: hidden;
    background-image: url("${(props)=>props.src}");
    background-size: cover;
    margin: ${(props)=> props.margin}; 
`;

const ImageCircle = styled.div`
        --size: ${(props)=> props.size}px;
        width: var(--size);
        height: var(--size);
        border-radius: var(--size);

        background-image: url("${(props)=>props.src}");
        background-size: cover;
        margin: 4px;
`;

export default Image;