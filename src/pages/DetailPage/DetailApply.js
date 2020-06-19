import React, { useState, useEffect } from "react";
import ResumeItemBox from "./ResumeItemBox";
import FileUpload from "./FlieUpload";
import styled, { css } from "styled-components";
import { IoIosArrowForward } from "react-icons/io";
import { BsPlus } from "react-icons/bs";
import { API } from "../../config";

const DetailApply = ({ setApply, job_id }) => {
  const [resumeData, setResumeData] = useState({});
  const [resumeId, setResumeId] = useState(0);
  const goback = () => {
    setApply(false);
  };

  const gosubmit = () => {
    const token = localStorage.getItem("access_token");
    fetch(`${API}/job/apply?job_id=${job_id}&${resumeId}`, {
      method: "POST",
      headers: {
        Authorization: token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        job_id: job_id,
        resume_id: resumeId,
      }),
    });
    goback();
  };

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    // 이력서 뿌리는 API
    fetch(`${API}/job/apply`, {
      headers: {
        Authorization: token,
      },
    })
      .then((res) => res.json())
      .then((res) => {
        console.log("res", res);
        setResumeData(res.data);
      });
  }, []);
  // console.log("resumeData", resumeData);

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
            <p className="ItemName">{resumeData && resumeData.name}</p>
          </Item>
          <Item>
            <ApplyInfoText>이메일</ApplyInfoText>
            <p className="ItemText">{resumeData && resumeData.email}</p>
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
              <FileUpload></FileUpload>
            </div>
          </div>
          <div className="ResumeList">
            <ul>
              {resumeData.resume &&
                resumeData.resume.map((resume, idx) => {
                  console.log("resume.id", resume.id);
                  return (
                    <li>
                      <ResumeItemBox
                        key={idx}
                        resumeId={resumeId}
                        setResumeId={() => setResumeId(resume.id)}
                        title={resume.title}
                        updated_at={resume.updated_at}
                        resumeCheck={true}
                      />
                    </li>
                  );
                })}
            </ul>
          </div>
          <Button newResume>새 이력서 작성</Button>
        </ResumeBox>
        <ApplyInfoText Explanation="explanation">
          원티드 이력서로 지원하면 최종 합격률이 40% 높아집니다.
        </ApplyInfoText>
        <Button
          submit
          onClick={gosubmit}
          style={{ color: resumeId !== 0 ? "white" : null }}
        >
          제출하기
        </Button>
      </InfoBox>
    </DetailApplyPage>
  );
};

const DetailApplyPage = styled.div`
  width: 100%;
  border: 1px solid #e1e2e3;
`;

const InfoBox = styled.div`
  overflow-y: scroll;
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

      &:hover {
        cursor: pointer;
      }
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

      :hover {
        cursor: pointer;
      }
    `}
`;
export default DetailApply;
