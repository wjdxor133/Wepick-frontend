import React, { useState, useEffect } from "react";
import styled, {css} from "styled-components"
import { Link, withRouter } from "react-router-dom";
import Nav from "../../components/Nav/Nav"
import LoginModal from "../../components/LoginModal/LoginModal"

const IndexPage = (props) => {

  const [isModal, setModal] = useState(false);
  const [data, setData] = useState({})

  useEffect(() => {
    isModal?
    window.document.body.style.overflow="hidden":
    window.document.body.style.overflow="auto"  
  });

  useEffect(() =>{
    fetch("data/indexImgMock.json", {})
    .then((response) => response.json())
    .then((res) => {
      setData(res)
    })
  }, []);
 
  return (
    <>
      <Nav setModal={setModal}/>
      <LoginModal modal={isModal} setModal={setModal} route={props} />     
      <Index>    
        <AddImg high="550px" paddingLeft src={data.intro1}>
          <ImgText>
            <h1>요즘 이직, 원티드</h1>
            <h3>나에게 딱 맞는 회사, 원티드에서 찾아보세요!</h3>
            <Button><Link to="/">지금 시작하기</Link></Button>
          </ImgText>                  
        </AddImg>
        <AddImg high="715px" flex src={data.intro2}>
          <MiniBox src={data.miniImg1}> 
            <h2>매치업</h2>
            <p>프로필 등록 한번으로 인사담당자에게</p>
            <span>직접 면접 제안을 받으세요.</span>
            <Link to="/">더 알아보기</Link>
          </MiniBox>
          <MiniBox src={data.miniImg2}> 
            <h2>태그 검색</h2>
            <p>#재택근무 #반려동물</p>
            <span>내 취향에 맞는 회사를 찾아보세요.</span>
          </MiniBox>           
          <MiniBox src={data.miniImg3}> 
            <h2>지인 추천</h2>
            <p>나를 잘 아는 지인의 추천 받고</p>
            <span>50만원 합격 보상금도 받으세요.</span>
          </MiniBox>
        </AddImg>
        <Pick>
          <h1>나에게 딱 맞는 회사 찾기</h1>
          <h4>회원가입 후, 지금 가장 인기있는 채용 소식을 팔로우 해보세요.</h4>
          <Ul top="60px">
            <li><Link to="/"><img src={data.naver}/></Link></li>
            <li><Link to="/"><img src={data.toss}/></Link></li>
            <li><Link to="/"><img src={data.kakao}/></Link></li>
            <li><Link to="/"><img src={data.coupang}/></Link></li>
          </Ul>
          <Ul top="30px">
            <li><Link to="/"><img src={data.airbnb}/></Link></li>
            <li><Link to="/"><img src={data.woowa}/></Link></li>
            <li><Link to="/"><img src={data.sk}/></Link></li>
            <li><Link to="/"><img src={data.facebook}/></Link></li>
          </Ul>
          <Button marginTop><Link to="/">지금 시작하기</Link></Button>
        </Pick>
      </Index>      
    </>
  );
}

export default withRouter(IndexPage);

const Index = styled.div`
  width:100%;
`;

const AddImg = styled.div`
  display:flex;
  justify-content:${props => props.flex && "center"};
  align-items:${props => props.flex && "center"};
  width:100%;
  height: ${(props) => props.high};
  transform:translateY(50px);
  background-image:url(
    ${(props) => props.src}
    );
  padding-left:${props => props.paddingLeft && "calc(50% - 450px)"};   
  background-size: cover;
  background-repeat: no-repeat;
  background-position: 50%;
`;

const ImgText = styled.div`  
  padding-top: 160px;
  text-align: left;
  h1 {
    font-size: 50px;
    font-weight: 600;
    line-height: 1.2;
  }
  h3 {
    line-height: 1.2;
    margin: 16px 0 36px;
    white-space: pre-wrap;
    color: #666;
    font-size: 20px;
    font-weight: 400;
  }
`;

const MiniBox = styled.div`
  background-image:url(${(props) => props.src});
  padding: 60px 0 0;
  width: 340px;
  height: 480px;
  background-size: contain;
  background-repeat: no-repeat;
  background-position: 50%;
  display:flex;
  flex-direction:column;
  align-items:center;
  margin:1em 0.6em;
  h2 {
    font-size: 36px;
    font-weight: 600;
    line-height: .8;
  }
  p {
    margin: 25px auto 0;
    font-size: 16px;
  }
  span {
    margin: 7px auto 0;
    font-size: 16px;
  }
  a {
    display: inline-block;
    margin-top: 15px;
    font-size: 16px;
    color: #3a68f9;
  }
`;

const Pick = styled.div`
  padding: 100px 0;
  display:flex;
  flex-direction:column;
  align-items:center;
  h1 {
    font-size: 50px;
    font-weight: 600;
    line-height: 1.2;
  }
  h4 {
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
  li {
    display:flex;
    align-items:center;
    justify-content:center;
    margin:10px 40px;
    a > img {
      width:160px;
    } 
  }
`;

// const Logo = styled.img.attrs({
//   src: "../../images/logo_skt.png"
// })`

//   width:160px;
//   height:50px;
//   /* background-image:url(${(props) => props.src}); */
//   /* src:${(props) => props.src};
//   src:""; */
  

// `;

const Button = styled.div`
  width:285.56px;
  height:70.57px;
  cursor:pointer;
  padding: 17px 45px;
  border-radius: 45px;
  background-color: #3a68f9;
  display:flex;
  align-items:center;
  justify-content:center;
  color: #fff;
  margin-top:${props => props.marginTop&&"80px"};
  a {
    font-weight: 600;
    font-size: 20px;
  }
`;