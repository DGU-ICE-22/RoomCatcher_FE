// Loading.js
import React from 'react';
import styled from 'styled-components';
import LoadingIcon from '../assets/icons/LoadingIcon.gif';
import 로고 from '../assets/images/로고.png';



let Background = styled.div`
position: absolute;
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  background: linear-gradient(to right, #eaf4f4, #f7ede2);
  z-index: 10;
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
  z-index: 11;
`

let LoadingText = styled.div`
  font: 25px 'Noto Sans KR';
  text-align: center;`

function Loading() {

  return (
    <>
    <LoadingImg><img style={{height: "3rem", marginRight: "1rem"}} src={로고}></img> RoomCatcher</LoadingImg>
    <Background>
      <img src={LoadingIcon} alt="로딩중" width="10%" />
      <LoadingText>잠시만 기다려 주세요.<br/><br/>OO님의 유형을 분석 중이예요.</LoadingText>
  
    </Background>
  
    </>
  );
};

export default Loading;