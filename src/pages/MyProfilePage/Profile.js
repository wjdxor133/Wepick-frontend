import React from "react";
import styled, { css } from "styled-components";

const Profile = () => {
  return (
    <ProfileIn>
      <h1>전문분야 설정</h1>
      <div className="profileContent">
        <div className="contentItem">
          <Text gray>직군</Text>
          <Text black>개발</Text>
        </div>
        <div className="contentItem">
          <Text gray>직무</Text>
          <Text black>프론트엔드 개발자</Text>
        </div>
        <div className="contentItem">
          <Text gray>경력</Text>
          <Text black>신입</Text>
        </div>
        <div className="contentItem">
          <Text gray>스킬</Text>
          <Text black>ReactJS, JavaScript, SASS</Text>
        </div>
      </div>
    </ProfileIn>
  );
};

const ProfileIn = styled.div`
  width: 100%;
  background-color: white;
  border: 1px solid #e1e2e3;
  h1 {
    padding: 1em;
    font-size: 1.2rem;
    font-weight: 700;
  }

  .profileContent {
    padding: 0 1em;

    .contentItem {
      margin: 1em 0;
    }
  }
`;

const Text = styled.p`
  padding: 0.4em 0;
  ${(props) =>
    props.gray &&
    css`
      font-weight: 500;
      color: #999;
    `}

  ${(props) =>
    props.black &&
    css`
      font-weight: 650;
    `}
`;

export default Profile;
