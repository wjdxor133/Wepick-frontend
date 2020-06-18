import React, { useState, useEffect } from "react";
import styled from "styled-components";
import PositionList from "../MainPage/PositionList";

const BookMarkView = () => {
  const [bookMarkList, setbookMarkList] = useState([]);

  useEffect(() => {
    fetch("/data/teak2Data/BookMarkViewMork.json")
      .then((res) => res.json())
      .then((res) => {
        setbookMarkList(res.position);
      });
  }, []);

  console.log("bookMarkList", bookMarkList);
  return (
    <BookMarkViewIn>
      <ul>
        {bookMarkList.length > 0 &&
          bookMarkList.map((myData, idx) => {
            return (
              <PositionList
                key={myData.idx}
                title={myData.title}
                no={myData.job_id}
                company={myData.company}
                region={myData.region}
                country={myData.country}
                compensation={myData.reward_total}
                thumbnail={myData.thumbnail}
                like={myData.like}
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
  }
`;

export default BookMarkView;
