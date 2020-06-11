import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { AiOutlineSetting } from "react-icons/ai";
import TopCate from "./TopCate";
import PositionList from "./PositionList";
import Aggreesive from "./Aggreesive";

const MainPage = () => {
  const [data, setData] = useState([]);
  const [cate, setCate] = useState([]);
  const [aggreesive, setAggreesive] = useState([]);

  useEffect(() => {
    fetch("/data/mainMock.json")
      .then((res) => res.json())
      .then((res) => {
        setData(res.position);
        console.log(res.position);
      });
    fetch("/data/mainCate.json")
      .then((res) => res.json())
      .then((res) => {
        setCate(res.main_category);
        console.log(res.main_category);
      });
    fetch("/data/aggreesive.json")
      .then((res) => res.json())
      .then((res) => {
        setAggreesive(res.aggreesive);
        console.log(res.aggreesive);
      });

    //시도해 볼 코드
    // Promise.all([
    //   fetch("/data/mainMock.json").then(response => response.json()),
    //   fetch("/data/mainCate.json").then(response => response.json())
    // ])
    //   .then((res) => {
    //     setcate(res.main_category);
    //     setdata(res.position);
    //     console.log(res);
    //   });
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

  const list = data.map((myData, idx) => {
    return (
      <PositionList
        key={myData.idx}
        title={myData.title}
        no={myData.job_id}
        name={myData.company}
        area={myData.country}
        compensation={myData.reward_total}
        img={myData.thumbnail_url}
      />
    );
  });

  return (
    <>
      <MainImgBox></MainImgBox>
      <Main>
        <PostionBox>
          <FlexBox>
            <PostionTitle>
              나에게 딱 맞는 포지션 <AiOutlineSetting />
            </PostionTitle>
            <MoreView>더 보기</MoreView>
          </FlexBox>
          <FlexUl>{list}</FlexUl>
        </PostionBox>
        <BlueBox>
          <Percent></Percent>
          <BlueBoxText>
            프로필에 이력서 추가하고, 인사담당자에게 직접 면접 제안 받으세요.
          </BlueBoxText>
          <BlueBoxButton>이력서 강화하기</BlueBoxButton>
        </BlueBox>
        <QuestContainer>
          <QuestCate>
            <QuestTitle>전체</QuestTitle>
            <FlexUl>{mainList}</FlexUl>
          </QuestCate>
          <FlexBox>
            <QuestFliterLeft>
              <QuestFliterBlue>최신순</QuestFliterBlue>
              <QuestFliterCountry>
                <span>국가</span> 한국
              </QuestFliterCountry>
              <QuestFliterArea>
                <span>지역</span> 전국
              </QuestFliterArea>
              <QuestFliterCareer>
                <span>경력</span> 전체
              </QuestFliterCareer>
            </QuestFliterLeft>
            <QuestFliterRight>
              <QuestFliterBlue>필터</QuestFliterBlue>
            </QuestFliterRight>
          </FlexBox>
          <AggressiveBox>
            <PostionTitle>적극 채용 중인 회사</PostionTitle>
            <FlexUl>{aggreesiveList}</FlexUl>
          </AggressiveBox>
        </QuestContainer>
        <Button>안녕 오늘은 언제 집에 갈 것 같니? 123456 Wanted</Button>
      </Main>
    </>
  );
};

const Main = styled.div`
  max-width: 1060px;
  padding: 0em 2em;
  margin: 0 auto;
`;

const MainImgBox = styled.div`
  width: 100%;
  height: 300px;
  background-color: ${(props) => props.theme.color.main};
`;

const PostionBox = styled.div``;

const BlueBox = styled.div`
  width: 100%;
  background-color: ${(props) => props.theme.color.main};
  display: flex;
  justify-content: space-between;
  padding: 1.5em;
  border-radius: 0.2em;
  align-items: center;
`;

const Percent = styled.div``;

const BlueBoxText = styled.p`
  color: white;
  font-size: 1.125rem;
`;

const BlueBoxButton = styled.div`
  background-color: white;
  padding: 0.7em 1em;
  width: 20%;
  color: ${(props) => props.theme.color.main};
  border-radius: 0.2em;
  text-align: center;
  font-weight: 600;
`;

const FlexBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const PostionTitle = styled.div`
  font-size: 1.357rem;
  margin: 1em 0em 1em 0em;
`;

const MoreView = styled.span`
  font-size: 1.125rem;
  color: ${(props) => props.theme.color.gray};
`;

const QuestContainer = styled.div``;

const QuestCate = styled.div`
  border-bottom: 1px solid gray;
  padding-bottom: 1em;
  margin-top: 3em;
`;

const QuestTitle = styled.span`
  color: ${(props) => props.theme.color.gray};
`;

const FlexUl = styled.ul`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const QuestFliterLeft = styled.div`
  display: flex;
`;

const QuestFliterBlue = styled.div`
  color: ${(props) => props.theme.color.main};
`;

const QuestFliterCountry = styled.div``;

const QuestFliterArea = styled.div``;

const QuestFliterCareer = styled.div``;

const QuestFliterRight = styled.div``;

const AggressiveBox = styled.div``;

const Button = styled.button`
  color: ${(props) => props.theme.color.main};
`;

export default MainPage;
