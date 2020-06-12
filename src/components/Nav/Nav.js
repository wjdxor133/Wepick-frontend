import React, { useState, useEffect } from "react";
import styled, {css} from "styled-components"
import { Link, withRouter  } from "react-router-dom";
import WdList from "../WdList/WdList"
import LoginModal from "../../components/LoginModal/LoginModal"
import { GoogleLogout } from 'react-google-login';

const Nav = (props) => {

  const [hiddenToggle, setHidden] = useState(false)
  const [data, setData] = useState({})
  const [isLogin, setLogin] = useState(false)
  const [profileToggle, setProfileHidden] = useState(false)
  const [isModal, setModal] = useState(false)

  useEffect(() =>{
    fetch("data/navWdListMock.json", {})
    .then((response) => response.json())
    .then((res) => {
      setData(res)
    })
  }, []);

  useEffect(() => {
    isModal?
    window.document.body.style.overflow="hidden":
    window.document.body.style.overflow="auto"  
  });

  return (
    <>
    <NavBar>
      <NavWarp>      
        <Visible show={hiddenToggle}>
          <NavContents>
            <Logo><Link to="/">wanted</Link></Logo>
            <NavUl underLine>
              <li onMouseEnter={() => {setHidden(true); setProfileHidden(false);}}><Link to="/">탐색</Link></li>
              <li onMouseEnter={() => setHidden(false)}><Link to="/">직군별 연봉</Link></li>
              <li onMouseEnter={() => setHidden(false)}><Link to="/">이력서</Link></li>
              <li onMouseEnter={() => setHidden(false)}><Link to="/">추천</Link></li>
              <li onMouseEnter={() => setHidden(false)}><Link to="/">이벤트</Link></li>
              <li onMouseEnter={() => setHidden(false)}><Link to="/">매치업</Link></li>
            </NavUl>
            <NavUl>
              <LoginLi login={isLogin} onClick={() => setProfileHidden(!profileToggle)}><Link to="/">로그아웃</Link></LoginLi>
              <LogoutLi login={isLogin} onClick={() => (setModal(true))}><Link to="/">회원가입/로그인</Link></LogoutLi>
              <li><Link to="/">기업 서비스</Link></li>
              <HiddenProfile show={profileToggle}>
                <ul>
                  <li><Link to="/">프로필</Link></li>
                  <li><Link to="/">지원현황</Link></li>
                  <li><Link to="/">좋아요</Link></li>
                  <li><Link to="/">북마크</Link></li>
                  <GoogleLogout
                    clientId="95532860446-c8epnqedahgonnetd4ahe925c1gs00f8.apps.googleusercontent.com"
                    render={props => (
                      <li onClick={props.onClick} disabled={props.disabled}><Link to="/">로그아웃</Link></li>
                    )}              
                    onLogoutSuccess={
                      function logOutEnd() {
                        localStorage.removeItem("accessToken");
                        setLogin(false);
                        setProfileHidden(false);
                      }                      
                    }                 
                  />
                </ul>
              </HiddenProfile>
            </NavUl>        
          </NavContents>            
        </Visible>
        <Invisible show={hiddenToggle} onMouseLeave={() => setHidden(false)}>
            {data.dev && <div>
              <WdList titleName={data.dev.title} titleUrl={data.dev.url} list={data.dev.list}/>
              <WdList plus="/1" titleName={data.dev2.title} titleUrl={data.dev2.url} list={data.dev2.list}/>
              <WdList plus="/2" titleName={data.biz.title} titleUrl={data.biz.url} list={data.biz.list}/>
              <WdList plus="/3" titleName={data.market.title} titleUrl={data.market.url} list={data.market.list}/>
              <WdList plus="/4" titleName={data.design.title} titleUrl={data.design.url} list={data.design.list}/>
            </div>}          
          </Invisible>            
      </NavWarp>
    </NavBar>
    <LoginModal modal={isModal} setModal={setModal} setLogin={setLogin} route={props} isLogin={isLogin}/>
    </>  
  );
}
export default withRouter(Nav);

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

const Visible = styled.div` 
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
  @media (min-width: 1200px) {       
    width:87.72%;
    max-width: 1060px;
    height:100%;
    display:flex;
    justify-content:space-between;
    align-items:center;
  }
  @media (max-width: 1199px) and (min-width: 992px) {
    width: 90%;
  }
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
  position: relative;
  display:flex;
  justify-content:space-around;  
  & > li > a {
    vertical-align: middle;
    font-size: 14px;
    line-height: 1;
    font-weight: 600;
    padding: 17px 13px;
    :hover {
      ${props => props.underLine &&
        css`
          box-shadow:inset 0 -2px #ddd;
      `}  
    }
  }
`;

const LoginLi = styled.li`
  display:${props =>props.login?"":"none"};
`;

const LogoutLi = styled.li`
  display:${props =>props.login?"none":""};
`;

const Invisible = styled.div`
  position:absolute;
  top:50px;
  width:100%;
  height:295px;
  background-color:white;
  transform:${props =>props.show?"translateY(0px)":"translateY(-294px)"};
  transition:ease 0.5s;      
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
  top:34px;
  width:170px;
  border-radius: 0 0 3px 3px;
  box-shadow: 0 2px 0 0 rgba(0,0,0,.05);
  border: 1px solid #e1e2e3;
  ul {
    padding-top:10px;
    li {
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