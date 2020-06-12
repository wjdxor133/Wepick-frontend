import React from "react";
import styled from "styled-components";

const topCate = (props) => {
    // const [position, setposition] = useState({});
    // console.log(props)
    return (
        <TopCateList>
            <p>{props.duty.sub_category_id}</p>
        </TopCateList>
    );
}

const TopCateList = styled.li`
    width: 130px;
    height: 60px;
    border-radius: .3em;
    border: 1px solid gray;
    padding: .5em 0em;
    text-align: center;
    font-size: 0.975rem;
    background-image: url({props.img});
    line-height: 3em;
    font-weight: 500;
    margin-right: .5em;
`;



export default topCate;