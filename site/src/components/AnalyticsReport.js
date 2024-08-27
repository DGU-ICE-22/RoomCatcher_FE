import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import NavigationBar from '../pages/NavigationBar';
import { useNavigate, useLocation } from 'react-router-dom';

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
  const location = useLocation(); //이전 페이지로부터 넘겨진 상태를 받아온다.
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
        const response = await axios.post('http://127.0.0.1:8080/api/report', {
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
