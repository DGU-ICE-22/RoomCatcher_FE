import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import NavigationBar from '../pages/NavigationBar';
import { useNavigate, useLocation } from 'react-router-dom';
import compony from '../assets/icons/compony.gif';
import culture from '../assets/icons/culture.gif';
import nature from '../assets/icons/nature.gif';
import option from '../assets/icons/options.gif';
import free from '../assets/icons/free.gif';
import structure from '../assets/icons/structure.gif';
import traffic from '../assets/icons/traffic.gif';
import student from '../assets/icons/student.gif';


const ReportContainer = styled.div`
  font-family: 'Roboto', sans-serif;
  display: flex;
  flex-wrap: wrap; // 필요에 따라 요소들을 다음 줄로 넘기기
  padding: 20px;
  background-color: #F6F5F2;
  border-radius: 8px;
  margin: 20px;
  box-shadow: 0 4px 8px rgba(0,0,0,0.15);
  min-height: 600px; // 최소 높이 설정
  gap: 30px; // 간격 늘리기
`;

const ImageContainer = styled.div`
  flex: 1; // 이미지 컨테이너의 너비 조정
  padding: 10px;
  border: 1px solid #ddd;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  border-radius: 8px;
  overflow: hidden;
  img {
    width: 70%;
    height: auto;
    display: block;
    margin: 0 auto; // 이미지를 컨테이너 내에서 중앙에 위치시킵니다
  }
`;

const ContentContainer = styled.div`
  flex: 1.5;
  padding: 30px; /* 패딩을 늘림 */
  background-color: #FFF;
  border: none; /* 테두리 제거 */
  box-shadow: 0 8px 16px rgba(0,0,0,0.05); /* 그림자 부드럽게 */
  border-radius: 16px; /* 둥근 모서리를 더 크게 */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
`;


const Header = styled.h1`
  position: absolute;
  top: 30px; //상단에서부터 20px 아래에 위치
  left: 50%;
  transform: translateX(-50%);
  text-align: center;
  color: #333;
  font-size: 30px;
  margin-top: 0; // 상단 마진 제거
  margin-bottom: 30px; // 사이의 간격을 조정하는 데 사용될 수 있음
  font-weight: 700;
`;

const Content = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  text-align: left;
  padding: 20px;
  width: 100%;
  max-width: 700px;
  font-size: 20px;
  line-height: 1.9;
  margin-top: 70px; // 마진을 고려하여 조정한 값
`;


const Tag = styled.span`
  display: inline-block;
  background-color: #e0e0e0;
  border-radius: 10px;
  padding: 5px 10px;
  margin: 4px;
  font-size: 0.85rem;
  color: #333; // 태그 내 텍스트 색상 조정
`;

const Button = styled.button`
  padding: 10px 20px;
  color: white;
  border: none;
  background-color: #FA8072;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 20px;
  margin-left: auto;
  display: block;
  font-weight: bold;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); // 그림자 추가
  transition: background-color 0.3s, transform 0.3s, box-shadow 0.3s; // 전환 효과 추가

  &:hover {
    background-color: #E06C5D; // 마우스 오버 시 진한 색상
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.3); // 그림자를 더 크게
  }

  &:active {
    transform: scale(0.95); // 클릭 시 축소 효과
  }
`;


const AnalyticsReport = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [data, setData] = useState({
    userTypeName: "",
    userTypeExplain: "",
    user_tags: []
  });

  useEffect(() => {
    console.log("Received state:", location.state);

    //fetchData 함수
    const fetchData = async () => {
      const accessToken = localStorage.getItem('accessToken');

      try {
        //location.state.reportData에서 받은 userTypeName과 user_tags를 바탕으로 분석 결과를 요청
        const response = await axios.post('http://13.125.189.241:8080/api/report', {
          tags: location.state.reportData.user_tags,
          typeName: location.state.reportData.userTypeName,
        }, 
        { 
          headers: {
            "Content-Type": "application/json",
            "Authorization": `${accessToken}`
          }
        });
        if (response) {
          console.log("Data fetched");
        }
        else {
          console.log("Data not fetched");
        }
      }catch (error) {
        console.error(error);
      }
      
  };

    // location.state에 reportData가 존재하면, 해당 데이터를 사용하여 컴포넌트의 상태(data)를 업데이트
    if (location.state?.reportData) {
      setData({
        userTypeName: location.state.reportData.userTypeName,
        userTypeExplain: location.state.reportData.userTypeExplain,
        user_tags: location.state.reportData.user_tags
      });
    }
    else{
      console.log("No data passed");
    }

    fetchData();
    
  }, []);

  const handleNavigate = () => {
    navigate('/listings', { state: { data } });
  };

  const getImageSrc = (userTypeName) => {
    
    switch (userTypeName) {
      case '가격 중시 가성비형':
        return free;
      case '교통편이나 회사 근처를 선호하는 교통 중시형':
        return traffic;
      case '집의 구조, 크기, 방향 등을 중요시하는 구조중시형':
        return structure;
      case '대학 주변을 원하는 대학생 유형':
        return student;
      case '감성있는 동네(성수, 망원, 해방촌, 홍대 등)를 선호하는 유형':
        return culture;
      case '세탁기, 에어컨, 옷장 등의 옵션을 선호하는 옵션 중시형':
        return option;
      case '공원, 강, 하천, 산 주변에 있기를 원하는 자연인 유형':
        return nature;
      case '사당, 여의도, 시청, 용산, 강남, 분당, 판교 등 회사가 많은 지역을 선호하는 직장인 유형':
        return compony; 
    }
  };

  return (
    <>
      <NavigationBar />
      <ReportContainer>
        <ImageContainer>
          <img src={getImageSrc(data.userTypeName)} alt="Descriptive Image"/>
        </ImageContainer>
        <ContentContainer>
          <Header>{data.userTypeName}</Header>
          <Content>
            <p>{data.userTypeExplain}</p>
            <div>
              {data.user_tags.map((tag, index) => (
                <Tag key={index}>{tag}</Tag>
              ))}
            </div>
            <Button onClick={handleNavigate}>추천 매물 보러가기</Button>
          </Content>
        </ContentContainer>
      </ReportContainer>
    </>
  );
};

export default AnalyticsReport;