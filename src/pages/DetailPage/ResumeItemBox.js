import React from "react";
import { IoIosArrowForward } from "react-icons/io";
import styled, { css } from "styled-components";

const ResumeItemBox = ({
  name,
  languge,
  resume,
  write,
  resumeCheck,
  fileCheck,
  fileName,
  fileDate,
  fileText,
}) => {
  return (
    <ResumeItemBoxIn fileCheck={fileCheck} ResumeCheck={resumeCheck}>
      <div className="BoxLeft">
        <input type="checkbox" id="cb1" />
        <label for="cb1"></label>
        <ResumeTextBox>
          <ResumeText bold>{fileCheck ? fileName : name}</ResumeText>
          <ResumeText>
            {fileCheck
              ? fileDate + fileText
              : `${languge} | ${resume} | ${write}`}
          </ResumeText>
        </ResumeTextBox>
      </div>
      <IoIosArrowForward size="12" />
    </ResumeItemBoxIn>
  );
};
const ResumeItemBoxIn = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #f4f5f7;
  border: 1px solid #f4f5f7;
  padding: 0.5em 0.9em;
  margin-bottom: 0.5em;

  .BoxLeft {
    display: flex;
    align-items: center;

    input[id="cb1"] + label {
      display: inline-block;
      width: 18px;
      height: 18px;
      background-color: #e1e2e3;
      cursor: pointer;
    }

    input[id="cb1"] {
      display: none;
    }
  }
`;

const ResumeTextBox = styled.div`
  margin-left: 0.6em;
`;

const ResumeText = styled.p`
  ${(props) =>
    (props.bold &&
      css`
        font-size: 0.85rem;
        font-weight: 700;
        color: #999;
        margin-bottom: 0.5em;
      `) ||
    css`
      font-size: 0.6rem;
      color: #999;
    `}
`;

export default ResumeItemBox;