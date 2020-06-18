import React, { useState } from "react";
import styled from "styled-components";
import { BsChevronLeft } from "react-icons/bs";
import { BsChevronRight } from "react-icons/bs";
import MainImg from "./MainImg";

const MainSlider = (props) => {
    const [state, setState] = useState({
        activeIndex: 0,
        translate: 0,
        transition: 0.45,
        width: props.mainWidth
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
        console.log(translate);
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

    const mainImg = props.slides && props.slides.map((topImgOne, idx) => {
        return (
            <MainImg
                title={topImgOne.title}
                content={topImgOne.content}
                img={topImgOne.url}
                key={idx}
            />
        );
    })

    return (
        <>
            <Slider>
                <MainBox translate={translate} transition={transition} width={width}  >
                    {mainImg}
                </MainBox>
            </Slider>
            <MainButton>
                <div>
                    <BsChevronLeft direction="left" onClick={prevSlide} />
                </div>
                <div>
                    <BsChevronRight direction="right" onClick={nextSlide} />
                </div>
            </MainButton>
        </>
    );
}

const MainBox = styled.ul`
    width: 505%;
    display: flex;
    transform: translateX( -${props => props.translate}px );
    transition: transform ease-out ${props => props.transition}s;
`;

const Slider = styled.div`
  width: 100%;
  height: 350px;
  overflow: hidden;
  margin-top: 0 auto;
  padding-top: 50px;
`;

const MainButton = styled.div`
position: absolute;
top: 17em;
right: 0px;
z-index: 10;
display: flex;
font-size: 1rem;
margin-right: calc((100vw - 1060px) / 2);
div{
  background-color: white;
  border-radius: 100;
  width: 45px;
  height: 45px;
  text-align: center;
  line-height: 3.3em;
  border-radius: 100%;
}
`;

export default MainSlider;