import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import ListingCard from './ListingCard';
import NavigationBar from '../pages/NavigationBar';


const CustomListings = () => {
  const location = useLocation();
  const [listings, setListings] = useState([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const accessToken = localStorage.getItem('accessToken');

      if (!accessToken) {
        setError(true);
        return;  // early return if accessToken is not available
      }

      try {
        const response = await axios.get('http://13.125.189.241:8080/api/recommend', {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `${accessToken}`
          }
        });

        console.log('Response:', response);

        if (response.data && response.data.productList) {
          setListings(response.data.productList);
        } else {
          throw new Error('Invalid data');
        }
      } catch (error) {
        console.error('Error fetching listings:', error);
        setError(true);
      }
    };

    if (location.state?.data) {
      fetchData();
    } else {
      setError(true);
    }
  }, [location.state]);

  if (error) {
    return <div>Failed to load listings. Please try again later.</div>;
  }

  return (
    <div>
      <NavigationBar></NavigationBar>
      {listings.map(listing => <ListingCard key={listing.id} listing={listing} />)}
    </div>
  );
};

export default CustomListings;
