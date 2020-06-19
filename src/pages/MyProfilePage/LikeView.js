import React, { useState, useEffect } from "react";
import styled from "styled-components";
import PositionList from "../MainPage/PositionList";
import { API } from "../../config";

const LikeView = () => {
  const [likeList, setLikeList] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    fetch(`${API}/account/mypage/like`, {
      headers: {
        Authorization: "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhY2NvdW50X2lkIjo0fQ.w1z54j_Vf6rmysn_8a2S0AKrwZ54vrBufrNCxaBbg_g",
      },
    })
      .then((res) => res.json())
      .then((res) => {
        // console.log(res);
        setLikeList(res.data);
      });
  }, []);

  // console.log("likeList", likeList);
  return (
    <LikeViewIn>
      <ul>
        {likeList.length > 0 &&
          likeList.map((myData, idx) => {
            return (
              <PositionList
                key={myData.idx}
                title={myData.name}
                no={myData.id}
                company={myData.company}
                region={myData.region}
                country={myData.country}
                compensation={myData.reward_amount}
                thumbnail={myData.thumbnail}
                like={myData.likes}
              />
            );
          })}
      </ul>
    </LikeViewIn>
  );
};

const LikeViewIn = styled.div`
  width: 100%;

  ul {
    width: 100%;
    list-style: none;
    display: flex;
    height: 100%;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
  }
`;

export default LikeView;
