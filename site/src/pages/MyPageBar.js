import React, { useEffect } from 'react';
import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import 로고 from '../assets/images/로고.png'; // 로고 이미지 경로를 확인하세요.
import styled from 'styled-components';

// NavigationBar와 동일한 스타일 적용
const StyledMyPageBar = styled(Navbar)`
  font-family: 'Montserrat', sans-serif;
  background-color: rgba(246, 245, 242, 0.95);
  padding: 10px 0;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);

  .navbar-brand, .nav-link {
    font-size: 18px;
    margin-right: 20px;
    color: #333;
    transition: color 0.3s;

    &:hover {
      color: #0056b3;
    }
  }

  .navbar-toggle {
    border-color: #ddd;
  }

  .navbar-collapse {
    justify-content: flex-end;
  }

  .ms-auto {
    margin-left: auto;
  }

  .dropdown-toggle {
    margin-right: 20px;
  }

  .nav-dropdown {
    .nav-link {
      padding: 8px 12px;
      &:hover {
        background-color: #f8f9fa;
      }
    }
  }
`;

const MyPageBar = () => {

  useEffect(() => {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css';
    document.head.appendChild(link);

    return () => {
      document.head.removeChild(link);
    };
  }, []);

  return (
    <StyledMyPageBar expand="lg">
        <Container>
          <Navbar.Brand href="/home" style={{ display: 'flex', alignItems: 'center' }}>
            <img src={로고} alt="RoomCatcher Logo" style={{ height: '30px', width: '22px', marginRight: '5px' }} />
            RoomCatcher
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="/home">메인 홈으로 돌아가기</Nav.Link>
              <Nav.Link href="/edit-info">회원 정보 수정</Nav.Link>
              <Nav.Link href="#subscription-info">내 선호 정보 추가/삭제</Nav.Link>
              <Nav.Link href="/mypage">회원탈퇴</Nav.Link>
              <Nav className="ms-auto">
                <NavDropdown title="더보기" id="basic-nav-dropdown" alignRight>
                  <NavDropdown.Item href="#favorites">찜한 매물</NavDropdown.Item>
                  <NavDropdown.Item href="#recommended-properties">추천 매물</NavDropdown.Item>
                  <NavDropdown.Item href="#help">도움말</NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href="/login">로그아웃</NavDropdown.Item>
                </NavDropdown>
              </Nav>
            </Nav>
          </Navbar.Collapse>
        </Container>
    </StyledMyPageBar>
  );
};

export default MyPageBar;
