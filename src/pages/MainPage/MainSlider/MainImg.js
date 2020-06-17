import React from "react";
import styled from "styled-components";

const MainImg = props => {
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
    width: 100vw;
    img{
        width: 100%;
        height: auto;
        position: relative;
    }
`;

const MainImgBox = styled.div`
    /* max-width: 1000px; */
`;

const MainWhiteBox = styled.div`
    position: absolute;
    z-index: 10;
    top: 8em;
    margin-left: calc((100vw - 1060px) / 2);
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

export default MainImg;