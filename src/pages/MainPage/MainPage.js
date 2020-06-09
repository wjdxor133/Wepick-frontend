import React from "react";
import styled from "styled-components";


const MainPage = () => {
  return (
    <div className="MainPage">
      <Button>안녕 오늘은 언제 집에 갈 것 같니? 123456 Wanted</Button>
      <a href="google.com">dfsdfsd</a>
    </div>
  );
}

const Button = styled.button`
  color: ${props => props.theme.color.main};
`;

export default MainPage;