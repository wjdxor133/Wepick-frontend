import React from "react";
import styled from "styled-components";

const Aggressive = (props) => {
    // const [position, setposition] = useState({});
    console.log(props)
    return (
        <AggressiveContentBox>
            <AggressiveImg><img src={props.img} alt="" /></AggressiveImg>
            <div className="paddingBox">
                <AggressiveCI><img src={props.ci} alt="" /></AggressiveCI>
                <AggressiveCIName>{props.title}</AggressiveCIName>
                <p>{props.position}개 포지션</p>
            </div>
        </AggressiveContentBox>
    );
}

const AggressiveContentBox = styled.li`
  width: 200px;
  height: 270px;
  border: 1px solid black;
  border-radius: .2em;
  margin-right: 1em;
  :last-child {
      margin-right: 0em;
  }
  .paddingBox{
    padding: 0 1em;
    }
    p{
        font-size: .75rem;
        color: ${props => props.theme.color.gray}
    }
`;

const AggressiveImg = styled.div`
  width: 100%;
  img{
      width: 100%;
  }
`;

const AggressiveCI = styled.div`
  width: 50px;
  height: 50px;
  border: 1px solid ${props => props.theme.color.gray};
  margin-top: -2em;
  img{
      width: 100%;
  }
`;

const AggressiveCIName = styled.div`
  font-size: 1rem;
  font-weight: 500;
`;


export default Aggressive;