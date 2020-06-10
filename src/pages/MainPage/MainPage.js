import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { AiOutlineSetting } from "react-icons/ai";
import { BsChevronLeft } from "react-icons/bs";
import { BsChevronRight } from "react-icons/bs";
import { FiFilter } from "react-icons/fi";
import TopCate from "./TopCate";
import PositionList from "./PositionList";
import MainImg from "./MainImg";
import Aggreesive from "./Aggreesive";

const MainPage = () => {
  const [data, setData] = useState([]);
  const [cate, setCate] = useState([]);
  const [aggreesive, setAggreesive] = useState([]);
  const [topImg, setTopImg] = useState([]);

  const mainWidth = window.innerWidth;
  const percentage = 66;

  useEffect(() => {
    fetch("/data/mainMock.json")
      .then((res) => res.json())
      .then((res) => {
        setData(res.position);
        console.log(res.position);
      });
    fetch("/data/mainTopImg.json")
      .then((res) => res.json())
      .then((res) => {
        setTopImg(res.main_top_img);
      });
    fetch("/data/mainCate.json")
      .then((res) => res.json())
      .then((res) => {
        setCate(res.main_category);
      });
    fetch("/data/aggreesive.json")
      .then((res) => res.json())
      .then((res) => {
        setAggreesive(res.aggreesive);
      });
  }, []);

  const aggreesiveList = aggreesive.map((aggreesiveData, idx) => {
    return (
      <Aggreesive
        title={aggreesiveData.title}
        position={aggreesiveData.position}
        ci={aggreesiveData.ci}
        img={aggreesiveData.thumbnail_url}
      />
    );
  });

  const mainList = cate.map((mainData, idx) => {
    return (
      <TopCate
        main_category_id={mainData.main_category_id}
        duty={mainData.duty}
      />
    );
  });

  // const list = data.map((myData, idx) => {

  //   return (
  //     <PositionList
  //       key={myData.idx}
  //       title={myData.title}
  //       no={myData.job_id}
  //       name={myData.company}
  //       area={myData.country}
  //       compensation={myData.reward_total}
  //       img={myData.thumbnail_url}
  //     />
  //   );
  // });

  const list = data
    .filter((mockData) => mockData.job_id < 5)
    .map((myData, idx) => {
      return (
        <PositionList
          key={myData.idx}
          title={myData.title}
          no={myData.job_id}
          name={myData.company}
          area={myData.country}
          compensation={myData.reward_total}
          img={myData.thumbnail_url}
          like={myData.like}
        />
      );
    });

  const mainImg = topImg.map((topImgOne, idx) => {
    return (
      <MainImg
        title={topImgOne.title}
        content={topImgOne.content}
        img={topImgOne.img}
      />
    );
  });

  return (
    <>
      <Slider>
        <MainBox mainWidth={mainWidth}>{mainImg}</MainBox>
        <MainButton>
          <div>
            <BsChevronLeft />
          </div>
          <div>
            <BsChevronRight />
          </div>
        </MainButton>
      </Slider>
      <Main>
        <PostionBox>
          <FlexBox>
            <PostionTitleContainer>
              <PostionTitle>나에게 딱 맞는 포지션 </PostionTitle>
              <AiOutlineSetting className="setting" size="27" />
            </PostionTitleContainer>
            <MoreView>더 보기</MoreView>
          </FlexBox>
          <FlexUl>{list}</FlexUl>
        </PostionBox>
        <BlueBox>
          <div>
            <Percent>
              <CircularProgressbar
                value={percentage}
                text={`${percentage}%`}
                strokeWidth={6}
                styles={buildStyles({
                  strokeLinecap: "butt",
                  textColor: "white",
                  pathColor: "white",
                  trailColor: "#0260d1",
                  textSize: "25px",
                })}
              />
            </Percent>
            <BlueBoxText>
              프로필에 이력서 추가하고, 인사담당자에게 직접 면접 제안 받으세요.
            </BlueBoxText>
          </div>
          <BlueBoxButton>이력서 강화하기</BlueBoxButton>
        </BlueBox>
        <QuestContainer>
          <QuestCate>
            <PostionTitle>전체</PostionTitle>
            <FlexUlCate>{mainList}</FlexUlCate>
          </QuestCate>
          <FlexBox>
            <QuestFliterLeft>
              <QuestFliterButton>최신순</QuestFliterButton>
              <QuestFliterButton>
                <span>국가</span> 한국
              </QuestFliterButton>
              <QuestFliterButton propsColor="black">
                <span>지역</span> 전국
              </QuestFliterButton>
              <QuestFliterButton propsColor="black">
                <span>경력</span> 전체
              </QuestFliterButton>
            </QuestFliterLeft>
            <QuestFliterRight>
              <QuestFliterButton>
                <span>
                  <FiFilter color="#2986FA" />
                </span>
                필터
              </QuestFliterButton>
            </QuestFliterRight>
          </FlexBox>
          <AggressiveBox>
            <PostionTitle>적극 채용 중인 회사</PostionTitle>
            <FlexUl>{aggreesiveList}</FlexUl>
          </AggressiveBox>
        </QuestContainer>
      </Main>
    </>
  );
};

const Main = styled.div`
  max-width: 1060px;
  padding: 0em 2em;
  margin: 0 auto;
`;

const PostionBox = styled.div`
  margin: 3em 0em 5em 0em;
`;

const BlueBox = styled.div`
  width: 100%;
  background-color: ${(props) => props.theme.color.main};
  display: flex;
  justify-content: space-between;
  padding: 1em 2em;
  border-radius: 0.2em;
  align-items: center;
  div {
    display: flex;
    align-items: center;
  }
`;

const Percent = styled.div`
  width: 62px;
  height: 62px;
`;

const BlueBoxText = styled.p`
  color: white;
  font-size: 1.125rem;
  margin-left: 1em;
`;

const BlueBoxButton = styled.div`
  background-color: white;
  padding: 1em 3em;
  text-align: center;
  color: ${(props) => props.theme.color.main};
  border-radius: 0.2em;
  font-weight: 600;
`;

const FlexBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const PostionTitleContainer = styled.div`
  display: flex;
  align-items: center;
  .setting {
    color: ${(props) => props.theme.color.gray};
    margin-left: 0.7em;
    margin-top: -0.3em;
  }
`;

const PostionTitle = styled.div`
  font-size: 1.5rem;
  margin: 1em 0em 1em 0em;
  font-weight: 600;
  color: ${(props) => props.theme.color.font};
`;

const MoreView = styled.span`
  font-size: 1.25rem;
  color: ${(props) => props.theme.color.gray};
`;

const QuestContainer = styled.div``;

const QuestCate = styled.div`
  border-bottom: 1px solid gray;
  padding-bottom: 1em;
  margin-top: 3em;
`;

const FlexUl = styled.ul`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
`;

const FlexUlCate = styled.ul`
  display: flex;
  align-items: center;
`;

const QuestFliterLeft = styled.div`
  display: flex;
  margin-top: 1em;
`;

const QuestFliterButton = styled.div`
  padding: 0.8em 1em;
  border: 1px solid #dddddd;
  font-size: 0.8125rem;
  border-radius: 0.2em;
  display: flex;
  align-items: center;
  margin-right: 0.5em;
  color: ${(props) => (props.propsColor === "black" ? "black" : "#2986FA")};
  :last-child {
    margin-right: 0em;
  }
  span {
    margin-right: 0.3em;
    color: #999999;
  }
`;

const QuestFliterRight = styled.div``;

const AggressiveBox = styled.div``;

const Slider = styled.div`
  width: 100%;
  height: 300px;
  overflow: hidden;
  margin-top: 0 auto;
`;

const MainBox = styled.ul`
  /* overflow: hidden;
    width: 100%;
    height: 300px;
    margin: 0 auto;  */
  width: 500%;
  display: flex;
  transform: translateX(-${(props) => props.mainWidth}px);
  transition: transform ease-out 3s;
`;

const MainButton = styled.div`
  position: absolute;
  top: 13em;
  right: 0px;
  z-index: 10;
  display: flex;
  font-size: 1rem;
  margin-right: calc((100vw - 1060px) / 2);
  div {
    background-color: white;
    border-radius: 100%;
    width: 45px;
    height: 45px;
    text-align: center;
    line-height: 3.3em;
  }
`;

export default MainPage;
