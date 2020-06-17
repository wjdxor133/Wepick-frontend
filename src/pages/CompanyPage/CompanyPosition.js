import React from "react";
import styled, { css } from "styled-components";
import { AiFillHeart } from "react-icons/ai";

const CompanyPosition = ({ jobs }) => {
  return (
    <CompanyPositionIn>
      <div className="positionBox">
        <div>
          <Text jobName>{jobs && jobs.name}</Text>
          <div className="boxCenter">
            <Text jobsRewardAmount>
              채용보상금 {jobs && jobs.reward_amount.slice(0, 3) + ",000"}원
            </Text>
            <div className="iconBox">
              <Text jobsLikes>{jobs && jobs.likes}</Text>
              <AiFillHeart size="20" color="#e1e2e3" />
            </div>
          </div>
          <Text jobDeadLine>
            {jobs && jobs.deadline === "상시"
              ? `${jobs.deadline} 채용`
              : `${jobs.deadline} 까지`}
          </Text>
        </div>
      </div>
    </CompanyPositionIn>
  );
};

const CompanyPositionIn = styled.div`
  margin: 1em 1em 0 0;
  width: 47%;

  .positionBox {
    border: 1px solid #e1e2e3;
    padding: 1em;

    .boxCenter {
      display: flex;
      justify-content: space-between;

      .iconBox {
        display: flex;
      }
    }
  }
`;

const Text = styled.div`
  ${(props) =>
    props.jobName &&
    css`
      font-weight: 700;
      margin-bottom: 0.5em;
      line-height: 1.2rem;
    `}

  ${(props) =>
    props.jobsRewardAmount &&
    css`
      font-size: 0.9rem;
      color: #86939e;
      font-weight: 500;
    `}

    ${(props) =>
      props.jobsLikes &&
      css`
        font-size: 1.02rem;
        color: #86939e;
        font-weight: 500;
        margin-right: 0.2em;
      `}

      ${(props) =>
        props.jobDeadLine &&
        css`
          font-size: 0.8rem;
          color: #666;
          font-weight: 700;
          margin: 0.5em 0;
        `}
`;

export default CompanyPosition;
