import React, { useState, useEffect } from "react";
import styled from "styled-components"
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { changeNavColor, changeModal, changeProfile } from "../../store/actions";
import WdList from "../WdList/WdList"
import LoginModal from "../../components/LoginModal/LoginModal"
import GoogleLogoutGo from "../GoogleLogoutGo/GoogleLogoutGo"

const Nav = ( { changeNavColor, changeModal, changeProfile, navPick, loginCheck, profileUpdown }, props ) => {
  const navBlueColor = (input) => {
    changeNavColor(input);
  };
  
  const [data, setData] = useState({}) //히든 메뉴리스트 data 받을
  const [menuUpdown, setMenuUpdown] = useState(false) //히든 메뉴리스트(탐색 호버시 나올)

  useEffect(() => {
    fetch("data/navWdListMock.json", {})
    .then((response) => response.json())
    .then((res) => {
      setData(res)
    })
  }, []);

  return (
    <>
      <NavBar>
        <NavWarp>      
          <VisibleBox show={menuUpdown}>
            <NavContents>
              {/* <Logo onClick={() => props.history.push("/")}><Link>히스토리용</Link></Logo> */}
              <Logo onClick={() => {navBlueColor(0); changeProfile(false); setMenuUpdown(false); document.documentElement.scrollTop=0;}}><Link to="/">wanted</Link></Logo>
              <NavUl underLine navPick={navPick}>
                <Link to="/" onClick={() => {navBlueColor(1); changeProfile(false);}} onMouseEnter={() => {setMenuUpdown(true); changeProfile(false);}}>탐색</Link>
                <Link to="/" onClick={() => {navBlueColor(2); changeProfile(false);}} onMouseEnter={() => setMenuUpdown(false)}>직군별 연봉</Link>
                <Link to="/cv" onClick={() => {navBlueColor(3); changeProfile(false);}} onMouseEnter={() => setMenuUpdown(false)}>이력서</Link>
                <Link to="/" onClick={() => {navBlueColor(4); changeProfile(false);}} onMouseEnter={() => setMenuUpdown(false)}>추천</Link>
                <Link to="/" onClick={() => {navBlueColor(5); changeProfile(false);}} onMouseEnter={() => setMenuUpdown(false)}>이벤트</Link>
                <Link to="/" onClick={() => {navBlueColor(6); changeProfile(false);}} onMouseEnter={() => setMenuUpdown(false)}>매치업</Link>
              </NavUl>
              <NavUl>
                <InLoginProfile onClick={() => changeProfile(!profileUpdown)} loginCheck={loginCheck}/>
                <InLogoutProfile onClick={() => changeModal(true)} loginCheck={loginCheck}>회원가입/로그인</InLogoutProfile>
                <Link to="/">기업 서비스</Link>
                <HiddenProfile show={profileUpdown}>
                  <ul>
                    <li><Link to="/">프로필</Link></li>
                    <li><Link to="/">지원현황</Link></li>
                    <li><Link to="/">좋아요</Link></li>
                    <li><Link to="/">북마크</Link></li>
                    <GoogleLogoutGo/>                
                  </ul>
                </HiddenProfile>
              </NavUl>        
            </NavContents>            
          </VisibleBox>
          <InvisibleBox show={menuUpdown} onMouseLeave={() => setMenuUpdown(false)}>
              {data.dev && <div>
                <WdList titleName={data.dev.title} titleUrl={data.dev.url} list={data.dev.list}/>
                <WdList titleName={data.dev2.title} titleUrl={data.dev2.url} list={data.dev2.list} plus="/1"/>
                <WdList titleName={data.biz.title} titleUrl={data.biz.url} list={data.biz.list} plus="/2"/>
                <WdList titleName={data.market.title} titleUrl={data.market.url} list={data.market.list} plus="/3"/>
                <WdList titleName={data.design.title} titleUrl={data.design.url} list={data.design.list} plus="/4"/>
              </div>}          
            </InvisibleBox>            
        </NavWarp>
      </NavBar>
      <LoginModal/>
    </>  
  );
}

const mapStateToProps = (state) => {
  return {
    navPick:state.navPick,
    loginCheck:state.loginCheck,
    profileUpdown:state.profileUpdown
  }
}

export default withRouter(connect(mapStateToProps, {changeNavColor, changeModal, changeProfile})(Nav));

const NavBar = styled.nav`
  position:fixed;
  width:100%;
  height:50px;
  z-index:10;
`;

const NavWarp = styled.div`
  width:100%;
  height:50px;
`;

const VisibleBox = styled.div` 
  position:fixed;  
  width:100%;
  height:50px;
  display:flex;
  justify-content:center;
  align-content:center;
  z-index:100;
  background-color:white;
`;

const NavContents = styled.div`
  width: 1060px;
  height:100%;
  display:flex;
  justify-content:space-between;
`;

const Logo = styled.i`
  a {
    display:flex;
    justify-content:center;
    align-items:center;
    width:100%;
    height:100%;
    font-size: 22px;
    letter-spacing:-1px;
    font-weight:bold;
  }
`;

const NavUl = styled.ul`  
  display:flex;
  align-items:center;
  a {
    cursor:pointer;
    font-size: 14px;
    font-weight: 600;
    padding: 17px 13px;
    :hover {
      box-shadow:${props => props.underLine && "inset 0 -2px #ddd"};
    }
  }
  a:nth-child(${props => props.navPick && props.navPick}) {
    box-shadow:inset 0 -2px rgb(37, 139, 247);
  }
`;

const InLoginProfile = styled.div`
  display:${props =>props.loginCheck?"":"none"};
  cursor:pointer;
  background-image:url("https://s3.ap-northeast-2.amazonaws.com/wanted-public/profile_default.png");
  width: 32px;
    height: 32px;
    border-radius: 9999px;
    border: 1px solid #d1d1d1;
    background-color: #eee;
    background-position: 50%;
    background-size: cover;
`;

const InLogoutProfile = styled.a`
  display:${props =>props.loginCheck?"none":""};
  cursor:pointer;
`;

const InvisibleBox = styled.div`
  position:absolute;
  top:50px;
  width:100%;
  height:295px;
  background-color:white;
  transform:${props =>props.show?"translateY(0px)":"translateY(-294px)"};
  transition:ease 0.3s;      
  display:flex;
  justify-content:center;  
  border-bottom:1px solid #e1e2e3;  
  & > div {
      @media (min-width: 1200px) { 
      width:87.72%;
      height:100%;
      display:flex;
      max-width: 1060px;
    }
    @media (max-width: 1199px) and (min-width: 992px) {
      width: 90%;
    }
  }
`;

const HiddenProfile = styled.div`
  position:${props =>props.show?"absolute":""};
  display:${props =>props.show?"":"none"};
  background-color: #fff;
  top:50px;
  width:170px;
  border-radius: 0 0 3px 3px;
  box-shadow: 0 2px 0 0 rgba(0,0,0,.05);
  border: 1px solid #e1e2e3;
  ul {
    padding-top:10px;
    li {
      cursor:pointer;
      display: flex;  
      align-items: center;  
      justify-content: center;
      height:40px;
      width:100%;
      margin:10px 0;      
      font-weight: 400;
      font-size: 15px;
      color: #333;      
    }
    li:first-child {
      padding: 10px 0;
      border-bottom: 1px solid #e1e2e3;
    }
    li:last-child {
      height: 46px;
      margin:10px 0 0 0;
      background-color: #f2f4f7;
      border-top: 1px solid #e1e2e3;
      color: #767676;      
    }
  }
`;