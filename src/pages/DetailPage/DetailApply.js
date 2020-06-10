import React, { useState, useEffect } from "react";
import ResumeItemBox from "./ResumeItemBox";
import styled, { css } from "styled-components";
import { IoIosArrowForward } from "react-icons/io";
import { BsPlus } from "react-icons/bs";

const DetailApply = ({ setApply }) => {
  const [resumeData, setResumeData] = useState();
  const goback = () => {
    setApply(false);
  };

  useEffect(() => {
    // 이력서 뿌리는 API
    fetch("data/teak2Data/ResumeItem.json")
      .then((res) => res.json())
      .then((res) => {
        setResumeData(res.resume);
        console.log("res", res.resume);
      });
    console.log("resumeData", resumeData);
  }, []);

  return (
    <DetailApplyPage>
      <DetailApplyHeader>
        <ApplyInfoText className="applyTitle">지원하기</ApplyInfoText>
        <ApplyInfoText className="backText" textColor="#999" onClick={goback}>
          뒤로
        </ApplyInfoText>
      </DetailApplyHeader>
      <InfoBox>
        <ApplyInfoBox>
          <h4>지원정보</h4>
          <Item>
            <ApplyInfoText>이름</ApplyInfoText>
            <p className="ItemName">임정택</p>
          </Item>
          <Item>
            <ApplyInfoText>이메일</ApplyInfoText>
            <p className="ItemText">wjdxor1224@gmail.com</p>
          </Item>
          <Item hover>
            <ApplyInfoText>연락처</ApplyInfoText>
            <div className="ItemBox">
              <ApplyInfoText textColor="blue">필수</ApplyInfoText>
              <IoIosArrowForward size="12" color="#999" />
            </div>
          </Item>
          <Item hover>
            <ApplyInfoText>추천인</ApplyInfoText>
            <div className="ItemBox">
              <ApplyInfoText textColor="#999">선택사항</ApplyInfoText>
              <IoIosArrowForward size="12" color="#999" />
            </div>
          </Item>
        </ApplyInfoBox>
        <ResumeBox>
          <div className="resumeItem">
            <ApplyInfoText>첨부파일</ApplyInfoText>
            <div className="IconBox">
              <BsPlus color="#2886fa" />
              <ApplyInfoText textColor="blue">파일 업로드</ApplyInfoText>
            </div>
          </div>
          <div className="ResumeList">
            <ul>
              <li>
                <ResumeItemBox />
              </li>
            </ul>
          </div>
          <Button newResume>새 이력서 작성</Button>
        </ResumeBox>
        <ApplyInfoText Explanation="explanation">
          원티드 이력서로 지원하면 최종 합격률이 40% 높아집니다.
        </ApplyInfoText>
        <Button submit>제출하기</Button>
      </InfoBox>
    </DetailApplyPage>
  );
};

const DetailApplyPage = styled.div`
  width: 90%;
  border: 1px solid #e1e2e3;
`;

const InfoBox = styled.div`
  overflow: scroll;
`;

const DetailApplyHeader = styled.div`
  display: flex;
  padding: 1em;
  border-bottom: 1px solid #e1e2e3;

  .applyTitle {
    width: 60%;
    text-align: right;
  }

  .backText {
    width: 40%;
    text-align: right;

    &:hover {
      cursor: pointer;
    }
  }
`;

const ApplyInfoBox = styled.div`
  padding: 1em;
  h4 {
    font-weight: 700;
  }
`;

const ApplyInfoText = styled.p`
  font-size: 0.92rem;
  font-weight: 700;
  color: ${(props) => props.textColor || "black"};

  ${(props) =>
    props.textColor === "blue" &&
    css`
      color: #2886fa;
    `}

  ${(props) =>
    props.Explanation === "explanation" &&
    css`
      font-size: 0.82rem;
      font-weight: 500;
      padding: 0.5em 1.7em;
      color: #666;
    `}
`;

const Item = styled.div`
  display: flex;
  align-items: center;
  padding: 1em 0 1em 0;
  border-bottom: 1px solid #e1e2e3;

  .ItemName {
    width: 30%;
    font-size: 0.9rem;
    font-weight: 700;
    margin-left: 2.8em;
  }

  .ItemText {
    width: 30%;
    font-size: 0.9rem;
    font-weight: 700;
    margin-left: 2em;
  }

  .ItemBox {
    width: 60%;
    display: flex;
    margin-left: 2em;
    justify-content: space-between;
  }

  ${(props) =>
    props.hover &&
    css`
      :hover {
        cursor: pointer;
      }
    `}
`;

const ResumeBox = styled.div`
  padding: 1em 1.5em;
  .resumeItem {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1em;
  }

  .IconBox {
    display: flex;
  }

  .ResumeList {
    li {
    }
  }
`;

const Button = styled.button`
  ${(props) =>
    props.newResume &&
    css`
      width: 100%;
      border: 1px solid #333;
      padding: 0.9em 2em;
      margin: 0.7em 0 0.5em;
      background-color: white;
      font-weight: 700;
      font-size: 0.9rem;
      border-radius: 3px;
    `}

  ${(props) =>
    props.submit &&
    css`
      width: 100%;
      margin-top: 1.5em;
      padding: 0.7em 0;
      background-color: #999;
      border: 1px solid #999;
      color: rgba(255, 255, 255, 0.5);
      font-size: 1rem;
      font-weight: 700;
    `}
`;
export default DetailApply;
