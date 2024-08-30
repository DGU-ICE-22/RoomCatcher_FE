import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';
import NavigationBar from '../pages/NavigationBar';

const DetailContainer = styled.div`
  padding: 20px;
  max-width: 1000px;
  margin: auto;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
  overflow: auto;
`;

const Header = styled.h1`
  font-size: 24px;
  color: #333;
`;

const SubHeader = styled.h2`
  font-size: 20px;
  color: #666;
  margin-bottom: 10px;
`;

const Section = styled.section`
  margin-top: 20px;
`;

const InfoRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 10px 0;
  border-bottom: 1px solid #eee;
  padding-bottom: 10px;
`;

const Label = styled.span`
  font-weight: 600;
  color: #333;
`;

const Value = styled.span`
  color: #555;
`;

const DetailPage = () => {
  const { id } = useParams();
  const [listingDetail, setListingDetail] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const accessToken = localStorage.getItem('accessToken');
      if (!accessToken) {
        setError('Authentication failed. No access token.');
        return;
      }
      setLoading(true);
      try {
        const response = await axios.get(`http://13.125.189.241:8080/api/recommend`, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `${accessToken}`
          }
        });
        if (response.data && response.data.productList && response.data.productList.length > 0) {
          // Assuming the first item in productList is the one we want
          setListingDetail(response.data.productList.find(item => item.id.toString() === id));
        } else {
          throw new Error('Invalid data');
        }
      } catch (error) {
        console.error('Error fetching listing details:', error);
        setError('Failed to load the data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  if (!listingDetail) return <p>No listing data available.</p>;

  return (
    <>
      <NavigationBar />
      <DetailContainer>
        <Header>{listingDetail?.매물명}</Header>
        <SubHeader>{listingDetail?.매물도로기본주소} {listingDetail?.매물도로상세주소}</SubHeader>
        <Section>
          {Object.entries(listingDetail).map(([key, value]) => (
            <InfoRow key={key}>
              <Label>{key.replace(/([A-Z])/g, ' $1').trim()}:</Label>
              <Value>{value || 'N/A'}</Value>
            </InfoRow>
          ))}
        </Section>
      </DetailContainer>
    </>
  );
};

export default DetailPage;
