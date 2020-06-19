import React, { useState, useEffect } from "react";
import styled, { css } from "styled-components";
import Nav from "../../components/Nav/Nav";
import Footer from "../../components/Footer/Footer";
import Slider from "../../components/Slider/Slider";
import ModalPortal from "../../Modal/ModalPortal";
import ShareModal from "./ShareModal";
import DetailApply from "./DetailApply";
import MapContainer from "./MapContainer";
import PositionList from "../MainPage/PositionList";
import { AiFillHeart } from "react-icons/ai";
import { BsFillBookmarkFill } from "react-icons/bs";
import { FiCheck } from "react-icons/fi";
import { API } from "../../config";

const DetailPage = (props) => {
  const [detailData, setDetailData] = useState([]);
  const [detailList, setDetailList] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [apply, setApply] = useState(false);
  const [likeValue, setLikeValue] = useState(undefined);
  const [likeCount, setlikeCount] = useState();
  const [bookMarkValue, setBookMarkValue] = useState(false);
  const [followValue, setFollowValue] = useState(undefined);

  // console.log("props", props);

  useEffect(() => {
    // 채용 디테일 페이지 모든 데이터
    // fetch("/data/teak2Data/DetailPageMock.json")

    // 토큰값 받기
    const token = localStorage.getItem("access_token");

    fetch(`${API}/job/${props.match.params.job}`)
      .then((res) => res.json())
      .then((res) => {
        setDetailData(res.data);
        setlikeCount(res.data[0].likes);
      });

    // like 상태 값 받기
    fetch(`${API}/job/like?job_id=${props.match.params.job}`, {
      headers: {
        Authorization: token,
      },
    })
      .then((res) => res.json())
      .then((res) => {
        setLikeValue(res.is_like);
      });

    // 북마크 상태 값 받기
    fetch(`${API}/job/bookmark?job_id=${props.match.params.job}`, {
      headers: {
        Authorization: token,
      },
    })
      .then((res) => res.json())
      .then((res) => {
        setBookMarkValue(res.is_bookmark);
      });

    // 팔로우 상태 값 받기
    fetch(`${API}/company/follow?company_id=${props.match.params.job}`, {
      headers: {
        Authorization: token,
      },
    })
      .then((res) => res.json())
      .then((res) => {
        setFollowValue(res.is_follow);
      });

    //원티드 추천 공고 데이터
    fetch("/data/mainMock.json")
      .then((res) => res.json())
      .then((res) => {
        setDetailList(res.position);
      });
  }, []);

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
      setLikeValue(!likeValue);
      if (likeValue) {
        setlikeCount(likeCount - 1);
      } else {
        setlikeCount(likeCount + 1);
      }

      const token = localStorage.getItem("access_token");
      // like 상태 값 보내기
      // 백엔드에 true, false 값을 보내야 함
      fetch(
        `${API}/job/like?account_id=1&job_id=${
        detailData.length > 0 && detailData[0].id
        }`,
        {
          method: "POST",
          headers: {
            Authorization: token,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            is_like: likeValue,
          }),
        }
      );
    }

    if (event === "bookMark") {
      setBookMarkValue(!bookMarkValue);

      const token = localStorage.getItem("access_token");
      fetch(
        `${API}/job/bookmark?account_id=1&job_id=${
        detailData.length > 0 && detailData[0].id
        }`,
        {
          method: "POST",
          headers: {
            Authorization: token,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            is_bookmark: bookMarkValue,
          }),
        }
      );

      // 백엔드에 true, false 값을 보내야 함
    }

    if (event === "follow") {
      setFollowValue(!followValue);

      const token = localStorage.getItem("access_token");
      fetch(
        `${API}/company/follow?account_id=1&company_id=${
        detailData.length > 0 && detailData[0].id
        }`,
        {
          method: "POST",
          headers: {
            Authorization: token,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            is_follow: followValue,
          }),
        }
      );
    }
  };

  console.log("likeCount", likeCount);
  return (
    <>
      <Nav />
      {showModal ? (
        <ModalPortal elementId="modal">
          <ShareModal showModal={showModal} setShowModal={setShowModal} />
        </ModalPortal>
      ) : null}
      {detailData.length > 0 && (
        <DetailPageIn>
          <DetailPageBox>
            <PageLeft>
              <Slider width={700} slides={detailData[0].images} />
              <div className="jobTitle">
                <h3>{detailData[0].name}</h3>
                <div className="TitleText">
                  <p className="TextLeft">{detailData[0].company}</p>
                  <div className="TextRight">
                    <span className="Benchmark">|</span>
                    <span>
                      {detailData[0].region}
                      •
                      {detailData[0].country}
                    </span>
                  </div>
                </div>
              </div>
              <InnerHTML
                dangerouslySetInnerHTML={{
                  __html: detailData[0].article,
                }}
              ></InnerHTML>
              <MapBox>
                <div className="mapText1">
                  <p>마감일</p>
                  <p>근무지역</p>
                </div>
                <div className="mapText2">
                  <p>{detailData[0].deadline}</p>
                  <p>{detailData[0].location}</p>
                </div>
              </MapBox>
              <GoogleMap>
                <MapContainer lat={detailData[0].lat} lng={detailData[0].lng} />
              </GoogleMap>
              <FollowBox>
                <div className="FollowLeft">
                  <img
                    src={`${detailData[0].logo_url}`}
                    alt="로고 이미지"
                  ></img>
                  <div>
                    <p className="FollowText1">{detailData[0].company}</p>
                    <p className="FollowText2">IT, 컨텐츠</p>
                  </div>
                </div>
                <Button
                  shape="follow"
                  color={followValue}
                  onClick={() => {
                    Click("follow");
                  }}
                >
                  <div className="followBox">
                    <div className="followIcon">
                      <FiCheck size="15" />
                    </div>
                    {followValue ? "팔로잉" : "팔로우"}
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
                            <p className="money">
                              {detailData[0].referer_amount.slice(0, 3) + ",000"}
                            원
                          </p>
                          </div>
                          <div className="item1">
                            <span className="person">지원자</span>
                            <p className="money">
                              {detailData[0].fereree_amount.slice(0, 3) + ",000"}
                            원
                          </p>
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
                            <div
                              className="Bottom1"
                              onClick={() => {
                                Click("like");
                              }}
                            >
                              <AiFillHeart
                                size="16"
                                color={likeValue ? "red" : "#e1e2e3"}
                              />
                              <p className="likeCount">{likeCount}</p>
                            </div>
                            <ul className="Bottom2">
                              {/* 이미지를 배열로 받아서 뿌려야 함 */}
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
                              size="18"
                              color={bookMarkValue ? "#258bf7" : "#e1e2e3"}
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
          </PageBottom>
        </DetailPageIn>
      )}
      <Footer />
    </>
  );
};

const DetailPageIn = styled.div`
  max-width: 1060px;
  padding: 50px 0;
  margin: 0 auto;
`;

const DetailPageBox = styled.div`
  display: flex;
  margin-top: 1em;
  justify-content: space-between;
`;

const PageLeft = styled.div`
  width: 65%;

  .jobTitle {
    margin-top: 2em;
    h3 {
      font-size: 1.5rem;
      font-weight: 600;
      margin-bottom: 0.4em;
      color: #333;
    }

    .TitleText {
      display: flex;
      font-size: 0.85rem;

      .TextLeft {
        font-size: 0.875rem;
        font-weight: 500;
        color: #333;
      }

      .TextRight {
        display: flex;
        align-items: center;

        span {
          font-size: 0.875rem;
          font-weight: 600;
          margin-right: 0.5em;
          color: #999;
        }

        .Benchmark {
          font-size: 0.6rem;
          font-weight: 400;
          margin: 0 0.8em 0;
          color: #999;
        }
      }
    }
  }
`;

const InnerHTML = styled.div`
  padding: 2em 0em 4em;
  p {
    font-size: 1rem;
    line-height: 1.7em;
    padding: 0.7em 0 1em;
    color: #333;

    span {
      line-height: 1.5em;
    }
  }

  h6 {
    font-size: 1.2rem;
    font-weight: 700;
    margin-top: 1.2em;
  }
`;

const PageRight = styled.div`
  width: 33%;
`;

const PageBottom = styled.div`
  width: 100%;
  margin-top: 5em;
  h3 {
    font-size: 1.5rem;
    font-weight: 600;
    margin-bottom: 0.4em;
    color: #333;
    margin: 1em 0;
  }

  .HireList {
    width: 100%;
    list-style: none;
    display: flex;
    align-items: center;
  }
`;

const Fixed = styled.div`
  position: sticky;
  top: 50px;
`;

const CompensationBox = styled.div`
  border: 1px solid #e1e2e3;
  border-radius: 3px;
  padding: 1.5em 1.2em;

  p {
    font-size: 1rem;
    font-weight: 500;
    margin-bottom: 1em;
  }

  .boxTop {
    width: 100%;
    display: flex;
    margin-top: 2em;

    .item1 {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      width: 50%;
    }
    .money{
      font-size: .9rem;
      font-weight: 700;
      margin-bottom: 2em;
    }
    .person {
      margin-bottom: 0.7em;
      font-size: 0.875rem;
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
        padding: .5em .7em;

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
      display: inline-block;
      border: 1px solid #e1e2e3;
      border-radius: 50%;
      padding: .3em .5em;

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
      font-weight: 500;
      text-align: center;
      padding: 1em;
      outline: none;
      font-size: 1rem;

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
      border: 1px solid #21c621;
      border-radius: 3px;
      background-color: #21c621;
      color: white;
      font-size: 1rem;
      font-weight: 500;
      text-align: center;
      margin-top: 1em;
      outline: none;
      padding: .9em 0em;

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
  margin-top: 1em;

  .mapText1 {
    color: #999;
    font-weight: 600;
    margin-right: 1em;
    margin-top: 1.5em;
    p {
      margin-bottom: 1.5em;
    }
  }

  .mapText2 {
    font-weight: 600;
    margin-top: 1.5em;
    margin-right: 1em;
    p {
      margin-bottom: 1.5em;
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
