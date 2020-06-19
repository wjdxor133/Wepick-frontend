import React, { useState, useEffect } from "react";
import styled, { css } from "styled-components";
import { API } from "../../config";

const Profile = () => {
  const [profileData, setProfileData] = useState({});

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    fetch(`${API}/account/profile`, {
      headers: {
        Authorization: "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhY2NvdW50X2lkIjo0fQ.w1z54j_Vf6rmysn_8a2S0AKrwZ54vrBufrNCxaBbg_g",
      },
    })
      .then((res) => res.json())
      .then((res) => {
        // console.log("profileData", res);
        setProfileData(res.data);
      });
  }, []);
  return (
    <ProfileIn>
      <h1>전문분야 설정</h1>
      <div className="profileContent">
        <div className="contentItem">
          <Text gray>직군</Text>
          <Text black>{profileData.main_category_name}</Text>
        </div>
        <div className="contentItem">
          <Text gray>직무</Text>
          <Text black>{profileData.sub_category_name}</Text>
        </div>
        <div className="contentItem">
          <Text gray>경력</Text>
          <Text black>{profileData.career}</Text>
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
  padding: 1em;
  h1 {
    padding: 1em;
    font-size: 1.25rem;
    font-weight: 600;
  }

  .profileContent {
    padding: 0 1em;

    .contentItem {
      margin: 1em 0;
      :last-child{
        border-top: 1px solid #e1e2e3;
        padding-top: 1.5em;
      }
    }
  }
`;

const Text = styled.p`
  padding: 0.4em 0;
  ${(props) =>
    props.gray &&
    css`
      /* font-weight: 500; */
      color: #999;
    `}

  ${(props) =>
    props.black &&
    css`
      font-weight: 500;
    `}
`;

export default Profile;
