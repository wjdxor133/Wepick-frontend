import React from "react";
import styled from "styled-components"

const Footer = () => {
  return (
    <FooterWarp>
      <Contents>
        <FooterLeft>
          <ContentsHeader>
            <ul>           
              <Logo/>
              <li>서비스 소개</li>
              <li>이용약관</li>
              <li>개인정보 처리방침</li>
              <li>고객센터</li>
            </ul>
          </ContentsHeader>
          <ContentsText>
            <span>(주)원티드랩 (대표이사:이복기) | 서울특별시 강남구 테헤란로 142 | 개인정보보호관리자 : 황리건 | 통신판매번호 : 2016-서울강남-00207</span>
            <span>유료직업소개사업등록번호 : (국내) 제2016-3220163-14-5-00001호 | (국외) F1201020170005 | 사업자등록번호 : 299-86-00021</span>
            <span>서비스 및 기업문의 02-539-7118</span>
            <span>© Wantedlab, Inc.</span>
          </ContentsText>
        </FooterLeft>
        <SelectBox>
          <select>
            <option selected="selected">한국 (한국어)</option>
          </select>
          <Korea/>             
        </SelectBox>           
      </Contents>
    </FooterWarp>
  )
}

export default Footer;

const FooterWarp = styled.div`
  width:100%;
  height:261px;
  background-color:#2b2d2e;
  display:flex;
  justify-content:center;
  align-items:center;
`;

const Contents = styled.div`
  width: 1060px;
  height: 100%;
  padding:30px 0 70px 0;
  display:flex;
`;

const FooterLeft = styled.div`
  width:790px;
  height:100%;
  display:flex;
  flex-direction:column;
  justify-content:flex-start;
`;

const ContentsHeader = styled.div`
  width:100%;
  height:36px;
  ul {
    width:80%;
    height:100%;
    display:flex;
    justify-content:space-between;
    align-items:center;
    font-size:16px;
    color:rgba(255,255,255,0.8);
    font-weight: 400;
  }
`;

const Logo = styled.li`
  background-image:url("https://s3.ap-northeast-2.amazonaws.com/static.wanted.co.kr/images/logo_wanted.png");
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  width:100px;
  height:16px;
`;

const ContentsText = styled.div`
  display:flex;
  flex-direction:column;
  margin-top:25px;
  span {
    margin:4px 0;
    font-size:12px;
    color:rgba(255,255,255,0.8);
    font-weight: 400;
  }
`;

const SelectBox = styled.div`
  width:250px;
  height:36px;
  position:relative;
  select {
    width:100%;
    height:100%;
    background: black;
    border-radius: 0;
    border: none;
    font-size: 14px;
    color: rgba(255, 255, 255, 0.8);
    padding: 8px 45px;    
  }
`;

const Korea = styled.i`
  position:absolute;
  left:12px;
  top:12px;
  background-image:url("https://s3.ap-northeast-2.amazonaws.com/wanted-public/ico_KR.svg");
  width:20px;
  height:14px;
`;