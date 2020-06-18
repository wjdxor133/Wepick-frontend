import React, { useState, useEffect } from "react";
import styled from "styled-components";
import PositionList from "../MainPage/PositionList";

const LikeView = () => {
  const [likeList, setLikeList] = useState([]);

  useEffect(() => {
    fetch("/data/teak2Data/LikeViewData.json")
      .then((res) => res.json())
      .then((res) => {
        setLikeList(res.position);
      });
  }, []);

  console.log("likeList", likeList);
  return (
    <LikeViewIn>
      <ul>
        {likeList.length > 0 &&
          likeList.map((myData, idx) => {
            return (
              <PositionList
                key={myData.idx}
                title={myData.title}
                no={myData.job_id}
                company={myData.company}
                region={myData.region}
                country={myData.country}
                compensation={myData.reward_total}
                thumbnail={myData.thumbnail}
                like={myData.like}
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
    align-items: center;
  }
`;

export default LikeView;
