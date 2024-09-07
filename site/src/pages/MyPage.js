import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import 프로필이미지 from '../assets/images/unnamed.png'; // 프로필 이미지 경로 확인 필요
import MyPageBar from './MyPageBar'; // MyPageBar를 가져옵니다.

// 프로필 섹션 스타일 정의
const ProfileContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 100px; /* 네비게이션 바 아래에 위치 */
  margin-bottom: 50px; /* 아래 섹션과 구분되는 여백 */
`;

const ProfileImage = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  object-fit: cover; /* 이미지를 박스에 맞추어 조절 */
  margin-bottom: 10px;
`;

const ProfileName = styled.h2`
  font-size: 24px;
  font-weight: bold;
  margin: 10px 0 20px 0;
`;

const ProfileSection = styled.div`
  display: flex;
  justify-content: space-around;
  width: 100%;
  margin-bottom: 40px; /* 프로필 섹션과 나머지 섹션 사이의 간격 확대 */
`;

const Title = styled.h3`
  margin-bottom: 10px;
  text-align: center;
  font-size: 18px;
  font-weight: bold;
`;

const InfoBoxContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 20%; /* 박스와 제목을 포함한 컨테이너 너비 조정 */
  margin: 0 10px; /* 각 박스 사이의 간격 설정 */
`;

const InfoBox = styled.div`
  background-color: #EAEFFE;
  padding: 20px;
  border-radius: 10px;
  width: 100%; /* InfoBox를 컨테이너 너비에 맞춤 */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center; /* 텍스트를 박스 중앙에 정렬 */
  box-shadow: 0 0px 10px rgba(71, 71, 71, 0.2);
  box-sizing: border-box; /* 패딩과 보더를 너비에 포함 */
  min-height: 300px; /* 최소 높이를 설정하여 박스가 무너지지 않도록 */
`;

const InfoItem = styled.div`
  margin: 10px 0;
  font-size: 18px;
  font-weight: 500;
  text-align: center; /* 텍스트를 가운데 정렬 */
`;

const TagList = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

const Tag = styled.span`
  background-color: #eef;
  color: #333;
  padding: 5px 10px;
  margin: 5px;
  border-radius: 20px;
  font-size: 14px;
`;

const Button = styled.button`
  margin-top: 20px;
  padding: 10px 20px;
  background-color: #ddd;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #ccc;
  }
`;

// MyPage 컴포넌트
function MyPage() {
  const [userInfo, setUserInfo] = useState(null);
  const [preferences, setPreferences] = useState([]);
  const [favoriteListings, setFavoriteListings] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const accessToken = localStorage.getItem('accessToken');

      try {
        const userResponse = await axios.get('/api/user', {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        const preferencesResponse = await axios.get('/api/user/preferences', {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        const favoritesResponse = await axios.get('/api/user/favorites', {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        setUserInfo(userResponse.data);
        setPreferences(preferencesResponse.data);
        setFavoriteListings(favoritesResponse.data);
      } catch (error) {
        console.error('Error fetching data', error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      {/* 상단 Nav바 */}
      <MyPageBar />

      {/* 프로필 구역 */}
      <ProfileContainer>
        <ProfileImage src={프로필이미지} alt="Profile Image" /> {/* 프로필 이미지 적용 */}
        <ProfileName>{userInfo?.name || '사용자 이름'}</ProfileName> {/* 동적으로 사용자 이름 표시 */}
      </ProfileContainer>

      {/* 나머지 정보 구역 */}
      <ProfileSection>
        <InfoBoxContainer>
          <Title>내 정보</Title>
          <InfoBox>
            {userInfo && (
              <>
                <InfoItem>생년월일: {userInfo.birthDate}</InfoItem>
                <InfoItem>성별: {userInfo.gender}</InfoItem>
                <InfoItem>거주지: {userInfo.address}</InfoItem>
              </>
            )}
          </InfoBox>
        </InfoBoxContainer>

        <InfoBoxContainer>
          <Title>내 선호 정보</Title>
          <InfoBox>
            <TagList>
              {preferences.length > 0 ? (
                preferences.map((preference, index) => (
                  <Tag key={index}>#{preference}</Tag>
                ))
              ) : (
                <InfoItem>선호 정보를 추가해 주세요.</InfoItem>
              )}
            </TagList>
          </InfoBox>
        </InfoBoxContainer>

        <InfoBoxContainer>
          <Title>찜한 매물 리스트</Title>
          <InfoBox>
            {favoriteListings.length > 0 ? (
              favoriteListings.map((listing, index) => (
                <InfoItem key={index}>{listing.name}</InfoItem>
              ))
            ) : (
              <InfoItem>찜한 매물이 없습니다.</InfoItem>
            )}
            <Button>더보기</Button>
          </InfoBox>
        </InfoBoxContainer>
      </ProfileSection>
    </>
  );
}

export default MyPage;
