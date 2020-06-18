import React from "react";
import styled from "styled-components"
import { withRouter } from "react-router-dom";

const WdList = (props) => {
  return(
    <WdWrap>
      <WdTitle titleOn={props.titleName} onClick={() => props.history.push(`${props.titleUrl}`)}>
        <span>{props.titleName}</span>
        <i>></i>    
      </WdTitle>
      <WdContents>
        {props.list.map((item, inx) => {
          return (        
            <li key={inx} onClick={() => props.history.push(`${item.url}`)}>
              {item.name}
            </li>
          )
        })}
        <Plus plus={props.plus} onClick={() => props.history.push(`${props.plus}`)}>
          <span>더보기</span>
          <i>></i>
        </Plus>
      </WdContents>
    </WdWrap>
  )
}

export default withRouter(WdList);

const WdWrap = styled.div`
  display:flex;
  flex-direction:column;
  float: left;
  width: 20%;
  height: 270px;
  padding: 40px 20px 0 0;
  text-align: left;
`;

const WdTitle = styled.div`
  visibility:${props => props.titleOn?"visible":"hidden"};
  cursor: pointer;
  display:flex;
  justify-content:space-between;
  height:2em;
  width:100%;
  padding-right:20px;  
  span {
    font-size: 17px;
    color: #333;
    line-height: 20px;
    padding-right: 20px;
    padding-bottom: 15px;
  }  
`;

const WdContents = styled.ul`
  li {
    cursor: pointer;
    font-size: 13px;
    color: #999;
    padding: 5px 20px 5px 0;  
  }
`;

const Plus = styled.li`  
  cursor: pointer;
  display:flex;
  justify-content:space-between;  
  display: ${props => props.plus? "":"none"};
`;