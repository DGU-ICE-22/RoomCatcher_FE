import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import MyPageBar from './MyPageBar'; // MyPageBar를 상단에 포함

// 스타일 정의
const FormContainer = styled.div`
  max-width: 600px; /* 너비 살짝 줄임 */
  margin: 100px auto;
  padding: 50px; /* 패딩을 더해서 높이를 늘림 */
  background-color: #fff;
  border-radius: 15px;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.1);
  font-family: 'Montserrat', sans-serif;
`;

const FormTitle = styled.h2`
  text-align: center;
  margin-bottom: 40px;
  font-weight: bold;
  font-size: 24px;
  border-bottom: 1px solid #ccc;
  padding-bottom: 10px;
`;

const FormField = styled.div`
  margin-bottom: 30px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Label = styled.label`
  font-size: 18px;
  font-weight: bold;
  margin-right: 20px;
  width: 150px;
`;

const Input = styled.input`
  width: 60%; /* 입력 필드 너비 조정 */
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 8px;
  background-color: #eef2f7;
`;

const RadioGroup = styled.div`
  display: flex;
  justify-content: center; /* 라디오 버튼 가운데 정렬 */
  gap: 30px; /* 남자/여자 간격 */
  width: 60%; /* 라디오 버튼 그룹 너비 */
`;

const RadioButton = styled.label`
  font-size: 18px;
  display: flex;
  align-items: center;
  input {
    margin-right: 10px;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-top: 40px;
`;

const Button = styled.button`
  width: 160px;
  padding: 12px;
  background-color: ${(props) => (props.save ? '#000' : '#fff')};
  color: ${(props) => (props.save ? '#fff' : '#000')};
  font-size: 16px;
  border: 2px solid ${(props) => (props.save ? '#000' : '#ddd')};
  border-radius: 10px;
  cursor: pointer;
  transition: background-color 0.3s, color 0.3s, border-color 0.3s;

  &:hover {
    background-color: ${(props) => (props.save ? '#333' : '#eee')};
    color: ${(props) => (props.save ? '#fff' : '#000')};
  }
`;

const MemberInfoEdit = () => {
  const [formData, setFormData] = useState({
    birthDate: '',
    gender: '',
    address: '',
  });

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get('/api/user'); // API 경로를 실제로 변경하세요
        setFormData(response.data);
      } catch (error) {
        console.error('Error fetching user data', error);
      }
    };

    fetchUserData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put('/api/user', formData); // 회원 정보 업데이트 API 경로
      alert('회원 정보가 성공적으로 수정되었습니다.');
    } catch (error) {
      console.error('Error updating user info', error);
      alert('회원 정보 수정 중 오류가 발생했습니다.');
    }
  };

  return (
    <>
      {/* 상단 MyPageBar 포함 */}
      <MyPageBar />

      <FormContainer>
        <FormTitle>회원 정보 수정</FormTitle>
        <form onSubmit={handleSubmit}>
          <FormField>
            <Label htmlFor="birthDate">생년월일</Label>
            <Input
              type="text"
              id="birthDate"
              name="birthDate"
              placeholder="030108"
              value={formData.birthDate}
              onChange={handleChange}
              required
            />
          </FormField>

          <FormField>
            <Label>성별</Label>
            <RadioGroup>
              <RadioButton>
                <input
                  type="radio"
                  name="gender"
                  value="남자"
                  checked={formData.gender === '남자'}
                  onChange={handleChange}
                />
                남자
              </RadioButton>
              <RadioButton>
                <input
                  type="radio"
                  name="gender"
                  value="여자"
                  checked={formData.gender === '여자'}
                  onChange={handleChange}
                />
                여자
              </RadioButton>
            </RadioGroup>
          </FormField>

          <FormField>
            <Label htmlFor="address">주소</Label>
            <Input
              type="text"
              id="address"
              name="address"
              placeholder="주소지 입력"
              value={formData.address}
              onChange={handleChange}
              required
            />
          </FormField>

          <ButtonContainer>
            <Button type="button">취소</Button>
            <Button type="submit" save>
              저장
            </Button>
          </ButtonContainer>
        </form>
      </FormContainer>
    </>
  );
};

export default MemberInfoEdit;
