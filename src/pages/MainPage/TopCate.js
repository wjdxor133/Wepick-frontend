import React from "react";
import styled from "styled-components";

const TopCate = (props) => {
    return (
        <TopCateList img={props.backImg} >
            <p>{props.main_category_id}</p>
        </TopCateList>
    );
}

const TopCateList = styled.li`
    display: inline-block;
    width: 130px;
    height: 60px;
    border-radius: .3em;
    padding: .5em 0em;
    text-align: center;
    font-size: 0.975rem;
    background: url(${props => props.img}),
    linear-gradient(to top, rgba(0, 0, 0, .7) 100%, rgba(0, 0, 0, 1) 100%);
    background-size: 100%;
    line-height: 3em;
    font-weight: 500;
    margin-right: .5em;
    color: white;
`;



export default TopCate;