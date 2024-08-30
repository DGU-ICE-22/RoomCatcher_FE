import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

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
        const response = await axios.get('http://13.125.189.241/api/recommend', {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`
          },
          params: {
            userTags: location.state?.data?.user_tags
          }
        });

        if (response.data && response.data.productInfo) {
          setListings(response.data.productInfo);
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
      {listings.map((listing, index) => (
        <div key={index}>
          <h3>{listing.Name}</h3>
          <p>{listing.Price}원</p>
          <p>{listing.location}</p>
        </div>
      ))}
    </div>
  );
};

export default CustomListings;
