import React from "react";
import styled, { css } from "styled-components";

const SalaryPopup = () => {
  return (
    <SalaryPopupIn>
      <div className="PopupBox">
        <Text>이 회사의 연봉과 인원을 보고싶다면?</Text>
        <Text color="blue">원티드 회원가입</Text>
      </div>
    </SalaryPopupIn>
  );
};

const SalaryPopupIn = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  border: 1px solid #e1e2e3;
  padding: 5em 3em 4em;
`;

const Text = styled.p`
  font-weight: 700;
  ${(props) =>
    props.color === "blue" &&
    css`
      color: #258bf7;
      text-decoration: underline;
      text-align: center;
      font-weight: 700;
      margin: 1em 0;
    `}
`;

export default SalaryPopup;
