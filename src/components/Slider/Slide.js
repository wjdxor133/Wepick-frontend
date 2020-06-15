import React from "react";
import styled from "styled-components";

const Slide = ({ content }) => {
  return <Container content={content} />;
};

const Container = styled.div`
      height: 100;
      width: 100%;
      background-image: url("${(props) => props.content}");
      background-size: cover;
      background-repeat: no-repeat;
      background-position: center;
`;

export default Slide;
