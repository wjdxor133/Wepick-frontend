import React, { useState, useEffect } from "react";
import styled, { css } from "styled-components";
import Nav from "../../components/Nav/Nav";
import CompanyPosition from "./CompanyPosition";
import Footer from "../../components/Footer/Footer";

const CompanyPage = () => {
  const [companyDate, setCompanyDate] = useState([]);
  useEffect(() => {
    fetch("/data/teak2Data/CompanyPageMock.json")
      .then((res) => res.json())
      .then((res) => {
        setCompanyDate(res.data);
        // console.log(res.data);
      });
  }, []);

  console.log("companyDate", companyDate);
  return (
    <>
      <Nav />
      <CompanyFollow>
        <FollowBox>
          <div className="FollowBoxLeft">
            <img
              src={companyDate.length > 0 && `${companyDate[0].logo_url}`}
            ></img>
            <Text companyName>
              {companyDate.length > 0 && companyDate[0].name}
            </Text>
          </div>
          <Button follow>팔로우</Button>
        </FollowBox>
      </CompanyFollow>
      <CompanyPageIn>
        <CompanyPageLeft>
          <Text companyPosition>채용 중인 포지션</Text>
          <div className="companyJobList">
            {companyDate.length > 0 &&
              companyDate[0].jobs.map((jobs, idx) => {
                return <CompanyPosition key={idx} jobs={jobs} />;
              })}
          </div>
          <Text companyPosition>회사 소개</Text>
          <ul className="companyImgList">
            {companyDate.length > 0 &&
              companyDate[0].images.map((image, idx) => {
                return (
                  <li key={idx}>
                    <img src={image.url} alt={image.name}></img>
                  </li>
                );
              })}
          </ul>
          <InnerHTML
            dangerouslySetInnerHTML={{
              __html:
                companyDate.length > 0 && companyDate[0].article.slice(0, 150),
            }}
          />
        </CompanyPageLeft>

        <CompanyPageRight>
          <h1>hello</h1>
        </CompanyPageRight>
      </CompanyPageIn>
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
  padding: 0 3em;
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
    props.follow &&
    css`
      background-color: #258bf7;
      border-style: none;
      border-radius: 3px;
      color: white;
      font-weight: 700;
      padding: 1em;
    `}
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
      margin-bottom: 1em;
    `}
`;

const CompanyPageIn = styled.div`
  max-width: 1060px;
  padding: 0 3em;
  margin: 2em auto;
  display: flex;
`;

const CompanyPageLeft = styled.div`
  width: 70%;

  .companyJobList {
    display: flex;
    margin-bottom: 5em;
  }

  .companyImgList {
    width: 70%;
    display: flex;

    li {
      img {
        width: 150px;
        height: 124px;
        margin-right: 0.5em;
      }
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

const CompanyPageRight = styled.div`
  width: 30%;
  background-color: blue;
`;

export default CompanyPage;
