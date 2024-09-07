import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import ListingCard from './ListingCard';
import NavigationBar from '../pages/NavigationBar';
import styled from 'styled-components';

const FlexContainer = styled.div`
  display: flex;
  height: 100vh;
`;

const ButtonGroup = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 40px;  // 각 버튼 그룹 사이의 간격을 추가

  &:not(:last-child) {
    border-bottom: 2px dashed #ccc;  // 점선 추가
    padding-bottom: 20px;  // 점선과 버튼 사이의 간격
  }
`;

const SidebarContainer = styled.div`
  width: 20%;
  background-color: #f8f9fa;
  padding: 20px;
  overflow-y: auto;
`;

const ListingsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-top: 20px;
  width: 80%;
  overflow-y: auto;
`;

const FilterButton = styled.button`
  padding: 10px;
  margin: 8px 0px;
  width: 100%;
  background-color: #efefef;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background:#FFBB9A;
  }
`;

const CustomListings = () => {
  const location = useLocation();
  const [originalListings, setOriginalListings] = useState([]);
  const [listings, setListings] = useState([]);
  const [error, setError] = useState(false);
  const [rentalType, setRentalType] = useState('all'); // all, lease, rent, sale
  const [sortType, setSortType] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const accessToken = localStorage.getItem('accessToken');
      if (!accessToken) {
        setError(true);
        return;
      }
      try {
        const response = await axios.get('http://13.125.189.241:8080/api/recommend', {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `${accessToken}`
          }
        });
        if (response.data && response.data.productList) {
          setOriginalListings(response.data.productList);
          setListings(response.data.productList); // Initialize listings with all data
        } else {
          throw new Error('Invalid data');
        }
      } catch (error) {
        console.error('Error fetching listings:', error);
        setError(true);
      }
    };

    fetchData();
  }, [location.state]);

  useEffect(() => {
    filterAndSortListings();
  }, [rentalType, sortType]);

  const filterAndSortListings = () => {
    let filteredListings = originalListings.filter(listing => {
      if (rentalType === 'all') return true;
      if (rentalType === 'lease' && listing.전세가) return true;
      if (rentalType === 'rent' && listing.월세가) return true;
      if (rentalType === 'sale' && listing.매매가) return true;
      return false;
    });

    filteredListings = filteredListings.sort((a, b) => {
      switch (sortType) {
        case 'name':
          return a.매물명.localeCompare(b.매물명);
        case 'price':
          return a.전세가 - b.전세가;
        case 'location':
          return a.매물도로기본주소.localeCompare(b.매물도로기본주소);
        default:
          return 0;
      }
    });

    setListings(filteredListings);
  };

  if (error) {
    return <div>Failed to load listings. Please try again later.</div>;
  }

  return (
    <div>
      <NavigationBar />
      <FlexContainer>
        <SidebarContainer>
        <ButtonGroup>
          <FilterButton onClick={() => setRentalType('all')}>모든 매물</FilterButton>
          <FilterButton onClick={() => setRentalType('lease')}>전세</FilterButton>
          <FilterButton onClick={() => setRentalType('rent')}>월세</FilterButton>
          <FilterButton onClick={() => setRentalType('sale')}>매매</FilterButton>
        </ButtonGroup>
        <ButtonGroup>
          <FilterButton onClick={() => setSortType('name')}>이름순</FilterButton>
          <FilterButton onClick={() => setSortType('price')}>가격대순</FilterButton>
          <FilterButton onClick={() => setSortType('location')}>위치순</FilterButton>
        </ButtonGroup>
        </SidebarContainer>
        <ListingsContainer>
          {listings.map(listing => <ListingCard key={listing.id} listing={listing} />)}
        </ListingsContainer>
      </FlexContainer>
    </div>
  );
};

export default CustomListings;
