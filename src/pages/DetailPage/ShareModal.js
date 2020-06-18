import React, { useState } from "react";
import styled from "styled-components";
import ScrollLock from "../../Modal/ScrollLock";
import { FaFacebook, FaFacebookMessenger } from "react-icons/fa";
import { GoCheck } from "react-icons/go";
import { IoIosClose } from "react-icons/io";

const ShareModal = ({ setShowModal }) => {
  const [copyIcon, setCopyIcon] = useState(false);
  const onChangeIcon = () => {
    setCopyIcon(true);
  };

  const CloseModal = () => {
    setShowModal(false);
  };

  // 모달창 띄우면 스크롤 없애는 함수
  ScrollLock();

  return (
    <ShareModalIn>
      <ModalBox>
        <div className="ModalBoxHeader">
          <h4 className="ModalTitle">공유하기</h4>
          <div className="closeIcon">
            <IoIosClose size="35" color="#999" onClick={CloseModal} />
          </div>
        </div>
        <p className="ModalText">
          이 포지션과 어울리는 사람을 알고 있다면, 공유해주세요!
        </p>
        <p className="ModalText">
          공유 후 추천까지 완료하면,
          <b> 지원자 최종합격시 보상금을 지급해드립니다.</b>
        </p>
        <div className="BtnIconBox">
          <div className="BtnIcon1">
            <FaFacebook size="15" />
            <span className="iconName">페이스북</span>
          </div>
          <div className="BtnIcon2">
            <FaFacebookMessenger size="15" />
            <span className="iconName">메신저</span>
          </div>
        </div>
        <div className="LinkBox">
          <p className="LinkBoxText">또는 링크 공유</p>
          <div className="LinkInputBox">
            <p className="LinkInput">http://wntd.co/cAPU73</p>
            <div className="LinkInputIcon">
              <span onClick={onChangeIcon}>
                {copyIcon ? <GoCheck size="28" /> : "복사"}
              </span>
            </div>
          </div>
          <p className="copyText">{copyIcon ? `복사하였습니다.` : null}</p>
        </div>
      </ModalBox>
    </ShareModalIn>
  );
};

const ShareModalIn = styled.div`
  height: 100%;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.6);
  position: fixed;
  left: 0;
  top: 0;
  z-index: 999;
`;

const ModalBox = styled.div`
  position: fixed;
  background-color: white;
  padding: 0.3em 0.4em;
  border-radius: 5px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  .ModalBoxHeader {
    display: flex;
    align-items: center;

    .ModalTitle {
      width: 58%;
      font-weight: 700;
      text-align: right;
      font-size: 0.9rem;
      padding: 0.5em 0;
    }
    .closeIcon {
      width: 42%;
      text-align: right;

      &:hover {
        cursor: pointer;
      }
    }
  }
  .ModalText {
    font-size: 0.8rem;
    text-align: center;
    color: #b5b5b5;
    padding: 0.2em;

    b {
      font-weight: 700;
    }
  }
  .BtnIconBox {
    width: 100%;
    display: flex;
    justify-content: space-around;
    border-top: 1px solid #e1e2e3;
    padding: 1em 0;
    margin: 2em 0 1em;

    .BtnIcon1 {
      width: 45%;
      color: white;
      background-color: #1778f2;
      text-align: center;
      padding: 0.3em 2em;
      border-radius: 3px;
      font-weight: 700;
      line-height: 2rem;

      .iconName {
        margin-left: 0.5em;
      }
    }

    .BtnIcon2 {
      width: 45%;
      color: white;
      background-color: #258bf7;
      text-align: center;
      padding: 0.3em 2em;
      border-radius: 3px;
      font-weight: 700;
      line-height: 2rem;

      .iconName {
        margin-left: 0.5em;
      }
    }
  }
  .LinkBox {
    padding: 0.3em 1em;
    .LinkBoxText {
      font-size: 0.8rem;
      font-weight: 500;
      color: #757575;
      margin-bottom: 0.4em;
    }
    .LinkInputBox {
      width: 100%;
      display: flex;
      justify-content: space-between;
      .LinkInput {
        width: 80%;
        border: 1px solid #e1e2e3;
        border-right-style: none;
        padding: 1em;
        display: flex;
        font-size: 0.9rem;
        font-weight: 500;
      }

      .LinkInputIcon {
        width: 20%;
        border: 1px solid #e1e2e3;
        font-weight: 700;
        display: flex;
        justify-content: center;
        align-items: center;
        color: #999;

        &:hover {
          cursor: pointer;
          color: #757575;
        }
      }
    }
    .copyText {
      font-size: 0.8rem;
      margin-top: 1em;
      font-weight: 500;
      color: ${(props) => props.theme.color.main};
    }
  }
`;

export default ShareModal;
