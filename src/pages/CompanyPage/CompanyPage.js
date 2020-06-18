import React, { useState, useEffect } from "react";
import styled, { css } from "styled-components";
import { Link } from "react-router-dom";
import { API } from "../../config";
import Nav from "../../components/Nav/Nav";
import Slider from "../../components/Slider/Slider";
import CompanyPosition from "./CompanyPosition";
import SalaryPopup from "./SalaryPopup";
import Footer from "../../components/Footer/Footer";
import { IoIosArrowDown } from "react-icons/io";
import { IoIosArrowUp } from "react-icons/io";
import { FiCheck } from "react-icons/fi";

const CompanyPage = (props) => {
  const [companyDate, setCompanyDate] = useState([]);
  const [viewMoreCheck, setViewMoreCheck] = useState(false);
  const [detailViewMore, setDetailViewMore] = useState(false);
  const [blur, setBlur] = useState(false);
  const [followValue, setFollowValue] = useState();

  // console.log("props", props);

  const viewMoreBtn = (more) => {
    if (more === "contentMore") {
      setViewMoreCheck(!viewMoreCheck);
    }

    if (more === "detailMore") {
      setDetailViewMore(!detailViewMore);
    }
  };

  const followBtnClick = () => {
    setFollowValue(!followValue);
    const token = localStorage.getItem("access_token");

    // 팔로우 버튼 값 변경
    fetch(
      `${API}/company/follow?company_id=${
        companyDate.length > 0 && companyDate[0].id
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
  };

  const checkToken = () => {
    if (!localStorage.getItem("access_token")) {
      setBlur(true);
    }
  };

  useEffect(() => {
    // 회사 디테일 페이지 데이터
    // fetch("/data/teak2Data/CompanyPageMock.json")
    const token = localStorage.getItem("access_token");

    fetch(`${API}/company/${props.match.params.company}`)
      .then((res) => res.json())
      .then((res) => {
        setCompanyDate(res.data);
      });

    // 팔로우 데이터 가져오기
    fetch(
      `${API}/company/follow?company_id=${
        companyDate.length > 0 && companyDate[0].id
      }`,
      {
        headers: {
          Authorization: token,
        },
      }
    )
      .then((res) => res.json())
      .then((res) => {
        setFollowValue(res.is_follow);
      });

    checkToken();
  }, []);

  return (
    <>
      <Nav />
      <CompanyFollow>
        <FollowBox>
          <div className="FollowBoxLeft">
            <img
              src={companyDate.length > 0 && `${companyDate[0].logo_url}`}
              alt="logoImg"
            ></img>
            <Text companyName>
              {companyDate.length > 0 && companyDate[0].name}
            </Text>
          </div>
          <Button follow={followValue} onClick={followBtnClick}>
            <div className="followIcon">
              <FiCheck
                size="17"
                color
                style={{ display: followValue ? "block" : "none" }}
              />
              {followValue ? "팔로잉" : "팔로우"}
            </div>
          </Button>
        </FollowBox>
      </CompanyFollow>
      {companyDate.length > 0 && (
        <CompanyPageIn>
          <CompanyPageLeft>
            <Text companyPosition>채용 중인 포지션</Text>
            <div className="companyJobList">
              {detailViewMore
                ? companyDate[0].jobs.map((jobs, idx) => {
                    return <CompanyPosition key={idx} jobs={jobs} />;
                  })
                : companyDate[0].jobs
                    .filter((jobs, idx) => {
                      return jobs && idx < 4;
                    })
                    .map((jobs, idx) => {
                      return <CompanyPosition key={idx} jobs={jobs} />;
                    })}
              <div
                className="detailMore"
                onClick={() => viewMoreBtn("detailMore")}
                style={{
                  display: companyDate[0].jobs.length < 5 ? "none" : "block",
                }}
              >
                <div className="detailMoreItem">
                  <p>{detailViewMore ? "접기" : "더 많은 포지션 보기"}</p>
                  {detailViewMore ? (
                    <IoIosArrowUp size="15" />
                  ) : (
                    <IoIosArrowDown size="15" />
                  )}
                </div>
              </div>
            </div>
            <Text companyPosition>회사 소개</Text>
            <div className="imgSlides">
              <Slider width={800} slides={companyDate[0].images} />
            </div>
            <InnerHTML
              dangerouslySetInnerHTML={
                viewMoreCheck
                  ? {
                      __html: companyDate[0].article,
                    }
                  : {
                      __html: companyDate[0].article.slice(0, 150) + `...`,
                    }
              }
            />
            <div
              className="viewMore"
              onClick={() => viewMoreBtn("contentMore")}
            >
              <p>{viewMoreCheck ? "접기" : "더 보기"}</p>
              {viewMoreCheck ? (
                <IoIosArrowUp size="15" />
              ) : (
                <IoIosArrowDown size="15" />
              )}
            </div>
            <AverageSalary blur={blur}>
              <div className="blurBox" style={{ position: "relative" }}>
                <div className="SalaryBox">
                  <div className="SalaryBoxTitle">
                    <Text companyPosition>평균 연봉</Text>
                    <Text gray>출처: 국민연금</Text>
                  </div>
                  <div className="SalaryBoxIn">
                    <div className="SalaryBoxLeft">
                      <Text gray>신규 입사자</Text>
                      <Text Salary>
                        {companyDate[0].salary_new.slice(0, 1) +
                          "," +
                          companyDate[0].salary_new.slice(1, 4) +
                          " 만원"}
                      </Text>
                    </div>
                    <div className="SalaryBoxRight">
                      <Text gray>전체</Text>
                      <Text Salary>
                        {companyDate[0].salary_all.slice(0, 1) +
                          "," +
                          companyDate[0].salary_all.slice(1, 4) +
                          " 만원"}
                      </Text>
                    </div>
                  </div>
                </div>
                <div className="numEmployees">
                  <div className="EmployeesTitle">
                    <Text companyPosition>직원수</Text>
                    <Text gray>출처: 국민연금</Text>
                  </div>
                  <div className="EmployeesContent">
                    <div>
                      <Text gray>전체 인원</Text>
                      <Text Salary>{companyDate[0].employees.slice(0, 2)}</Text>
                    </div>
                  </div>
                </div>
              </div>
              {blur ? <SalaryPopup /> : null}
            </AverageSalary>
            <News>
              <Text companyPosition>이 회사의 뉴스</Text>
              <Link
                className="newsBox"
                href={companyDate[0].news[0].url}
                target="_blank"
              >
                <Text newsTitle>{companyDate[0].news[0].name}</Text>
                <Text newsData>{companyDate[0].news[0].source}</Text>
              </Link>
            </News>
          </CompanyPageLeft>
          <CompanyPageRight></CompanyPageRight>
        </CompanyPageIn>
      )}
      <Footer />
    </>
  );
};

const CompanyFollow = styled.div`
  padding: 50px 0em 0;
  display: flex;
  align-items: center;
  border-bottom: 1px solid #e1e2e3;
`;

const FollowBox = styled.div`
  max-width: 1060px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin: 1em auto;

  .FollowBoxLeft {
    display: flex;
    align-items: center;
    img {
      width: 50px;
      height: 50px;
      margin-right: 1em;
    }
  }
`;

const Button = styled.button`
  ${(props) =>
    props.follow
      ? css`
          border: 1px solid #000;
          background-color: white;
          padding: 0em 2em;
          border-radius: 3px;
          outline: none;

          &:hover {
            cursor: pointer;
          }
        `
      : css`
          background-color: #258bf7;
          border-style: none;
          border-radius: 3px;
          color: white;
          font-weight: 700;
          padding: 0.5em 2em;
          outline: none;

          &:hover {
            cursor: pointer;
          }
        `}
  .followIcon {
    display: flex;
    align-items: center;
  }
`;

const Text = styled.p`
  ${(props) =>
    props.companyName &&
    css`
      font-weight: 700;
      font-size: 1.4rem;
    `}

  ${(props) =>
    props.companyPosition &&
    css`
      font-weight: 700;
      font-size: 1.3rem;
    `}

    ${(props) =>
      props.gray &&
      css`
        font-size: 0.85rem;
        font-weight: 700;
        color: #999;
      `}

      ${(props) =>
        props.Salary &&
        css`
          font-size: 1.2rem;
          font-weight: 700;
        `}
    ${(props) =>
      props.newsTitle &&
      css`
        font-size: 0.9rem;
        font-weight: 700;
        line-height: 1.2rem;
        margin-bottom: 2em;
      `}

    ${(props) =>
      props.newsData &&
      css`
        font-size: 0.8rem;
        font-weight: 500;
        color: #666;
      `}
`;

const CompanyPageIn = styled.div`
  max-width: 1060px;
  margin: 2em auto;
  display: flex;
`;

const CompanyPageLeft = styled.div`
  width: 70%;
  margin: 0 -1em 0 0;

  .companyJobList {
    width: 105%;
    display: flex;
    flex-wrap: wrap;
    margin: 0 0 5em;

    .detailMore {
      width: 96%;

      border: 1px solid #e1e2e3;
      font-size: 0.9rem;
      padding: 0.9em;
      margin-top: 1em;
      color: #999;

      &:hover {
        cursor: pointer;
      }

      .detailMoreItem {
        display: flex;
        justify-content: center;
      }
    }
  }

  .imgSlides {
    margin-top: 1em;
    width: 100%;
  }

  .companyImgList {
    width: 70%;
    display: flex;
    margin-top: 1em;

    li {
      img {
        width: 150px;
        height: 124px;
        margin-right: 0.5em;
      }
    }
  }

  .viewMore {
    display: flex;
    font-size: 0.9rem;
    font-weight: 500;
    color: #999;

    &:hover {
      cursor: pointer;
    }

    p {
      margin-right: 0.5em;
    }
  }
`;

const InnerHTML = styled.div`
  margin: 1em 0;
  span {
    font-size: 0.96rem;
    line-height: 1.5em;
    color: #333;
  }
`;

const AverageSalary = styled.div`
  width: 100%;
  margin: 5em 0;
  position: relative;

  .blurBox {
    ${(props) =>
      props.blur === true &&
      css`
        filter: blur(7px);
      `};
  }
  .SalaryBox {
    .SalaryBoxTitle {
      display: flex;
      justify-content: space-between;
    }

    .SalaryBoxIn {
      display: flex;
      background-color: #f8f8fa;
      padding: 1.5em;
      margin: 1em 0 4em;
      border-radius: 3px;
      .SalaryBoxLeft {
        width: 50%;
        padding: 0 1.5em;
        border-right: 1px solid #e1e2e3;
        display: flex;
        justify-content: space-between;
        align-items: center;
      }

      .SalaryBoxRight {
        width: 50%;
        padding: 0 1.5em;
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
    }
  }

  .numEmployees {
    .EmployeesTitle {
      display: flex;
      justify-content: space-between;
    }
    .EmployeesContent {
      display: flex;
      justify-content: center;
      padding: 1.5em;
      margin: 1em 0;
      border-radius: 3px;
      background-color: #f8f8fa;
      div {
        width: 20%;
        display: flex;
        justify-content: space-around;
        align-items: center;
      }
    }
  }
`;

const News = styled.div`
  width: 100%;
  .newsBox {
    width: 50%;
    display: block;
    padding: 1em;
    border: 1px solid #e1e2e3;
    margin: 1em 0 4em;
  }
`;

const CompanyPageRight = styled.div`
  width: 30%;
`;

export default CompanyPage;
