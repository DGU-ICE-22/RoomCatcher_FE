import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import NavigationBar from '../pages/NavigationBar';
import { useNavigate, useLocation } from 'react-router-dom';

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
    width: 100%;
    height: auto;
    display: block;
  }
`;

const ContentContainer = styled.div`
  flex: 1.5;
  padding: 20px;
  background-color: #FFF;
  border: 1px solid #ddd;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  border-radius: 8px;
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
  border: 1px solid #FA8072;
	background-color: #FA8072;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 20px;
  margin-left: auto;
  display: block;
  font-weight: bold;

  &:active {
    transform: scale(0.95);
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
        const response = await axios.post('http://13.125.189.241/api/report', {
          userTypeName: location.state.reportData.userTypeName,
          userTags: location.state.reportData.user_tags
        }, {
          headers: {
            'Content-Type': 'application/json',
            "Authorization": `Bearer ${accessToken}`
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
            <Button onClick={handleNavigate}>추천 매물 보러가기</Button>
          </Content>
        </ContentContainer>
      </ReportContainer>
    </>
  );
};

export default AnalyticsReport;