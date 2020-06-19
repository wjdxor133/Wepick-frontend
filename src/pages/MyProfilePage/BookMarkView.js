import React, { useState, useEffect } from "react";
import styled from "styled-components";
import PositionList from "../MainPage/PositionList";
import { API } from "../../config";

const BookMarkView = () => {
  const [bookMarkList, setbookMarkList] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    fetch(`${API}/account/mypage/bookmark`, {
      headers: {
        Authorization: token,
      },
    })
      .then((res) => res.json())
      .then((res) => {
        // console.log(res);
        setbookMarkList(res.data);
      });
  }, []);

  // console.log("bookMarkList", bookMarkList);
  return (
    <BookMarkViewIn>
      <ul>
        {bookMarkList.length > 0 &&
          bookMarkList.map((myData, idx) => {
            return (
              <PositionList
                key={myData.idx}
                title={myData.name}
                no={myData.id}
                company={myData.company}
                region={myData.region}
                country={myData.country}
                compensation={myData.reward_amount}
                thumbnail={myData.thumbnail}
                like={myData.likes}
              />
            );
          })}
      </ul>
    </BookMarkViewIn>
  );
};

const BookMarkViewIn = styled.div`
  width: 100%;

  ul {
    width: 100%;
    list-style: none;
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
  }
`;

export default BookMarkView;
