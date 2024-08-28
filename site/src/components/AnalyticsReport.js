import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import NavigationBar from '../pages/NavigationBar';
import { useNavigate, useLocation } from 'react-router-dom';

const ReportContainer = styled.div`
  display: flex; // flexbox 사용
  padding: 20px;
  background-color: #F6F5F2;
  border-radius: 8px;
  margin: 20px;
  box-shadow: 0 4px 8px rgba(0,0,0,0.15); // 그림자를 좀 더 부드럽게 조정
  height: 600px;
  gap: 20px; // 컨테이너 사이의 간격 추가
`;

const ImageContainer = styled.div`
  flex: 1; // 이미지 컨테이너의 너비를 적절히 조정
  padding: 10px;
  border: 1px solid #ddd; // 테두리 추가
  box-shadow: 0 2px 4px rgba(0,0,0,0.1); // 가벼운 그림자 효과
  border-radius: 8px; // 모서리 둥글게
  overflow: hidden; // 이미지가 컨테이너를 넘지 않도록
  img {
    width: 100%;
    height: auto;
    display: block; // 레이아웃 조정
  }
`;

const ContentContainer = styled.div`
  flex: 1.5; // 컨테이너의 너비를 적절히 조정
  padding: 20px;
  background-color: #FFF; // 배경색 변경
  border: 1px solid #ddd; // 테두리 추가
  box-shadow: 0 2px 4px rgba(0,0,0,0.1); // 가벼운 그림자 효과
  border-radius: 8px; // 모서리 둥글게
  display: flex;
  flex-direction: column;
`;

const Header = styled.h1`
  text-align: center;
  color: #333;
  font-size: 24px;
  margin-top: 0; // 상단 마진 제거
`;

const Content = styled.div`
  margin-top: 20px;
  text-align: left;
`;

const Tag = styled.span`
  display: inline-block;
  background-color: #e0e0e0;
  border-radius: 10px;
  padding: 5px 10px;
  margin: 5px;
  font-size: 0.85rem;
  color: #333; // 태그 내 텍스트 색상 조정
`;

const Button = styled.button`
  padding: 10px 20px;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 20px;
  margin-left: auto;
  display: block;
`;



const AnalyticsReport = () => {
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
      try {
        //location.state.reportData에서 받은 userTypeName과 user_tags를 바탕으로 분석 결과를 요청
        const response = await axios.post('http://13.125.189.241/api/report', {
          userTypeName: location.state.reportData.userTypeName,
          userTags: location.state.reportData.user_tags
        }, {
          headers: {
            'Content-Type': 'application/json',
            "Authorization": "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJpYXQiOjE3MjQxNTI1NDUsImV4cCI6MTcyNTM2MjE0NSwidXNlcklkIjoxMH0.xeIJqa4okBd0RZ_B2hgHu7qEQVrYbjs2ex_n3YPaZj2ofqWVfo5pyxgVTj6XjXBWFopwDrml3an_1whjaYZkPQ"
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

  return (
    <>
      <NavigationBar />
      <ReportContainer>
        <ImageContainer>
          <img src="path_to_your_image.jpg" alt="Descriptive Image"/>
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
            <Button onClick={() => alert('추천 매물 보러가기로 이동!')}>추천 매물 보러가기</Button>
          </Content>
        </ContentContainer>
      </ReportContainer>
    </>
  );
};

export default AnalyticsReport;