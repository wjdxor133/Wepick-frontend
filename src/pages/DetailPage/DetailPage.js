import React, { useState, useEffect } from "react";
import styled, { css } from "styled-components";
import ModalPortal from "../../Modal/ModalPortal";
import ShareModal from "./ShareModal";
import DetailApply from "./DetailApply";
import MapContainer from "./MapContainer";
import PositionList from "../MainPage/PositionList";
import { AiFillHeart } from "react-icons/ai";
import { BsFillBookmarkFill } from "react-icons/bs";
import { FiCheck } from "react-icons/fi";

const DetailPage = (props) => {
  const [detailData, setDetailData] = useState([]);
  const [detailList, setDetailList] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [apply, setApply] = useState(false);
  const [likeColor, setLikeColor] = useState(false);
  const [bookMarkColor, setBookMarkColor] = useState(false);
  const [followColor, setFollowColor] = useState(false);

  useEffect(() => {
    // 채용 디테일 페이지 모든 데이터
    fetch("/data/teak2Data/DetailPageMock.json")
      .then((res) => res.json())
      .then((res) => {
        setDetailData(res.data);
      });

    //원티드 추천 공고 데이터
    fetch("/data/mainMock.json")
      .then((res) => res.json())
      .then((res) => {
        // console.log("res.recommendedNotice", res.recommendedNotice);
        setDetailList(res.position);
      });
  }, []);
  // console.log("detailList", detailList);
  // console.log("referer_amount", detailData);

  // 로그인 여부에 따라 다른 모달창이 뜸
  const checkToken = () => {
    if (localStorage.getItem("token")) {
      setShowModal(true);
    } else {
      // 로그인 모달창이 뜸
      alert("로그인 해주세요!");
    }
  };

  const Click = (event) => {
    if (event === "apply") {
      setApply(true);
    }

    if (event === "modal") {
      checkToken();
    }

    if (event === "like") {
      setLikeColor(!likeColor);
    }

    if (event === "bookMark") {
      setBookMarkColor(!bookMarkColor);
    }

    if (event === "follow") {
      setFollowColor(!followColor);
    }
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
            <div className="jobImg">
              <img
                src="https://static.wanted.co.kr/images/company/9664/nvenzgyfdwchgdq2__1080_790.jpg"
                alt=" "
              ></img>
            </div>
            <MapBox>
              <div className="mapText1">
                <p>마감일</p>
                <p>근무지역</p>
              </div>
              <div className="mapText2">
                <p>상시</p>
                <p>경기도 성남시 분당구 성남대로331번길</p>
              </div>
            </MapBox>
            <GoogleMap>
              <MapContainer />
            </GoogleMap>
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
              <Button
                shape="follow"
                color={followColor}
                onClick={() => {
                  Click("follow");
                }}
              >
                <div className="followBox">
                  <div className="followIcon">
                    <FiCheck size="15" />
                  </div>
                  {followColor ? "팔로잉" : "팔로우"}
                </div>
              </Button>
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
                    <Button
                      shape="share"
                      onClick={() => {
                        Click("modal");
                      }}
                    >
                      공유하기
                    </Button>
                  </CompensationBox>
                  <CompensationIcon>
                    <div className="boxBottom">
                      <div className="BottomLeft">
                        <div className="Bottom1">
                          <AiFillHeart
                            size="16"
                            color={likeColor ? "red" : "#e1e2e3"}
                            onClick={() => {
                              Click("like");
                            }}
                          />
                          <p className="likeCount"> 109</p>
                        </div>
                        <ul className="Bottom2">
                          {/* 배열로 받아야 함 */}
                          <li>
                            <img
                              className="profileImg1"
                              src="https://lh5.googleusercontent.com/-0RCDys4PImk/AAAAAAAAAAI/AAAAAAAAAAA/AMZuucnGJA6X_ZtFqyfoXJLaJebV-YCeOg/s96-c/photo.jpg"
                              alt="profile1.png"
                            ></img>
                          </li>
                          <li>
                            <img
                              className="profileImg2"
                              src="https://s3.ap-northeast-2.amazonaws.com/wanted-public/profile_default.png"
                              alt="profile2.png"
                            ></img>
                          </li>
                          <li>
                            <img
                              className="profileImg3"
                              src="https://s3.ap-northeast-2.amazonaws.com/wanted-public/profile_default.png"
                              alt="profile3.png"
                            ></img>
                          </li>
                        </ul>
                      </div>
                      <div className="Bottom3">
                        <BsFillBookmarkFill
                          size="15"
                          color={bookMarkColor ? "#258bf7" : "#e1e2e3"}
                          onClick={() => {
                            Click("bookMark");
                          }}
                        />
                      </div>
                    </div>
                  </CompensationIcon>
                  <Button
                    shape="apply"
                    onClick={() => {
                      Click("apply");
                    }}
                  >
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
  padding: 0 3em;
  margin: 0 auto;
`;

const DetailPageBox = styled.div`
  display: flex;
  margin-top: 1em;
  justify-content: space-between;
`;

const PageLeft = styled.div`
  width: 65%;

  .jobImg {
    img {
      width: 100%;
    }
  }
`;

const PageRight = styled.div`
  width: 33%;
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
        padding: 0.2em 0.5em 0.4em;

        &:hover {
          cursor: pointer;
        }

        .likeCount {
          font-size: 0.8rem;
          font-weight: 700;
          margin-left: 0.5em;
        }
      }

      .Bottom2 {
        display: flex;
        margin-left: 0.6em;

        li {
          width: 26px;
          height: 26px;
          .profileImg1 {
            width: 100%;
            border-radius: 50%;
            border: 0.1rem solid #fff;
            z-index: 2;
          }
          .profileImg2 {
            width: 100%;
            border-radius: 50%;
            margin-left: -0.5em;
            border: 0.1rem solid #fff;
            z-index: 1;
          }
          .profileImg3 {
            width: 100%;
            border-radius: 50%;
            margin-left: -1em;
            border: 0.1rem solid #fff;
            z-index: 0;
          }
        }
      }
    }

    .Bottom3 {
      border: 1px solid #e1e2e3;
      border-radius: 50%;
      padding: 0.23em 0.25em;

      &:hover {
        cursor: pointer;
      }
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

  .followBox {
    display: flex;
    align-items: center;

    .followIcon {
      line-height: 0.5rem;
      display: ${(props) => (props.color ? "block" : "none")};
    }
  }

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
      background-color: ${(props) =>
        props.color ? "#fff" : props.theme.color.main};
      border: 1px solid
        ${(props) => (props.color ? "#333" : props.theme.color.main)};
      border-radius: 2px;
      padding: 0.5em 1.5em;
      color: ${(props) => (props.color ? "#333" : "#fff")};
      font-weight: 700;
      outline: none;

      &:hover {
        cursor: pointer;
      }
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

const GoogleMap = styled.div`
  width: 100%;
`;

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

    &:hover {
      cursor: pointer;
    }
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
