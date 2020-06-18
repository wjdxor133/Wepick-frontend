import React from "react";
import styled from "styled-components";

const SupportList = ({ supportList }) => {
  console.log("supportList 이동", supportList);
  return (
    <SupportListIn>
      {supportList &&
        supportList.map((support) => {
          return (
            <li>
              <div className="supportBox">
                <div className="companyBox">
                  <img src={support.img_url} alr=" "></img>
                  <p>{support.company}</p>
                </div>
                <p>{support.name}</p>
                <p>{support.date}</p>
                <p>{support.write}</p>
                <p>{support.referer_amount}</p>
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

    .companyBox {
      display: flex;
      align-items: center;

      img {
        width: 24px;
        height: 24px;
      }
    }

    p {
      font-size: 0.8rem;
    }
  }
`;
export default SupportList;
