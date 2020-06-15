import React from "react";
import { GoogleLogout } from 'react-google-login';
import { connect } from "react-redux";
import { changeLogin, changeProfile } from "../../store/actions";

const GoogleLoginoutGo = ( { changeLogin, changeProfile } ) => {  
  return (
    <GoogleLogout 
      clientId="95532860446-c8epnqedahgonnetd4ahe925c1gs00f8.apps.googleusercontent.com"
      render={props => (
        <li onClick={props.onClick} disabled={props.disabled} >로그아웃</li>
      )}              
      onLogoutSuccess={
        function logOutEnd() {
          localStorage.removeItem("accessToken");
          changeLogin(false);
          changeProfile(false);
          document.documentElement.scrollTop=0;
          console.log("구글 로그아웃 완료");
        }                      
      }                 
    />
  )
}
                  
export default connect(null, {changeLogin, changeProfile})(GoogleLoginoutGo);