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

const AnalyticsReport = () => {
  const [data, setData] = useState({
    userTypeName: "",
    userTypeExplain: "",
    user_tags: []
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://your-api-url/report'); // API URL을 수정하세요.
        setData(response.data);
      } catch (error) {
        console.error('Error fetching data: ', error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
    <NavigationBar>
    <ReportContainer>
      <Header>{data.userTypeName}</Header>
      <Content>
        <p>{data.userTypeExplain}</p>
        <div>
          {data.user_tags.map((tag, index) => (
            <Tag key={index}>{tag}</Tag>
          ))}
        </div>
      </Content>
    </ReportContainer>
    </NavigationBar>
    </>
  );
};

export default AnalyticsReport;
