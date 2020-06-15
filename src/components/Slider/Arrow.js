import React from "react";
import styled, { css } from "styled-components";
import { MdKeyboardArrowLeft } from "react-icons/md";
import { MdKeyboardArrowRight } from "react-icons/md";

const Arrow = ({ direction, handleClick }) => (
  <ArrowBtn onClick={handleClick}>
    {direction === "left" ? <MdKeyboardArrowLeft /> : <MdKeyboardArrowRight />}
  </ArrowBtn>
);

const ArrowBtn = styled.div`
  display: flex;
  position: absolute;
  top: 50%;
  ${(props) => (props.direction === "right" ? `right: 25px` : `left: 25px`)};
  height: 50px;
  width: 50px;
  justify-content: center;
  background: white;
  border-radius: 50%;
  cursor: pointer;
  align-items: center;
  transition: transform ease-in 0.1s;
  &:hover {
    transform: scale(1.1);
  }
  img {
    transform: translateX(
      ${(props) => (props.direction === "left" ? "-2px" : "2px")}
    );
    &:focus {
      outline: 0;
    }
  }
`;

export default Arrow;
