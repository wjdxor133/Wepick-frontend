import React, { useState } from "react";
import styled from "styled-components";
import Slide from "./Slide";
import Arrow from "./Arrow";

const Slider = (props) => {
  // console.log(props);

  const [state, setState] = useState({
    activeIndex: 0,
    translate: 0,
    transition: 0.45,
    width: props.width,
  });

  const { translate, transition, activeIndex, width } = state;

  const nextSlide = () => {
    if (activeIndex === (props.slides && props.slides.length - 1)) {
      return setState({
        ...state,
        translate: 0,
        activeIndex: 0,
      });
    }

    setState({
      ...state,
      activeIndex: activeIndex + 1,
      translate: (activeIndex + 1) * width,
    });
  };

  const prevSlide = () => {
    if (activeIndex === 0) {
      return setState({
        ...state,
        translate: (props.slides && props.slides.length - 1) * width,
        activeIndex: props.slides && props.slides.length - 1,
      });
    }

    setState({
      ...state,
      activeIndex: activeIndex - 1,
      translate: (activeIndex - 1) * width,
    });
  };

  return (
    <SliderCSS>
      <SliderContent
        translate={translate}
        transition={transition}
        width={width * (props.slides && props.slides.length)}
      >
        {props.slides &&
          props.slides.map((slide, i) => (
            <Slide key={slide + i} content={slide.url} />
          ))}
      </SliderContent>

      <Arrow direction="left" handleClick={prevSlide} />
      <Arrow direction="right" handleClick={nextSlide} />
    </SliderCSS>
  );
};

const SliderCSS = styled.div`
  position: relative;
  width: 100%;
  height: 480px;
  overflow: hidden;
  border-radius: .3em;
`;

const SliderContent = styled.div`
  transform: translateX(-${(props) => props.translate}px);
  transition: transform ease-out ${(props) => props.transition}s;
  height: 100%;
  width: ${(props) => props.width}px;
  display: flex;
`;

export default Slider;
