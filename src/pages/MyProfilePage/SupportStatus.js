import React, { useState, useEffect } from "react";
import styled from "styled-components";
import SupportList from "./SupportList";
import { API } from "../../config";

const SupportStatus = () => {
  const [supportList, setSupportList] = useState({});

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    fetch(`${API}/account/mypage/apply`, {
      headers: {
        Authorization: token,
      },
    })
      .then((res) => res.json())
      .then((res) => {
        // console.log(res);
        setSupportList(res.data);
      });
  }, []);

  return (
    <SupportStatusIn>
      <div>
        <p className="SupportCount">
          총 {supportList && supportList.total_applies}건
        </p>
      </div>
      <div className="SupportContent">
        <div className="SupportTitle">
          <div>
            <p>지원 회사</p>
          </div>
          <div>
            <p className="left">지원 포지션</p>
          </div>
          <div>
            <p className="center">작성시간</p>
          </div>
          <div>
            <p className="right">진행상태</p>
          </div>
          <div>
            <p>보상금 신청</p>
          </div>
        </div>
        <SupportList supportList={supportList} />
      </div>
    </SupportStatusIn>
  );
};

const SupportStatusIn = styled.div`
  margin: 0 10em;

  .SupportCount {
    font-size: 1.7rem;
    font-weight: 600;
    margin-bottom: 1.3em;
  }

  .SupportContent {
    .SupportTitle {
      display: flex;
      justify-content: space-between;
      width: 100%;
      padding: 0 0.5em;

      div {
        width: 20% p {
          display: inline;
          font-size: 0.7rem;
          color: #86939e;
          text-align: center;
        }
      }
    }
  }
`;

export default SupportStatus;
