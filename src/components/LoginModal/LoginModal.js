import React, { useEffect, useState } from "react";
import styled from "styled-components"
import GoogleLoginGo from "../GoogleLoginGo/GoogleLoginGo"
import { connect } from "react-redux";
import { changeModal, changeLogin, kindLogin } from "../../store/actions";
import { API } from "../../config";
import { withRouter } from "react-router-dom";

const LoginModal = ( { changeModal, changeLogin, modalOnoff, kindLogin, history } ) => {
  // modal 화면 페이지 넘버
  const [isView, setIsView] = useState(0);
  // email관련
  const [inputEmail, setInputEmail] = useState(""); //input 이메일 핸들러
  const [isValiEmail, setIsValiEmail] = useState(false); //input validation
  const [valiBoxEmail, setValiBoxEmail] = useState(false); //validation box onoff
  // 이름관련
  const [inputName, setInputName] = useState(""); //input 이름 핸들러
  const [isValiName, setIsValiName] = useState(false); //input validation
  const [valiBoxName, setValiBoxName] = useState(false); //validation box onoff
  // pass관련
  const [inputPass, setInputPass] = useState(""); //input pass 핸들러
  const [isValiPass, setIsValiPass] = useState(false); //input validation
  const [valiBoxPass, setValiBoxPass] = useState(false); //validation box onoff
  // pass Con관련
  const [inputPassCon, setInputPassCon] = useState(""); //input pass 핸들러  
  const [isValiPassCon, setIsValiPassCon] = useState(false); //input validation
  const [valiBoxPassCon, setValiBoxPassCon] = useState(false); //validation box onoff
  
  // modal 발생시 백그라운드에 추가되는 것
  useEffect(() => {
    modalOnoff ? window.document.body.style.overflowY="hidden" : window.document.body.style.overflowY="scroll"  
  }, [modalOnoff]);

  // email validate
  useEffect(() => {
    inputEmail.includes("@") ? setIsValiEmail(true) : setIsValiEmail(false)
  }, [inputEmail]);

  // name validate
  useEffect(() => {
    inputName.length>0 ? setIsValiName(true) : setIsValiName(false)
  }, [inputName]);

  // password validate
  useEffect(() => { 
    inputPass.length>=6 ? setIsValiPass(true) : setIsValiPass(false)
  }, [inputPass]);

  // passwordCon validate
  useEffect(() => {
    inputPassCon===inputPass ? setIsValiPassCon(true) : setIsValiPassCon(false)
  }, [inputPassCon, inputPass]);

  // enter키로 0번 모달 실행
  const enterfirstCheck = (e) => {
    if(e.keyCode===13 && isValiEmail) { // 엔터키 및 validate 성공시
      firstCheck() // 1단계 실행함수로 넘김
    } 
    if(e.keyCode===13 && !isValiEmail) { // 엔터키 및 validate 실패시
      setValiBoxEmail(true) // 경고박스 온
    }         
  }

  // 0번 모달: 공통적으로 나오는 email 입력창.
  const firstCheck = () => {
    if (isValiEmail===false) { // email validate 실패시
      setValiBoxEmail(true)  // 경고박스 온
    } else {
      fetch(`${API}/account/emailcheck`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          "email": inputEmail,             
        })
      })  
      .then((response) => response.json())
      .then(        
        function innerFunc(res) {
          if (res.message === "To Login") { // emailcheck.status가 200일 경우 비회원
            setIsView(1) // 비회원창으로 보낸다
          }
          if (res.message === "To Signup") { // emailcheck.status가 401일 경우 비회원
            setIsView(2) // 회원창으로 보낸다
          }
        }
      )    
    }
  }

  // enter키로 1번 모달 실행
  const enterSecondCheck = (e) => {
    if(e.keyCode===13 && isValiPass) { // 엔터키 및 validate 성공시
      secondCheck() // 2단계 실행함수로 넘김
    } 
    if(e.keyCode===13 && !isValiPass) { // 엔터키 및 validate 실패시
      setValiBoxPass(true) // 경고박스 온
    }
  }  

  // 1번 모달: 이미 가입된 회원의 경우에 나오는 창으로, 바로 비밀번호 확인.
  const secondCheck = () => {
    if (isValiPass===false) { // password validate 실패시
      setValiBoxPass(true) // 경고박스 온
    } else {
      fetch(`${API}/account/signin`, {
        method: "POST",
        headers: {
          "Content-Type":"application/json",
        },
        body: JSON.stringify({
          "email":inputEmail,
          "password":inputPass,
        })
      })
      .then(
        function innerFunc(res) {
          if (res.status === 401) { // signin.status가 401일 경우 패스워드가 틀림
            alert("비밀번호를 다시 확인해주세요.")
          }
          if (res.status === 200) { // signin.status가 200일 경우 로그인 성공
            res.json().then((res) => localStorage.setItem("access_token", res.access_token)); // BackEnd에서 온 토큰 저장
            sucSet(); // password validate 성공시 로그인 성공 세트 함수 실행
          } 
          if (res.status === 400 || res.status === 500) {
            alert("일시적으로 에러가 발생했습니다.")
          }         
        }      
      )
    }   
  }

  // enter키로 2번 모달 실행
  const enterThirdCheck = (e) => {    
    if(e.keyCode===13 && !isValiName) { // 엔터키 및 name validate 실패시
      setValiBoxName(true) // name 경고박스 온
    } 
    if(e.keyCode===13 && !isValiPass) { // 엔터키 및 pass validate 실패시
      setValiBoxPass(true) // pass 경고박스 온
    }    
    if(e.keyCode===13 && !isValiPassCon) { // 엔터키 및 passCon validate 실패시
      setValiBoxPassCon(true) // passCon 경고박스 온
    }
    if(e.keyCode===13) {
      if(isValiName) { // 엔터키 및 name validate 성공하고
        if(isValiPass) { // 엔터키 및 pass validate 성공하고
          if(isValiPassCon){ // 엔터키 및 passCon validate 성공하면
            thirdCheck() // 3단계 실행함수로 넘김
          }
        }  
      }
    }
  }
  
  // 2번 모달: 비회원인 경우에 나오는 창으로, 이름, 비밀번호 입력받음.
  const thirdCheck = () => {
    if (isValiName===false) { // name validate 실패시
      setValiBoxName(true)  // name 경고박스 온
    } 
    if (isValiPass===false) { // pass validate 실패시
      setValiBoxPass(true) // pass 경고박스 온
    } 
    if (isValiPassCon===false) { // passCon validate 실패시
      setValiBoxPassCon(true) // passCon 경고박스 온
    } 
    if(isValiName) { // name validate 성공하고
      if(isValiPass) { // pass validate 성공하고
        if(isValiPassCon){ // passCon validate 성공하고     
          fetch(`${API}/account/signup`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              "username":inputName,
              "email":inputEmail,
              "password":inputPass,      
            })
          })
          .then(
            function innerFunc(res) {
              if (res.status === 200) { // signup.status가 200일 경우 로그인 성공
                welcomeSet(); // password validate 성공시 로그인 성공 세트 함수 실행
              }
              if (res.status === 400) { // signup.status가 401일 경우 패스워드가 틀림
                alert("이미 존재하는 회원입니다.")
              }
            }
          )
        }
      }
    }
  }
  
  // 로그인 성공시 실행할 함수
  const sucSet = () => {
    changeModal(false); changeLogin(true); kindLogin("default"); setIsView(0);
    setInputEmail(""); setInputName(""); setInputPass(""); setInputPassCon("");   
    document.documentElement.scrollTop=0;
    history.push("/main")
  }

  // 회원가입 성공시 실행할 함수
  const welcomeSet = () => {
    alert("원티드에 오신 것을 환영합니다")
    changeModal(false); setIsView(0);
    setInputEmail(""); setInputName(""); setInputPass(""); setInputPassCon("");   
    document.documentElement.scrollTop=0;
  }

  // 모달창 취소시 실행할 함수
  const xSet = () => {
    changeModal(false); setIsView(0); 
    setInputEmail(""); setInputName(""); setInputPass(""); setInputPassCon("");
    setIsValiEmail(false); setIsValiName(false); setIsValiPass(false); setIsValiPassCon(false);
    setValiBoxEmail(false); setValiBoxName(false); setValiBoxPass(false); setValiBoxPassCon(false);
  }

  return (
    <ModalArea>
      <ModalBackground modal={modalOnoff} onClick={xSet}/>
      <ModalVisible modal={modalOnoff} isView={isView}>
        <ModalHeader big>
          <span>wanted</span>
          <Xbutton onClick={xSet}><span>X</span></Xbutton>          
        </ModalHeader>
        <ModalBody onKeyDown={enterfirstCheck}>
          <ModalBodyHeader>
            <h1>친구에게 딱 맞는</h1>
            <h1>회사를 추천해 주세요!</h1>
            <h2>원티드는 친구에게 좋은 회사를 추천하고,</h2>
            <h3>채용 성공시 보상 받을 수 있는 서비스입니다.</h3>
          </ModalBodyHeader>
          <ModalInput>
            <i>이메일</i>
            <InputComEmail 
              onKeyDown={() => setValiBoxEmail(false)} onChange={(e) => setInputEmail(e.target.value)}  
              value={inputEmail} valiBoxEmail={valiBoxEmail} type="text" placeholder="이메일을 입력해 주세요."
             />
            <WarmRedEmail valiBoxEmail={valiBoxEmail}>올바른 이메일 형식을 입력해주세요.</WarmRedEmail>
          </ModalInput>
          <ModalBodyContents>
            <SnsButton blue onClick={firstCheck}>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g fill="none" fill-rule="evenodd" stroke="#FFF" stroke-width="2"><rect width="17.2" height="14" x="3.4" y="5" rx="3"></rect><path d="M3.2 5.6L12 12l8.8-6.4"></path></g></svg>
              <i>이메일로 시작하기</i>  
            </SnsButton>
            <h4>or</h4>
            <SnsButton margin>
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18"><path fill="#1877f2" fill-rule="evenodd" d="M18 9a9 9 0 1 0-10.406 8.89v-6.288H5.309V9h2.285V7.017c0-2.255 1.343-3.501 3.4-3.501.984 0 2.014.175 2.014.175v2.215h-1.135c-1.118 0-1.467.694-1.467 1.406V9h2.496l-.399 2.602h-2.097v6.289C14.71 17.215 18 13.492 18 9"></path></svg>
              <i>페이스북으로 시작하기</i>
            </SnsButton>
            <SnsButton margin>
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18"><path fill="#000" fill-rule="nonzero" d="M13.852 9.563c.025 2.724 2.36 3.63 2.386 3.642-.02.064-.373 1.292-1.23 2.56-.741 1.096-1.51 2.189-2.722 2.212-1.19.022-1.574-.715-2.935-.715-1.36 0-1.786.692-2.913.737-1.17.045-2.06-1.186-2.807-2.278C2.104 13.486.937 9.406 2.504 6.65c.778-1.367 2.169-2.233 3.679-2.255 1.148-.023 2.232.782 2.934.782s2.02-.968 3.404-.826c.58.025 2.207.238 3.252 1.786-.084.053-1.941 1.147-1.921 3.425m-2.238-6.689c.621-.76 1.04-1.82.925-2.874-.895.036-1.977.604-2.62 1.364-.575.674-1.078 1.751-.943 2.785.998.078 2.017-.514 2.638-1.275"></path></svg>  
              <i>Apple로 시작하기</i>
            </SnsButton>
            <GoogleLoginGo/>
            <p>걱정마세요! 여러분의 지원 활동은 SNS에 노출되지 않습니다.</p>
            <i>회원가입 시 <span>개인정보 처리방침</span>과 <span>이용약관</span>을 확인하였으며, 동의합니다.</i>
          </ModalBodyContents>
        </ModalBody>
      </ModalVisible>      
      <ModalPass isView={isView}>
        <ModalHeader>
          <span>비밀번호 입력</span>
          <Xbutton onClick={xSet}><span>X</span></Xbutton>          
        </ModalHeader>
        <ModalBody onKeyDown={enterSecondCheck}>         
          <ModalInput>
            <i>비밀번호</i>
            <InputComPass 
              onKeyDown={() => setValiBoxPass(false)} onChange={(e) => setInputPass(e.target.value)}
              value={inputPass} valiBoxPass={valiBoxPass} type="password" placeholder="비밀번호"
            />
            <WarmRedPass valiBoxPass={valiBoxPass}>올바른 비밀번호가 아닙니다.</WarmRedPass>
          </ModalInput>
          <SnsButton hidden blue top onClick={secondCheck}>
            <i>로그인</i>
          </SnsButton>
          <h5><span>비밀번호 초기화/변경</span></h5>
        </ModalBody>  
      </ModalPass>
      <ModalNonUser isView={isView}>
        <ModalHeader>
          <span>회원가입</span>
          <Xbutton onClick={xSet}><span>X</span></Xbutton>          
        </ModalHeader>
        <ModalBody onKeyDown={enterThirdCheck}>         
          <ModalInput>
            <i>이름</i>
            <InputComName 
              onKeyDown={() => setValiBoxName(false)} onChange={(e) => setInputName(e.target.value)}
              value={inputName} valiBoxName={valiBoxName} type="text" placeholder="이름을 입력해 주세요."
            />
            <WarmRedName valiBoxName={valiBoxName}>이름을 입력해 주세요.</WarmRedName>
          </ModalInput>
          <ModalInput>
            <i>비밀번호</i>
            <InputComPass 
              onKeyDown={() => setValiBoxPass(false)} onChange={(e) => setInputPass(e.target.value)}
              value={inputPass} valiBoxPass={valiBoxPass} type="password" placeholder="비밀번호를 6자 이상 입력해 주세요."
            />
            <WarmRedPass valiBoxPass={valiBoxPass}>비밀번호를 6자 이상 입력해 주세요.</WarmRedPass>
          </ModalInput>
          <ModalInput>
            <i>비밀번호 확인</i>
            <InputComPassCon 
              onKeyDown={() => setValiBoxPassCon(false)} onChange={(e) => setInputPassCon(e.target.value)}
              value={inputPassCon} valiBoxPassCon={valiBoxPassCon} type="password" placeholder="비밀번호를 다시 한번 입력해 주세요."
            />
            <WarmRedPassCon valiBoxPassCon={valiBoxPassCon}>비밀번호를 다시 확인해 주세요.</WarmRedPassCon>
          </ModalInput>  
          <SnsButton hidden blue top onClick={thirdCheck}>
            <i>회원가입하기</i>
          </SnsButton>
        </ModalBody>
      </ModalNonUser>    
    </ModalArea>
  )
}

const mapStateToProps = (state) => {
  return {
    modalOnoff:state.modalOnoff
  }
}

export default withRouter(connect(mapStateToProps, {changeModal, changeLogin, kindLogin})(LoginModal));

const ModalArea = styled.div`
  display:flex;
  justify-content:center;
`;

const ModalBackground = styled.div`
  position:${props => props.modal?"fixed":""};
  display:${props => props.modal?"":"none"};
  opacity:${props => props.modal?"0.5":"0"};
  z-index:${props => props.modal?"10000":"-1"};
  top:0px;
  width:100%;
  height:100vh;
  background-color:black;  
`;

const ModalVisible = styled.div`
  position:${props => props.modal?"fixed":""};
  display:${props => props.modal?"":"none"};
  opacity:${props => props.modal?"1":"0"};
  z-index:${props => props.modal?"20000":"-1"};
  display:${props => props.isView===0?"":"none"};
  background-color:white;  
  top: 50%;
  left: 50%;
  width: 400px;
  height: calc(100vh - 150px);
  transform: translate(-50%, -50%);
  border-radius: 5px;
  overflow-y: scroll;   
`;

const ModalHeader = styled.div`
  display:flex;
  justify-content:center;
  align-items:center;
  width:100%;
  padding: 20px;
  position: relative;
  span {
    font-size:${props => props.big?22:16}px;
    letter-spacing:-1px;
    font-weight:bold;
  }
`;

const Xbutton = styled.button`
  cursor:pointer;
  outline:0;
  position: absolute;
  top: 50%;
  right: 0px;
  transform: translateY(-50%);
  line-height: 0;
  padding: 15px;
  background-color:white;
  border:none;
  span {
    font-size: 20px;
    color:rgb(153, 153, 153);
  }
`;

const ModalBody = styled.div`
  padding: 20px;
  text-align: center;
  h5 {
    position:absolute;
    bottom:5px;
    height:54px;
    width:90%;
    display:flex;
    align-items:center;
    justify-content:center;
    span {
      cursor:pointer;
      font-size: 14px;
      color: #36f;
      font-weight:600;
    }
  }   
`;

const ModalBodyHeader = styled.div`
  display:flex;
  flex-direction:column;
  align-items:center;
  width:100%;
  word-break: break-word;
  margin-top: 24px;
  margin-bottom: 40px; 
  h1 {
    line-height: 1.54;
    font-size: 26px;
    font-weight: 600;
    color: rgb(51, 51, 51);
  }
  h2 {    
    margin-top: 16px;
    line-height: 1.5;
    font-size: 16px;
    font-weight: 400;
    color: rgb(102, 102, 102);
  }
  h3 {
    line-height: 1.5;
    font-size: 16px;
    font-weight: 400;
    color: rgb(102, 102, 102);
  }  
`;

const ModalInput = styled.div`
  display:flex;
  flex-direction:column;
  align-items:flex-start;
  padding-bottom: 22px;
  i {
    color: #767676;
    font-size: 14px;
    font-weight: 400;
  }    
`;

const InputComEmail = styled.input`
  width: 100%;
  height: 50px;
  padding: 0 15px;
  margin-top: 11px;
  border-radius: 5px;
  border: 1px solid ${props => props.valiBoxEmail?"red":"#e1e2e3"};
  background-color: #fff;
  font-size: 15px;
  color: #333;
  :focus {
    outline-color:rgba(51, 102, 255, 0.5);
    box-shadow: 0 0 0 1px "#3a68f9";
  }
  ::placeholder {
    color:#767676;
    opacity:0.5;
  }   
`;

const InputComName = styled.input`
  width: 100%;
  height: 50px;
  padding: 0 15px;
  margin-top: 11px;
  border-radius: 5px;
  border: 1px solid ${props => props.valiBoxName?"red":"#e1e2e3"};
  background-color: #fff;
  font-size: 15px;
  color: #333;
  :focus {
    outline-color:rgba(51, 102, 255, 0.5);
    box-shadow: 0 0 0 1px "#3a68f9";
  }
  ::placeholder {
    color:#767676;
    opacity:0.5;
  }   
`;

const InputComPass = styled.input`
  width: 100%;
  height: 50px;
  padding: 0 15px;
  margin-top: 11px;
  border-radius: 5px;
  border: 1px solid ${props => props.valiBoxPass?"red":"#e1e2e3"};
  background-color: #fff;
  font-size: 15px;
  color: #333;
  :focus {
    outline-color:rgba(51, 102, 255, 0.5);
    box-shadow: 0 0 0 1px "#3a68f9";
  }
  ::placeholder {
    color:#767676;
    opacity:0.5;
  }   
`;

const InputComPassCon = styled.input`
  width: 100%;
  height: 50px;
  padding: 0 15px;
  margin-top: 11px;
  border-radius: 5px;
  border: 1px solid ${props => props.valiBoxPassCon?"red":"#e1e2e3"};
  background-color: #fff;
  font-size: 15px;
  color: #333;
  :focus {
    outline-color:rgba(51, 102, 255, 0.5);
    box-shadow: 0 0 0 1px "#3a68f9";
  }
  ::placeholder {
    color:#767676;
    opacity:0.5;
  }   
`;

const ModalBodyContents = styled.div`
  display:flex;
  flex-direction:column;
  align-items:center;
  width:100%;
  p {
    margin-top: 26px;
    text-align: center;
    font-size: 12px;
    line-height: 18px;
    color: rgb(153, 153, 153);
  }
  & > i {
    text-align: center;
    font-size: 12px;
    line-height: 18px;
    color: rgb(153, 153, 153);
    margin-bottom: 20px;
    span {
      color: rgb(51, 54, 255);
      text-decoration: underline;
    }
  }
  & > h4 {
    color: rgb(150, 150, 150);
    font-size: 14px;
    font-weight: 500;
    line-height: 1;
    text-align: center;
    margin: 10px auto;
  }
`;

const SnsButton = styled.button`
  position:${props => props.hidden&&"absolute"};
  bottom:60px;
  outline:0;
  width: 90%;
  height: 54px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  color:${props => props.blue?"white":"rgb(115, 115, 115)"};
  background-color:${props => props.blue?"rgb(51, 102, 255)":"rgb(255, 255, 255)"};
  border-radius: 27px;
  border-width: 1px;
  border-style: solid;
  border-color: rgb(225, 226, 227);
  margin-bottom:${props => props.margin?"10px":""};
  margin-top:${props => props.top?"20px":""};
  svg {
    margin-right: 10px;
  }
  i {
    font-size: 16px;
    font-weight: 600;
  }
`;

const WarmRedEmail = styled.div`
  display:${props => props.valiBoxEmail?"":"none"};
  width:100%;
  padding:0 15px;
  margin-top: 6px;
  font-size: 12px;
  color: #fe415c;
  text-align:left;
`;

const WarmRedName = styled.div`
  display:${props => props.valiBoxName?"":"none"};
  width:100%;
  padding:0 15px;
  margin-top: 6px;
  font-size: 12px;
  color: #fe415c;
  text-align:left;
`;

const WarmRedPass = styled.div`
  display:${props => props.valiBoxPass?"":"none"};
  width:100%;
  padding:0 15px;
  margin-top: 6px;
  font-size: 12px;
  color: #fe415c;
  text-align:left;
`;

const WarmRedPassCon = styled.div`
  display:${props => props.valiBoxPassCon?"":"none"};
  width:100%;
  padding:0 15px;
  margin-top: 6px;
  font-size: 12px;
  color: #fe415c;
  text-align:left;
`;

const ModalPass = styled.div`
  display:${props => props.isView===1?"":"none"};
  position:${props => props.isView?"fixed":""};
  opacity:${props => props.isView?"1":"0"};
  z-index:${props => props.isView?"20000":"-1"}; 
  background-color:white;
  top: 50%;
  left: 50%;
  width: 400px;
  height: 319px;
  transform: translate(-50%, -50%);
  border-radius: 5px;
`;

const ModalNonUser = styled.div`
  display:${props => props.isView===2?"":"none"};
  position:${props => props.isView?"fixed":""};
  opacity:${props => props.isView?"1":"0"};
  z-index:${props => props.isView?"20000":"-1"}; 
  background-color:white;
  top: 50%;
  left: 50%;
  width: 400px;
  height: calc(100vh - 150px);
  transform: translate(-50%, -50%);
  border-radius: 5px;
`;