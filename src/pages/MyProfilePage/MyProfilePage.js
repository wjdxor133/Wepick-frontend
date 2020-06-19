import React, { useState, useEffect } from "react";
import styled, { css } from "styled-components";
import Nav from "../../components/Nav/Nav";
import Profile from "./Profile";
import SupportStatus from "./SupportStatus";
import LikeView from "./LikeView";
import BookMarkView from "./BookMarkView";
import { API } from "../../config";

const MyProfilePage = () => {
  const [mypageData, setMypageData] = useState({});
  const [checkValue, setCheckValue] = useState(0);
  const menuItem = {
    0: <Profile />,
    1: <SupportStatus />,
    2: <LikeView />,
    3: <BookMarkView />,
  };
  useEffect(() => {
    const token = localStorage.getItem("access_token");
    fetch(`${API}/account/mypage`, {
      headers: {
        Authorization: token,
      },
    })
      .then((res) => res.json())
      .then((res) => {
        // console.log(res);
        setMypageData(res.data);
      });
  }, []);
  const itemCheck = (checkNum) => {
    switch (checkNum) {
      case 0:
        setCheckValue(checkNum);
        break;

      case 1:
        setCheckValue(checkNum);
        break;

      case 2:
        setCheckValue(checkNum);
        break;

      case 3:
        setCheckValue(checkNum);
        break;
    }
  };
  return (
    <div style={{ backgroundColor: "#f8f8fa" }}>
      <Nav />
      {mypageData && (
        <MyProfilePageIn>
          <PageContent>
            <PageLeft>
              <div
                className="myProfile"
                style={{ display: checkValue === 0 ? "block" : "none" }}
              >
                <div className="myProfile-top">
                  <img
                    src="https://lh4.googleusercontent.com/--AD93udEZyw/AAAAAAAAAAI/AAAAAAAAAAA/AMZuucnjnmPCFp-Id5D7an2hVumZZE_xwQ/s96-c/photo.jpg"
                    alt="photo.jpg"
                  ></img>
                  <Text black>{mypageData.name}</Text>
                  <Text gray>{mypageData.email}</Text>
                  <Text red>연락처를 입력해주세요.</Text>
                  <Span blue>기본정보 수정</Span>
                </div>
                <div className="myProfile-bottom">
                  <div className="item">
                    <Span>지원현황</Span>
                    <Span black>{mypageData.applies}</Span>
                  </div>
                  <div className="item">
                    <Span>좋아요</Span>
                    <Span black>{mypageData.likes}</Span>
                  </div>
                  <div className="item">
                    <Span>북마크</Span>
                    <Span black>{mypageData.bookmarks}</Span>
                  </div>
                </div>
              </div>
            </PageLeft>
            <PageRight>
              <PageHeader>
                <p
                  className="menu"
                  style={
                    checkValue === 0
                      ? { backgroundColor: "white", color: "#000" }
                      : null
                  }
                  onClick={() => {
                    itemCheck(0);
                  }}
                >
                  프로필
                </p>
                <p
                  className="menu"
                  style={
                    checkValue === 1
                      ? { backgroundColor: "white", color: "#000" }
                      : null
                  }
                  onClick={() => {
                    itemCheck(1);
                  }}
                >
                  지원 현황
                </p>
                <p
                  className="menu"
                  style={
                    checkValue === 2
                      ? { backgroundColor: "white", color: "#000" }
                      : null
                  }
                  onClick={() => {
                    itemCheck(2);
                  }}
                >
                  좋아요
                </p>
                <p
                  className="menu"
                  style={
                    checkValue === 3
                      ? { backgroundColor: "white", color: "#000" }
                      : null
                  }
                  onClick={() => {
                    itemCheck(3);
                  }}
                >
                  북마크
                </p>
              </PageHeader>
              {checkValue === 0 ? <Profile /> : null}
            </PageRight>
          </PageContent>
          {checkValue ? menuItem[checkValue] : null}
        </MyProfilePageIn>
      )}
    </div>
  );
};

const MyProfilePageIn = styled.div`
  max-width: 1060px;
  background-color: #f8f8fa;

  padding: 50px 0;
  margin: 0 auto;
`;

const PageHeader = styled.div`
  display: flex;
  padding: 2em 0;
`;

const PageContent = styled.div`
  width: 100%;
  display: flex;
`;

const PageLeft = styled.div`
  width: 25%;
  background-color: white;
  margin-top: 6em;

  .myProfile {
    border: 1px solid #e1e2e3;

    .myProfile-top {
      padding: 1em;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      img {
        width: 30%;
        height: 30%;
        border-radius: 50%;
      }
    }

    .myProfile-bottom {
      padding: 1em;
      .item {
        display: flex;
        justify-content: space-between;
        margin: 1em 0;
      }
    }
  }
`;

const PageRight = styled.div`
  width: 70%;
  margin-left: 1em;

  .menu {
    margin-right: 2em;
    font-weight: 700;
    padding: 0.5em 1.5em;
    border-radius: 20px;
    color: #999;

    &:hover {
      cursor: pointer;
      background-color: white;
      transition: all 0.4s;
      color: #000;
    }
  }
`;

const Text = styled.p`
  ${(props) =>
    props.black &&
    css`
      font-weight: 700;
      margin: 1em 0 1em;
    `}

  ${(props) =>
    props.gray &&
    css`
      font-size: 0.8rem;
      color: #999;
    `}

    ${(props) =>
      props.red &&
      css`
        font-size: 0.8rem;
        color: #ff415c;
        margin: 0.5em;
      `}

`;

const Span = styled.span`
  ${(props) =>
    props.blue &&
    css`
      font-weight: 700;
      color: #258bf7;
      border: 1px solid #e1e2e3;
      border-radius: 30px;
      padding: 0.5em 1.5em;
      margin: 1em 0 0;
    `}

  ${(props) =>
    props.black &&
    css`
      font-weight: 700;
    `}
`;

export default MyProfilePage;
