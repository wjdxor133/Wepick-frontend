import React from "react";
import styled from "styled-components";

const Zero = () => {
    return (
        <>
            <AlignBox className="marginBottom">
                <p className="pTag">정렬</p>
                <label>
                    <select>
                        <option>전체</option>
                        <option>신입</option>
                        <option>1년</option>
                        <option>2년</option>
                        <option>3년</option>
                        <option>4년</option>
                        <option>5년</option>
                        <option>6년</option>
                        <option>7년</option>
                        <option>8년</option>
                        <option>9년</option>
                        <option>10년</option>
                    </select>
                </label>
            </AlignBox>
            <CheckBox>
                <input type="checkBox" />
                <span>적용된 필터를 저장하고 유지합니다.</span>
            </CheckBox>
        </>
    );
}

const AlignBox = styled.div`
    select{
        background-color: #F8F8FA;
        font-size: 1rem;
        font-weight: 600;
        width: 445px;
        height: 40px;
    }
`;

const CheckBox = styled.div`

`;

export default Zero