import React from "react";
import styled from "styled-components";

const PositionList = (props) => {
    // const [position, setposition] = useState({});
    // console.log(props)
    return (
        <PositionBoxList >
            <PositionImg><img src={props.img} alt="" /></PositionImg>
            <PositionListTitle> {props.title} </PositionListTitle>
            <p> {props.name} </p>
            <p> {props.area} </p>
            <Compensation>채용보상금 {props.compensation}원</Compensation>
        </PositionBoxList>
    );
}

const PositionBoxList = styled.li`
    margin-right: 1rem;
    :last-child{
        margin-right: 0rem
    }
    p{
        font-size: .75rem;
        color: ${props => props.theme.color.gray}
    }
`;

const PositionImg = styled.div`
  width: 100%; 
  img{
      width: 100%;
      border-radius: .3em;
  }
`;

const PositionListTitle = styled.div`
  
`;

/* const PostionListText = styled.div`

`; */

const Compensation = styled.div`
  color: #666666;
  font-size: .75rem;
`;


export default PositionList;