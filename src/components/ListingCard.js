import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const Card = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 16px;
  margin: 8px;
  border: 1px solid #ccc;
  border-radius: 8px;
  background-color: white;
  cursor: pointer;
  transition: box-shadow 0.3s;

  &:hover {
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
`;

const Title = styled.h3`
  color: #333;
  margin: 0 0 8px 0;
  font-size: 18px;
`;

const Address = styled.p`
  margin: 0;
  font-size: 14px;
  color: #666;
`;

const Category = styled.span`
  background-color: #eee;
  color: #333;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
  margin-right: 8px;
`;

const Price = styled.p`
  font-size: 16px;
  color: #007BFF;
  font-weight: bold;
  margin: 8px 0;
`;

const Feature = styled.p`
  font-size: 12px;
  color: #666;
  margin: 0;
`;

const ListingCard = ({ listing }) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/listings/${listing.id}`);
  };

  return (
    <Card onClick={handleCardClick}>
      <Title>{listing.매물명}</Title>
      <Address>{listing.매물도로기본주소} {listing.매물도로상세주소}</Address>
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
        <Category>{listing.카테고리1}</Category>
      </div>
      <Price>{listing.전세가 ? `${listing.전세가}만원` : '가격 정보 없음'}</Price>
      <Feature>{listing.특징광고내용}</Feature>
    </Card>
  );
};

export default ListingCard;
