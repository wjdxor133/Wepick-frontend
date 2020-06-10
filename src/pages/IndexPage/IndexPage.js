import React, { useState, useEffect } from "react";
import styled, {css} from "styled-components"
import { Link, withRouter } from "react-router-dom";
import Nav from "../../components/Nav/Nav"
import image1 from "../../images/main_intro_01_20200326.jpg"
import image2 from "../../images/main_intro_02_bg_20200326.jpg"
import naver from "../../images/logo_naver.png"
import toss from "../../images/logo_toss.png"
import kakao from "../../images/logo_kakao.png"
import coupang from "../../images/logo_coupang.png"
import airbnb from "../../images/logo_airbnb.png"
import woowa from "../../images/logo_wooahan.png"
import sk from "../../images/logo_skt.png"
import facebook from "../../images/logo_facebook.png"



const IndexPage = () => {
 
  return (
    <Index>
      <Nav/>
        <AddImg high="500px" src={image1}></AddImg>
        <AddImg high="715px" src={image2}></AddImg>
        <Pick>
          <h1>나에게 딱 맞는 회사 찾기</h1>
          <h4>회원가입 후, 지금 가장 인기있는 채용 소식을 팔로우 해보세요.</h4>
          <Ul top="60px">
            <li><Link to="/"><Logo src={naver}/></Link></li>
            <li><Link to="/"><Logo src={toss}/></Link></li>
            <li><Link to="/"><Logo src={kakao}/></Link></li>
            <li><Link to="/"><Logo src={coupang}/></Link></li>
          </Ul>
          <Ul top="30px">
            <li><Link to="/"><Logo src={airbnb}/></Link></li>
            <li><Link to="/"><Logo src={woowa}/></Link></li>
            <li><Link to="/"><Logo src={sk}/></Link></li>
            <li><Link to="/"><Logo src={facebook}/></Link></li>
          </Ul>
          <Button><span>지금 시작하기</span></Button>
        </Pick>
    </Index>
  );
}

export default IndexPage;

const Index = styled.div`
  width:100%;
  height:200vh;
`;


const AddImg = styled.div`
  width:100%;
  height: ${(props) => props.high};
  background-image:url(
    ${(props) => props.src}
    );
  background-size: cover;
  background-repeat: no-repeat;
  background-position: 50%;
`;

const Pick = styled.div`
  padding: 100px 0;
  display:flex;
  flex-direction:column;
  align-items:center;
  & > h1 {
    font-size: 50px;
    font-weight: 600;
    line-height: 1.2;
  }
  & > h4 {
    margin-top: 16px;
    font-size: 20px;
    color: #666;
    font-weight: 400;
    line-height: 1.67;
  }
`;


const Ul = styled.ul`
  display:flex;
  justify-content:center;
  width:100%;
  margin-top:${(props) => props.top};
  & > li {
    display:flex;
    align-items:center;
    justify-content:center;
    margin:10px 40px;
  }
`;

const Logo = styled.img`
  width:160px;
`;

const Button = styled.div`
  width:285.56px;
  height:70.57px;
  padding: 17px 45px;
  border-radius: 45px;
  background-color: #3a68f9;
  display:flex;
  align-items:center;
  justify-content:center;
  color: #fff;
  margin-top: 80px;
  & > span {
    font-weight: 600;
    font-size: 17px;
  }
`;