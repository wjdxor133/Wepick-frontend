import React  from "react";
import styled from "styled-components"
import { GoogleLogin } from "react-google-login";
import { connect } from "react-redux";
import { changeLogin, changeModal, kindLogin } from "../../store/actions";
import { API } from "../../config"

const GoogleLoginGo = ( { changeLogin, changeModal, kindLogin } ) => {
  return (
  <GoogleLogin 
    cookiePolicy={'single_host_origin'} isSignedIn={false} 
    clientId="95532860446-c8epnqedahgonnetd4ahe925c1gs00f8.apps.googleusercontent.com"
    render={props => (
      <SnsButton onClick={props.onClick} disabled={props.disabled}>
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18"><g fill="none" fill-rule="evenodd"><path fill="#EA4335" d="M9 3.48c1.69 0 2.83.73 3.48 1.34l2.54-2.48C13.46.89 11.43 0 9 0 5.48 0 2.44 2.02.96 4.96l2.91 2.26C4.6 5.05 6.62 3.48 9 3.48z"></path><path fill="#4285F4" d="M17.64 9.2c0-.74-.06-1.28-.19-1.84H9v3.34h4.96c-.1.83-.64 2.08-1.84 2.92l2.84 2.2c1.7-1.57 2.68-3.88 2.68-6.62z"></path><path fill="#FBBC05" d="M3.88 10.78A5.54 5.54 0 0 1 3.58 9c0-.62.11-1.22.29-1.78L.96 4.96A9.008 9.008 0 0 0 0 9c0 1.45.35 2.82.96 4.04l2.92-2.26z"></path><path fill="#34A853" d="M9 18c2.43 0 4.47-.8 5.96-2.18l-2.84-2.2c-.76.53-1.78.9-3.12.9-2.38 0-4.4-1.57-5.12-3.74L.97 13.04C2.45 15.98 5.48 18 9 18z"></path><path d="M0 0h18v18H0z"></path></g></svg>  
        <i>Google로 시작하기</i>
      </SnsButton>  
    )}
    // ////////// 로컬용 ////////////
    // onSuccess={      
    //   (res) => {           
    //     localStorage.setItem("access_Token", res.wc.access_token);
    //     const token = localStorage.getItem("access_Token")
    //     changeModal(false);
    //     changeLogin(true);
    //     kindLogin("google");
    //     document.documentElement.scrollTop=0;  
    //     console.log("구글토큰값", token);
    //   }            
    // }
    // ////////// 로컬용 ////////////
    ////////// 서버용 ////////////
    onSuccess={      
      (res) => {           
        localStorage.setItem("googleToken", res.wc.access_token); // google 토큰 저장
        const googleToken = localStorage.getItem("googleToken") // google 토큰 가져오기
        fetch(`${API}/account/sociallogin`, {
          method: "POST",
          headers: {
            Authorization: googleToken, // google 토큰 보내기
            "Content-Type": "application/json",
          }
        })
        .then((response) => response.json())
        .then(
          function SucSet(res) {
            localStorage.setItem("access_token", res.access_token); // BackEnd에서 온 토큰 저장
            localStorage.removeItem("googleToken"); // BackEnd 토큰 왔으니 google토큰은 제거
            changeModal(false);
            changeLogin(true);
            kindLogin("google"); // login인 종류를 google로 확인해준다
            document.documentElement.scrollTop=0;
            console.log("토큰교환완료")
          }
        )
      }            
    }
    ////////// 서버용 ////////////
  />
  )
}

export default connect(null, {changeLogin, changeModal, kindLogin})(GoogleLoginGo);

const SnsButton = styled.button`
  outline:0;
  width: 100%;
  height: 54px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  color:rgb(115, 115, 115);
  background-color:rgb(255, 255, 255);
  border-radius: 27px;
  border-width: 1px;
  border-style: solid;
  border-color: rgb(225, 226, 227);
  svg {
    margin-right: 10px;
  }
  i {
    font-size: 16px;
    font-weight: 600;
  }
`; 