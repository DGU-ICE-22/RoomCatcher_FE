import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const Button = styled.button`
  padding: 10px 20px;
  color: white;
  background-color: #007bff;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;

const ReturnToHome = () => {
  const navigate = useNavigate();

  const goToHome = () => {
    navigate('/home'); // "/home" 경로로 이동하도록 설정
  };

  return (
    <div>
      <h2>메인 홈으로 돌아가기</h2>
      <Button onClick={goToHome}>홈으로 이동</Button>
    </div>
  );
};

export default ReturnToHome;
