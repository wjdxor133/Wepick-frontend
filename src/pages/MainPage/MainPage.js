import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import 'react-circular-progressbar/dist/styles.css';
import Nav from "../../components/Nav/Nav";
import { AiOutlineSetting } from "react-icons/ai";
import { FiFilter } from "react-icons/fi";
import TopCate from "./TopCate";
import PositionList from "./PositionList";
import Aggreesive from "./Aggreesive";
// import { API } from "../../config";
import MainSlider from "./MainSlider/MainSlider";
import FilterModal from "./MainFilter/FilterModal";
import { BsChevronLeft } from "react-icons/bs";
import { BsChevronRight } from "react-icons/bs";

const MainPage = () => {
  const [data, setData] = useState([]);
  const [cate, setCate] = useState([]);
  const [aggreesive, setAggreesive] = useState([]);
  const [topImg, setTopImg] = useState([]);
  const [content, setContent] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [filter, setFilter] = useState([]);
  const [filterAlign, setFilterAlign] = useState("최신순");
  const [country, setCountry] = useState("한국");
  const [region, setRegion] = useState("전국");
  const [career, setCareer] = useState("전체");
  const [transform, setTransform] = useState(0);
  const [clicked, setClicked] = useState(0);

  const mainWidth = window.innerWidth;
  const percentage = 66;

  useEffect(() => {
    fetch("/data/mainMock.json")
      .then((res) => res.json())
      .then((res) => {
        setData(res.position);
        // console.log(res.position);
      });
    fetch("/data/mainTopImg.json")
      .then((res) => res.json())
      .then((res) => {
        setTopImg(res.main_top_img);
      });
    fetch("/data/mainCate.json")
      .then((res) => res.json())
      .then((res) => {
        setCate(res.data);
      });
    // fetch(`${API}/job/category`)
    //   .then((res) => res.json())
    //   .then((res) => {
    //     setCate(res.data);
    //     console.log(res.data);
    //   });
    fetch("/data/aggreesive.json")
      .then((res) => res.json())
      .then((res) => {
        setAggreesive(res.data);
      });
    fetch("/data/filter.json")
      .then((res) => res.json())
      .then((res) => {
        setFilter(res.data);
      });
    fetch("/data/MainContent.json")
      .then((res) => res.json())
      .then((res) => {
        setContent(res.data);
      });
  }, []);

  const mainContent = content.map((quest, idx) => {
    return (
      <PositionList
        key={quest.idx}
        title={quest.name}
        no={quest.job_id}
        company={quest.company}
        region={quest.region}
        country={quest.country}
        compensation={quest.reward_amount}
        thumbnail={quest.thumbnail}
        like={quest.likes}
      />
    );
  })

  const aggreesiveList = aggreesive.map((aggreesiveData, idx) => {
    return (
      <Aggreesive
        title={aggreesiveData.name}
        position={aggreesiveData.number_positions}
        ci={aggreesiveData.logo_url}
        img={aggreesiveData.thumbnail_url}
      />
    );
  })

  const mainList = cate.map((mainData, idx) => {
    return (
      <TopCate
        id={mainData.id}
        main_category_id={mainData.name}
        backImg={mainData.background_image}
        duty={mainData.sub_category}
        transform={transform}
      />
    );
  })

  const list = data.map((myData, idx) => {
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
  });

  const filterClick = () => {
    setShowModal(true);
  }

  const arrowRight = () => {
    setTransform(() => transform - 680);
    setClicked(() => clicked - 1);
  }

  const arrowLeft = () => {
    setTransform(() => transform + 680);
    setClicked(() => clicked + 1);
  }

  return (
    <>
      <Nav />
      <MainSlider mainWidth={mainWidth} slides={topImg} />
      < Main >
        <PostionBox>
          <FlexBox>
            <PostionTitleContainer>
              <PostionTitle>나에게 딱 맞는 포지션 </PostionTitle>
              <AiOutlineSetting className="setting" size="27" />
            </PostionTitleContainer>
            <MoreView>더 보기</MoreView>
          </FlexBox>
          <FlexUl>
            {list}
          </FlexUl>
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
                  textSize: "25px"
                })}
              />
            </Percent>
            <BlueBoxText>프로필에 이력서 추가하고, 인사담당자에게 직접 면접 제안 받으세요.</BlueBoxText>
          </div>
          <BlueBoxButton>이력서 강화하기</BlueBoxButton>
        </BlueBox>
        <QuestContainer>
          <QuestCate>
            <PostionTitle>전체</PostionTitle>
            <PositionBox>
              <PositionBtnLeft>
                <BsChevronLeft size={30} onClick={arrowLeft} />
              </PositionBtnLeft>
              <FlexUlCate transform={transform}>{mainList}</FlexUlCate>
              <PositionBtnRight>
                <BsChevronRight size={30} onClick={arrowRight} />
              </PositionBtnRight>
            </PositionBox>
          </QuestCate>
          <FlexBox>
            <QuestFliterLeft>
              {
                showModal ? (
                  <FilterModal
                    setShowModal={setShowModal}
                    setFilter={setFilter}
                    setFilterAlign={setFilterAlign}
                    setCountry={setCountry}
                    setRegion={setRegion}
                    setCareer={setCareer}
                    filter={filter}
                  />
                ) : null
              }
              <QuestFliterButton>{filterAlign}</QuestFliterButton>
              <QuestFliterButton><span>국가</span> {country}</QuestFliterButton>
              <QuestFliterButton propsColor="black"><span>지역</span> {region}</QuestFliterButton>
              <QuestFliterButton propsColor="black"><span>경력</span> {career}</QuestFliterButton>
            </QuestFliterLeft>
            <QuestFliterRight>
              <QuestFliterButton onClick={filterClick}>
                <span><FiFilter color="#2986FA" /></span>필터
              </QuestFliterButton>
            </QuestFliterRight>
          </FlexBox>
          <AggressiveBox>
            <PostionTitle>적극 채용 중인 회사</PostionTitle>
            <AggresiveFlexUl>
              {aggreesiveList}
            </AggresiveFlexUl>
            <FlexUl>
              {mainContent}
            </FlexUl>
          </AggressiveBox>
        </QuestContainer>
      </Main >
    </>
  );
}

const Main = styled.div`
  max-width: 1060px;
  padding: 0em 2em;
  margin: 0 auto;
`;

const PostionBox = styled.div`
  margin-top: 3em;
  margin-bottom: -1em;
`;

const BlueBox = styled.div`
  width: 100%;
  background-color: ${props => props.theme.color.main};
  display:flex;
  justify-content: space-between;
  padding: 1em 2em;
  border-radius: .2em;
  align-items: center;
  div{
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
  color: ${props => props.theme.color.main};
  border-radius: .2em;
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
  .setting{
    color: ${props => props.theme.color.gray};
    margin-left: .7em;
    margin-top: -.3em;
  }
`;

const PostionTitle = styled.div`
  font-size: 1.5rem;
  margin: 1em 0em 1em 0em;
  font-weight: 600;
  color: ${props => props.theme.color.font};
`;

const MoreView = styled.span`
  font-size: 1.25rem;
  color: ${props => props.theme.color.gray};
`;

const QuestContainer = styled.div`
  background-color: white;
  display: block;
  position: sticky;
  left: 0;
  top: 55px;
`;

const QuestCate = styled.div`
  border-bottom: 1px solid gray;
  padding-bottom: 1em;
  margin-top: 3em;
  /* position: sticky; 
  position: -webkit-sticky;
  top: 50px; */
  background-color: white;
`;

const FlexUl = styled.ul`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  flex-wrap: wrap;
`;

const AggresiveFlexUl = styled.ul`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 3.5em;
`;

const PositionBox = styled.div`
  width: 1000px;
  display: flex;
  align-items: center;
  overflow-x: scroll;
  -ms-overflow-style: none;
  ::-webkit-scrollbar {
    display:none;
  }
`;

const FlexUlCate = styled.ul`
  width: 945px;
  display: inline-block;
  white-space: nowrap; 
  /* 위에 white-space사용해서 해결함 ㅇㅅㅇ */
  transform: translateX(${(props) => props.transform}px);
  transition: transform .15s ease-in-out;
`;

const QuestFliterLeft = styled.div`
  display:flex;
  margin-top: 1em;
`;

const QuestFliterButton = styled.div`
  padding: .8em 1em;
  border: 1px solid #dddddd;
  font-size: .8125rem;
  border-radius: .2em;
  display: flex;
  align-items: center;
  margin-right: .5em;
  color: ${props => props.propsColor === "black" ? "black" : "#2986FA"};
  :last-child{
    margin-right: 0em;
  }
  span{
    margin-right: .3em;
    color: #999999;
  }
`;

const QuestFliterRight = styled.div`
  margin-top: 1em;  
`;

const AggressiveBox = styled.div`
 
`;

const PositionBtnRight = styled.div`
  width: 150px;
  height: 60px;
  cursor: pointer;
  transition: all 0.2s linear;
  color: ${props => props.theme.color.gray};
  z-index: 10;
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: linear-gradient(to right, rgba(255,255,255,1), rgba(255,255,255,.5));
`;

const PositionBtnLeft = styled.div`
  width: 300px;
  height: 60px;
  cursor: pointer;
  transition: all 0.2s linear;
  color: ${props => props.theme.color.gray};
  z-index: 10;
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: linear-gradient(to left, rgba(255,255,255,.5), rgba(255,255,255,1));
  background-color: transparent;
`;

export default MainPage;