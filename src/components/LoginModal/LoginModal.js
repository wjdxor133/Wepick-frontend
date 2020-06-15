import React, { useEffect } from "react";
import styled from "styled-components"
import { Link, withRouter } from "react-router-dom";
import GoogleLoginGo from "../GoogleLoginGo/GoogleLoginGo"
import { connect } from "react-redux";
import { changeModal } from "../../store/actions";

const LoginModal = ( { changeModal, modalOnoff } ) => {

  useEffect(() => {
    modalOnoff?
    window.document.body.style.overflowY="hidden":
    window.document.body.style.overflowY="scroll"  
  }, [modalOnoff]);

  return (
    <ModalArea >
      <ModalBackground modal={modalOnoff} onClick={() => changeModal(false)}/>
      <ModalVisible modal={modalOnoff} >
        <ModalHeader>
          <span>wanted</span>
          <Xbutton onClick={() => changeModal(false)}><span>X</span></Xbutton>          
        </ModalHeader>
        <ModalBody>
          <ModalBodyHeader>
            <h1>친구에게 딱 맞는</h1>
            <h1>회사를 추천해 주세요!</h1>
            <h2>원티드는 친구에게 좋은 회사를 추천하고,</h2>
            <h3>채용 성공시 보상 받을 수 있는 서비스입니다.</h3>
          </ModalBodyHeader>
          <ModalInput>
            <i>이메일</i>
            <input placeholder="이메일을 입력해 주세요."></input>
          </ModalInput>
          <ModalBodyContents>
            <SnsButton blue>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g fill="none" fill-rule="evenodd" stroke="#FFF" stroke-width="2"><rect width="17.2" height="14" x="3.4" y="5" rx="3"></rect><path d="M3.2 5.6L12 12l8.8-6.4"></path></g></svg>
              <i onClick={() => changeModal(false)}><Link to="/cv">이메일로 시작하기</Link></i>
            </SnsButton>
            <h4>or</h4>
            <SnsButton  margin>
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18"><path fill="#1877f2" fill-rule="evenodd" d="M18 9a9 9 0 1 0-10.406 8.89v-6.288H5.309V9h2.285V7.017c0-2.255 1.343-3.501 3.4-3.501.984 0 2.014.175 2.014.175v2.215h-1.135c-1.118 0-1.467.694-1.467 1.406V9h2.496l-.399 2.602h-2.097v6.289C14.71 17.215 18 13.492 18 9"></path></svg>
              <i>페이스북으로 시작하기</i>
            </SnsButton>
            <SnsButton  margin>
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18"><path fill="#000" fill-rule="nonzero" d="M13.852 9.563c.025 2.724 2.36 3.63 2.386 3.642-.02.064-.373 1.292-1.23 2.56-.741 1.096-1.51 2.189-2.722 2.212-1.19.022-1.574-.715-2.935-.715-1.36 0-1.786.692-2.913.737-1.17.045-2.06-1.186-2.807-2.278C2.104 13.486.937 9.406 2.504 6.65c.778-1.367 2.169-2.233 3.679-2.255 1.148-.023 2.232.782 2.934.782s2.02-.968 3.404-.826c.58.025 2.207.238 3.252 1.786-.084.053-1.941 1.147-1.921 3.425m-2.238-6.689c.621-.76 1.04-1.82.925-2.874-.895.036-1.977.604-2.62 1.364-.575.674-1.078 1.751-.943 2.785.998.078 2.017-.514 2.638-1.275"></path></svg>  
              <i>Apple로 시작하기</i>
            </SnsButton>
            <GoogleLoginGo/>
            <p>걱정마세요! 여러분의 지원 활동은 SNS에 노출되지 않습니다.</p>
            <i>회원가입 시 <Link to="/">개인정보 처리방침</Link>과 <Link to="/">이용약관</Link>을 확인하였으며, 동의합니다.</i>
          </ModalBodyContents>
        </ModalBody>
      </ModalVisible>      
    </ModalArea>
  )
}

const mapStateToProps = (state) => {
  return {
    modalOnoff:state.modalOnoff
  }
}

export default withRouter(connect(mapStateToProps, {changeModal})(LoginModal));

const ModalArea = styled.div`
  display:flex;
  justify-content:center;
`;

const ModalBackground = styled.div`
  position:${props => props.modal?"fixed":""};
  display:${props => props.modal?"":"none"};
  opacity:${props => props.modal?"0.5":"0"};
  z-index:${props => props.modal?"100":"-1"};
  top:0px;
  width:100%;
  height:100vh;
  background-color:black;  
`;

const ModalVisible = styled.div`
  position:${props => props.modal?"fixed":""};
  display:${props => props.modal?"":"none"};
  opacity:${props => props.modal?"1":"0"};
  z-index:${props => props.modal?"200":"-1"};
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
    font-size: 22px;
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
  input {
    width: 100%;
    height: 50px;
    padding: 0 15px;
    margin-top: 11px;
    border-radius: 5px;
    border: 1px solid #e1e2e3;
    background-color: #fff;
    font-size: 15px;
    color: #333;
    :focus {
      outline: none;
      box-shadow: 0 0 0 1px #3a68f9;
      &::-webkit-input-placeholder, textarea:focus::-webkit-input-placeholder { 
        color:transparent; 
      }
    }
    ::placeholder {
      color:#767676;
    }    
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
    a {
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
  outline:0;
  width: 100%;
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
  svg {
    margin-right: 10px;
  }
  i {
    font-size: 16px;
    font-weight: 600;
  }
`; 