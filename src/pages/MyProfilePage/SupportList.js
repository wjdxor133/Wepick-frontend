import React from "react";
import styled from "styled-components";

const SupportList = ({ supportList }) => {
  return (
    <SupportListIn>
      {supportList.applies &&
        supportList.applies.map((support) => {
          return (
            <li>
              <div className="supportBox">
                <ComPanyBox left>
                  <img src={support.logo_url} alr="logo이미지"></img>
                  <p>{support.company}</p>
                </ComPanyBox>
                <ComPanyBox>
                  <p>{support.name}</p>
                </ComPanyBox>
                <ComPanyBox>
                  <p>{support.created_at.slice(0, 10)}</p>
                </ComPanyBox>
                <ComPanyBox>
                  <p>{support.status}</p>
                </ComPanyBox>
                <ComPanyBox>
                  <p>{support.reward_amount.slice(0, 3) + ",000"}</p>
                </ComPanyBox>
              </div>
            </li>
          );
        })}
    </SupportListIn>
  );
};

const SupportListIn = styled.ul`
  border-top: 1px solid #86939e;
  background-color: white;
  margin: 1em 0;

  .supportBox {
    display: flex;
    padding: 0.8em 0.5em;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid #e1e2e3;
    div{
      width: calc(100%/5);
      overflow: hidden;
    }
    .companyBox {
      display: flex;
      align-items: center;
      img {
        width: 24px;
        height: 24px;
        margin-right: 0.5em;
      }
    p {
      font-size: 0.8rem;
    }
  }
`;

const ComPanyBox = styled.div`
  width: calc(100% / 5);
  overflow: hidden;
  display: flex;
  justify-content: ${(props) => (props.left ? "flex-start" : "center")};
  img {
    width: 24px;
    height: 24px;
    margin-right: 0.5em;
  }
  p {
    font-size: 0.8rem;
  }
`;

export default SupportList;
