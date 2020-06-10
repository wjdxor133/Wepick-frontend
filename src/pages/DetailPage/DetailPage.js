import React, { useState, useEffect } from "react";
import styled, { css } from "styled-components";
import ModalPortal from "../../Modal/ModalPortal";
import ShareModal from "./ShareModal";
import DetailApply from "./DetailApply";
import { AiFillHeart } from "react-icons/ai";
import { BsFillBookmarkFill } from "react-icons/bs";
import PositionList from "../MainPage/PositionList";

const DetailPage = () => {
  const [detailList, setDetailList] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [apply, setApply] = useState(false);

  useEffect(() => {
    fetch("/data/mainMock.json")
      .then((res) => res.json())
      .then((res) => {
        // console.log("res.recommendedNotice", res.recommendedNotice);
        setDetailList(res.position);
      });
  }, []);
  console.log("DetailList", detailList);

  const checkToken = () => {
    if (localStorage.getItem("token")) {
      setShowModal(true);
    } else {
      // 로그인 모달창이 뜸
      alert("로그인 해주세요!");
    }
  };

  const showShareModal = () => {
    checkToken();
  };

  const applyClick = () => {
    setApply(true);
  };

  return (
    <>
      {showModal ? (
        <ModalPortal elementId="modal">
          <ShareModal showModal={showModal} setShowModal={setShowModal} />
        </ModalPortal>
      ) : null}
      <DetailPageIn>
        <h1>Header</h1>
        <DetailPageBox>
          <PageLeft>
            <h1 style={{ height: "1000px" }}>데이터 받을 곳</h1>
            <MapBox>
              <div className="mapText1">
                <p>마감일</p>
                <p>근무지역</p>
              </div>
              <div className="mapText2">
                <p>상시</p>
                <p>경기도 성남시 분당구 성남대로331번길</p>
              </div>
              <GoogleMap></GoogleMap>
            </MapBox>
            <FollowBox>
              <div className="FollowLeft">
                <img
                  src="https://static.wanted.co.kr/images/wdes/0_5.f4e880de.jpg"
                  alt="로고 이미지"
                ></img>
                <div>
                  <p className="FollowText1">인공지능연구원</p>
                  <p className="FollowText2">IT, 컨텐츠</p>
                </div>
              </div>
              <Button shape="follow">팔로우</Button>
            </FollowBox>
          </PageLeft>
          <PageRight>
            <Fixed>
              {apply ? (
                <DetailApply setApply={setApply} />
              ) : (
                <div>
                  <CompensationBox>
                    <p className="CompensationTitle">채용보상금</p>
                    <div className="boxTop">
                      <div className="item1">
                        <span className="person">추천인</span>
                        <p>500,000원</p>
                      </div>
                      <div className="item1">
                        <span className="person">지원자</span>
                        <p>500,000원</p>
                      </div>
                    </div>
                    <Button shape="share" onClick={showShareModal}>
                      공유하기
                    </Button>
                  </CompensationBox>
                  <CompensationIcon>
                    <div className="boxBottom">
                      <div className="BottomLeft">
                        <div className="Bottom1">
                          <AiFillHeart size="16" color="#e1e2e3" />
                          <p> 109</p>
                        </div>
                        <ul className="Bottom2">
                          <li>1</li>
                          <li>2</li>
                          <li>3</li>
                        </ul>
                      </div>
                      <div className="Bottom3">
                        <BsFillBookmarkFill size="18" color="#e1e2e3" />
                      </div>
                    </div>
                  </CompensationIcon>
                  <Button shape="apply" onClick={applyClick}>
                    지원하기
                  </Button>
                </div>
              )}
            </Fixed>
          </PageRight>
        </DetailPageBox>
        <PageBottom>
          <h3>원티드 추천 공고</h3>
          <ul className="HireList">
            {detailList.map((myData) => {
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
            })}
          </ul>
        </PageBottom>
      </DetailPageIn>
    </>
  );
};

const DetailPageIn = styled.div`
  max-width: 1060px;
  padding: 0 1em;
  margin: 0 auto;
`;

const DetailPageBox = styled.div`
  display: flex;
  margin-top: 1em;
  justify-content: space-between;
`;

const PageLeft = styled.div`
  width: 60%;
  margin-right: 1.3em;
`;

const PageRight = styled.div`
  width: 35%;
`;

const PageBottom = styled.div`
  width: 100%;
  margin-top: 5em;
  h3 {
    font-size: 1.2rem;
    font-weight: 700;
    color: #333;
    margin: 1em 0;
  }

  .HireList {
    list-style: none;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
  }
`;

const Fixed = styled.div`
  position: sticky;
  top: 20px;
`;
const CompensationBox = styled.div`
  border: 1px solid #e1e2e3;
  padding: 1em;

  p {
    font-size: 0.8rem;
    font-weight: 700;
    margin-bottom: 1em;
  }

  .boxTop {
    width: 100%;
    display: flex;

    .item1 {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      width: 50%;
    }

    .person {
      margin-bottom: 0.5em;
      font-size: 0.85rem;
      font-weight: 700;
      color: #999;
    }
  }
`;

const CompensationIcon = styled.div`
  .boxBottom {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1em;
    border: 1px solid #e1e2e3;
    border-top-style: none;

    .BottomLeft {
      display: flex;
      align-items: center;
      .Bottom1 {
        display: flex;
        align-items: center;
        border: 1px solid #e1e2e3;
        border-radius: 20px;
        padding: 0.5em;

        p {
          font-size: 0.85rem;
          font-weight: 700;
          margin-left: 0.5em;
        }
      }

      .Bottom2 {
        display: flex;
      }
    }

    .Bottom3 {
      border: 1px solid #e1e2e3;
      border-radius: 50%;
    }
  }
`;

const Button = styled.button`
  ${(props) =>
    props.shape === "share" &&
    css`
      width: 100%;
      border: 1px solid ${(props) => props.theme.color.main};
      border-radius: 2px;
      background-color: #fff;
      color: #258bf7;
      font-weight: 900;
      text-align: center;
      padding: 1em;
      outline: none;

      &:hover {
        cursor: pointer;
      }
    `};

  ${(props) =>
    props.shape === "apply" &&
    css`
      width: 100%;
      border: 1px solid #258bf7;
      border-radius: 3px;
      background-color: #21c621;
      color: white;
      font-size: 0.9rem;
      font-weight: 700;
      text-align: center;
      padding: 0.8em 1em;
      margin-top: 1em;
      outline: none;

      &:hover {
        cursor: pointer;
      }
    `};

  ${(props) =>
    props.shape === "follow" &&
    css`
      background-color: ${(props) => props.theme.color.main};
      border: 1px solid ${(props) => props.theme.color.main};
      border-radius: 2px;
      padding: 0.5em 1.5em;
      color: white;
      font-weight: 700;
      outline: none;
    `}
`;

const MapBox = styled.div`
  border-top: 1px solid #e1e2e3;
  display: flex;

  .mapText1 {
    color: #999;
    font-weight: bold;
    margin-right: 1em;
    margin-top: 1em;
    p {
      margin-bottom: 1em;
    }
  }

  .mapText2 {
    font-weight: bold;
    margin-top: 1em;
    p {
      margin-bottom: 1em;
    }
  }
`;

const GoogleMap = styled.div``;

const FollowBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border: 1px solid #e1e2e3;
  padding: 1em;
  margin-top: 3em;

  .FollowLeft {
    display: flex;
    align-items: center;
    img {
      width: 50px;
      height: 50px;
      margin-right: 1em;
    }

    .FollowText1 {
      font-size: 0.85rem;
      font-weight: 700;
    }

    .FollowText2 {
      font-size: 0.8rem;
      font-weight: 700;
      margin-top: 0.5em;
      color: #999;
    }
  }
`;

export default DetailPage;
