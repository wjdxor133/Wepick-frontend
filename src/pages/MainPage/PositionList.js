import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { AiFillHeart } from "react-icons/ai";
import { API } from "../../config";
import { useHistory } from "react-router-dom";

const PositionList = (props) => {
  let history = useHistory();
  console.log("props", props);
  const [likeCheck, setLikeCheck] = useState(undefined);

  useEffect(() => {
    const token = localStorage.getItem("access_token");

    fetch(`${API}/job/like?job_id=${props.no}`, {
      headers: {
        Authorization: token,
      },
    })
      .then((res) => res.json())
      .then((res) => {
        setLikeCheck(res.is_like);
        console.log(res);
      });
  }, []);

  const goDetail = (id) => {
    history.push(`/DetailPage/${id}`);
  };

  return (
    <PositionBoxList
      onClick={() => {
        goDetail(props.no);
      }}
    >
      <PositionImg>
        <img src={props.thumbnail} alt="" />
        <LikeBox>
          <div>
            <AiFillHeart style={{ color: likeCheck ? "red" : "null" }} />
          </div>
          <span>{props.like}</span>{" "}
        </LikeBox>
      </PositionImg>
      <PositionListTitle> {props.title} </PositionListTitle>
      <PositionText>
        <p> {props.company} </p>
        <span> {props.region} </span>
        <span> {props.country} </span>
      </PositionText>
      <Compensation>
        채용보상금 {Number(props.compensation).toLocaleString()}원
      </Compensation>
    </PositionBoxList>
  );
};

const PositionBoxList = styled.li`
  width: 230px;
  height: 400px;
  span {
    font-size: 0.875rem;
    color: ${(props) => props.theme.color.gray};
  }
  &:hover {
<<<<<<< HEAD
    cursor: pointer;
  }
=======
      cursor: pointer;
    }
>>>>>>> master
`;

const PositionImg = styled.div`
  position: relative;
  width: 100%;
  height: 175px;
  img {
    width: 100%;
    border-radius: 0.3em;
  }
`;

const LikeBox = styled.div`
  top: 0.7em;
  right: 0.7em;
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.3);
  color: white;
  width: 60px;
  height: 30px;
  border-radius: 0.2em;
  line-height: 0.1em;
  div {
    opacity: 0.5;
    margin-right: 0.2em;
  }
  span {
    font-size: 0.875rem;
    font-weight: 600;
  }
`;

const PositionListTitle = styled.div`
  font-size: 1.25rem;
  font-weight: 600;
  color: ${(props) => props.theme.color.font};
  margin: 0.8em 0px;
`;

const PositionText = styled.div`
  p {
    color: #999999;
    font-size: 1rem;
    margin-bottom: 0.5em;
  }
`;

const Compensation = styled.div`
  color: #666666;
  font-size: 0.875rem;
  margin-top: 1.2em;
`;

export default PositionList;
