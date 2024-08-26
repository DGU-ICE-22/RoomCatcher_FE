// LoadingChat.js
import React from 'react';
import styled from 'styled-components';
import Spinner from '../assets/images/Spinner.gif';
import 로고 from '../assets/images/로고.png';

let Background = styled.div`
position: absolute;
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  background: #ffffffb7;
  z-index: 999;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

let LoadingImg = styled.h1`
  font-size: 50px;
  position: fixed; // 배경 위에 고정되도록 설정
  top: 5%; // 상단으로부터 5%의 위치에 설정
  width: 100%; // 너비를 화면 전체로 설정
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 2rem; // 텍스트와의 간격 조정
`

let LoadingText = styled.div`
  font:25px 'Noto Sans KR';
  text-align: center;
`

function LoadingChat() {

  return (
  <>
  <LoadingImg><img style={{height: "3rem", marginRight: "1rem"}} src={로고}></img> RoomCatcher</LoadingImg>
  <Background>
    <LoadingText>잠시만 기다려 주세요.<br/><br/>OO님의 유형을 분석 중이예요.</LoadingText>
    <img src={Spinner} alt="로딩중" width="10%" />
  </Background>
  </>
  );
};

export default LoadingChat;