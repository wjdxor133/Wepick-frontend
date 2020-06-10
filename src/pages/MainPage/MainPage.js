import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { AiOutlineSetting } from "react-icons/ai";
import PositionList from "./PositionList";

const MainPage = () => {
  const [data, setdata] = useState([]);
  useEffect(() => {
    fetch("/data/mainMock.json")
      .then((res) => res.json())
      .then((res) => {
        setdata(res.position);
        console.log(res.position);
      });
  }, []);

  const list = data.map((myData, idx) => {
    return (
      <PositionList
        key={myData.idx}
        title={myData.title}
        no={myData.no}
        name={myData.name}
        area={myData.area}
        compensation={myData.compensation}
        img={myData.img}
      />
    );
  });

  return (
    <>
      <MainImgBox></MainImgBox>
      < Main >
        <PostionBox>
          <FlexBox>
            <PostionTitle>나에게 딱 맞는 포지션 <AiOutlineSetting /></PostionTitle>
            <MoreView>더 보기</MoreView>
          </FlexBox>
          <FlexBox>
            {list}
          </FlexBox>
        </PostionBox>
        <BlueBox>
          <Percent></Percent>
          <BlueBoxText>프로필에 이력서 추가하고, 인사담당자에게 직접 면접 제안 받으세요.</BlueBoxText>
          <BlueBoxButton>이력서 강화하기</BlueBoxButton>
        </BlueBox>
        <QuestContainer>
          <QuestCate>전체
            <QuestTitle></QuestTitle>
            <QuestTitleFliter></QuestTitleFliter>
          </QuestCate>
          <FlexBox>
            <QuestFliterLeft>
              <QuestFliterBlue>최신순</QuestFliterBlue>
              <QuestFliterCountry>국가 한국</QuestFliterCountry>
              <QuestFliterArea>지역 전국</QuestFliterArea>
              <QuestFliterCareer>경력 전체</QuestFliterCareer>
            </QuestFliterLeft>
            <QuestFliterRight>
              <QuestFliterBlue>필터</QuestFliterBlue>
            </QuestFliterRight>
          </FlexBox>
          <AggressiveBox>
            <AggressiveTitle>적극 채용 중인 회사</AggressiveTitle>
            <AggressiveContent>
              <AggressiveContentBox>
                <AggressiveImg></AggressiveImg>
                <AggressiveCI></AggressiveCI>
                <AggressiveCIName>위코드</AggressiveCIName>
                {/* <PostionListText>1개 포지션</PostionListText> */}
              </AggressiveContentBox>
            </AggressiveContent>
          </AggressiveBox>
        </QuestContainer>

        <Button>안녕 오늘은 언제 집에 갈 것 같니? 123456 Wanted</Button>

      </Main >
    </>
  );
}

const Main = styled.div`
  max-width: 1061px;
  padding: 0em 2em;
  margin: 0 auto;
`;

const MainImgBox = styled.div`
  width: 100%;
  height: 300px;
  background-color: ${props => props.theme.color.main}
`;

const PostionBox = styled.div`

`;

const BlueBox = styled.div`
  width: 100%;
  background-color: ${props => props.theme.color.main};
  display:flex;
  justify-content: space-between;
  padding: 1em;
`;

const Percent = styled.div`

`;

const BlueBoxText = styled.p`
  color: white;
`;

const BlueBoxButton = styled.div`
  background-color: white;
  padding: .5em 1em;
  width: 20%;
  color: ${props => props.theme.color.main};
  border-radius: .2em;
`;

const FlexBox = styled.div` 
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const PostionTitle = styled.div`
  font-size: 1.357rem
`;

const MoreView = styled.span`
  font-size: 1.125rem;
  color: ${props => props.theme.color.gray};
`;

const QuestContainer = styled.div`

`;

const QuestCate = styled.div`
  border-bottom: 1px solid gray;
`;

const QuestTitle = styled.span`
  color: ${props => props.theme.color.gray}
`;

const QuestTitleFliter = styled.div`
  width: 122px;
  height: 60px;
  border-radius: .3em;
  border: 1px solid gray;
  color: white
`;

const QuestFliterLeft = styled.div`
  display:flex
`;

const QuestFliterBlue = styled.div`
  color: ${props => props.theme.color.main}
`;

const QuestFliterCountry = styled.div`
  
`;

const QuestFliterArea = styled.div`
  
`;

const QuestFliterCareer = styled.div`
  
`;

const QuestFliterRight = styled.div`
  
`;

const AggressiveBox = styled.div`
  
`;

const AggressiveTitle = styled.div`
  
`;

const AggressiveContent = styled.div`
  
`;

const AggressiveContentBox = styled.div`
  width: 200px;
  height: 270px;
  border: 1px solid black;
`;

const AggressiveImg = styled.div`
  width: 100%;
  height: 55%;
  border: 1px solid black;
`;

const AggressiveCI = styled.div`
  
`;


const AggressiveCIName = styled.div`
  
`;


const Button = styled.button`
  color: ${props => props.theme.color.main};
`;

export default MainPage;