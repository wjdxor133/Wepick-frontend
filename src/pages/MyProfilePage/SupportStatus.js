import React, { useState, useEffect } from "react";
import styled from "styled-components";
import SupportList from "./SupportList";

const SupportStatus = () => {
  const [supportList, setSupportList] = useState();

  useEffect(() => {
    fetch("/data/teak2Data/SupportStatusMork.json")
      .then((res) => res.json())
      .then((res) => {
        console.log("res", res);
        setSupportList(res.data);
      });
  }, []);

  return (
    <SupportStatusIn>
      <div>
        <p className="SupportCount">총 1건</p>
      </div>
      <div className="SupportContent">
        <div className="SupportTitle">
          <p>지원 회사</p>
          <p className="left">지원 포지션</p>
          <p className="center">작성시간</p>
          <p className="right">진행상태</p>
          <p>보상금 신청</p>
        </div>
        <SupportList supportList={supportList} />
      </div>
    </SupportStatusIn>
  );
};

const SupportStatusIn = styled.div`
  margin: 0 10em;

  .SupportCount {
    font-size: 0.95rem;
    margin: 1em 1em 5em;
  }

  .SupportContent {
    .SupportTitle {
      display: flex;
      justify-content: space-between;
      width: 100%;
      padding: 0 0.5em;

      p {
        display: inline;
        font-size: 0.7rem;
        color: #86939e;
        text-align: center;
      }

      .left {
        margin-left: 8.5em;
      }

      .center {
        margin-left: 2em;
      }
    }
  }
`;

export default SupportStatus;
