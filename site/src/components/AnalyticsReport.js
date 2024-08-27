import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import NavigationBar from '../pages/NavigationBar';

const ReportContainer = styled.div`
  padding: 20px;
  background-color: #f4f4f4;
  border-radius: 8px;
  margin: 20px;
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
`;

const Header = styled.h1`
  text-align: center;
  color: #333;
`;

const Content = styled.div`
  margin-top: 20px;
`;

const Tag = styled.span`
  display: inline-block;
  background-color: #e0e0e0;
  border-radius: 10px;
  padding: 5px 10px;
  margin-right: 5px;
  margin-bottom: 5px;
  font-size: 0.85rem;
`;

const Button = styled.button`
  padding: 10px 20px;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 20px;
`;

const AnalyticsReport = () => {
  const [data, setData] = useState({ // 서버에서 받는 data를 관리하도록 설정
    userTypeName: "",
    userTypeExplain: "",
    user_tags: []
  });

  useEffect(() => {
    const fetchData = async () => {
      const headers = {
        'Content-Type': 'application/json',
        'AccessToken': 'ldsjflasjfopqjklnkladjgj' // API 요청 헤더
      };

      try {
        // 여기 주소 잘못됐으면 수정하셈, 요청 헤더에 Content-Type과 AccessToken이 포함.
        const response = await axios.get('http://127.0.0.1:8000/api/report/?content', { headers });
        setData(response.data);
      } catch (error) {
        console.error('Error fetching data: ', error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <NavigationBar />
      <ReportContainer>
        <Header>{data.userTypeName}</Header>
        <Content>
          <p>{data.userTypeExplain}</p>
          <div>
            {data.user_tags.map((tag, index) => ( //user_tags 배열을 순회하면서 Tap 컴포넌트로 랜더링
              <Tag key={index}>{tag}</Tag>
            ))}
          </div>
          <Button onClick={() => alert('자세한 매물 보기로 이동!')}>자세한 매물 보기</Button> 
        </Content>
      </ReportContainer>
    </>
  );
};

export default AnalyticsReport;
