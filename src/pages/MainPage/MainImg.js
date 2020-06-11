import React from "react";
import styled from "styled-components";

const MainImg = (props) => {
    return (
        <MainImgList>
            <img src={props.img} alt="" />
            <MainImgBox>
                <MainWhiteBox>
                    <span>{props.title}</span>
                    <p>{props.content}</p>
                    <div className="GoLink">바로가기 ></div>
                </MainWhiteBox>
            </MainImgBox>
        </MainImgList>
    );
}

const MainImgList = styled.li`
    position: relative;
    img{
        width: 110%;
    }
`;

const MainImgBox = styled.div`
    max-width: 1000px;
    padding: 0em 2em;
`

const MainWhiteBox = styled.div`
    z-index: 10;
    top: 8em;
    background-color: white;
    width: 340px;
    height: 150px;
    position: absolute;
    border-radius: .5em;
    padding: 2em;
    span{
        font-size: 1.5rem;
        font-weight: 600;
    }
    p{
        font-size: .875rem;
        font-weight: 600;
        color: #666666;
        margin-top: .7em;
    }
    .GoLink{
        color: ${props => props.theme.color.main};
        font-size: .875rem;
        font-weight: 600;
        margin-top: 1.5em;
        padding-top: 1em;
        border-top: 1px solid #dddddd;
    }
`;

// const GoLink = styled.p`
//     /* color: ${props => props.theme.color.main}; */
//     font-size: 1.125rem;
//     font-weight: 600;
// `;

export default MainImg;