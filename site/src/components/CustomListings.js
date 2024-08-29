import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

const CustomListings = () => {
  const location = useLocation();
  const [listings, setListings] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://13.125.189.241/api/recommend', {
          headers: {
            'Content-Type': 'application/json',
            'AccessToken': 'asjldfkqfpodlfadkfp[qjkljkldjopkeq3klndfkl'
          },
          params: {
            userTags: location.state.data.user_tags
          }
        });
        setListings(response.data.productInfo);
      } catch (error) {
        console.error('Error fetching listings:', error);
      }
    };

    if (location.state?.data) {
      fetchData();
    }
  }, [location.state]);

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
