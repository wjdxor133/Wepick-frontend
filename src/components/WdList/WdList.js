import React, { useState, useEffect } from "react";
import styled, {css} from "styled-components"
import { Link, withRouter } from "react-router-dom";

function WdList(props) {
  return(
    <WdWrap>
      <WdTitle titleOn={props.titleName}>
        <Link to={props.titleUrl}>
          {props.titleName}<I titleOn={props.titleName}>></I>
        </Link>
      </WdTitle>
      <WdContents>
        {props.list.map((item, inx) => {
          return (        
            <li key={inx}><Link to={item.url}>{item.name}</Link></li>
          )
        })}
        <Plus plus={props.plus}><Link to={props.plus}><span>더보기</span><i>></i></Link></Plus>
      </WdContents>
    </WdWrap>
  )
}

export default WdList;

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
  height:2em;
  a {
    display:flex;
    justify-content:space-between;
    font-size: 17px;
    color: #333;
    line-height: 20px;
    vertical-align: top;
    padding-right: 20px;
    padding-bottom: 15px;
    width: 100%;
    text-overflow: ellipsis;
    white-space: nowrap;  
  }
`;

const I = styled.i`
  display: ${props => props.titleOn? "":"none"};
`;

const Plus = styled.li`
  display: ${props => props.plus? "":"none"};
  a {
    display:flex;
    justify-content:space-between;
  }
`;

const WdContents = styled.ul`
  li {
    font-size: 13px;
    color: #999;
    padding: 5px 20px 5px 0;  
  }
`;