import React, {useEffect} from 'react';
import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import 로고 from '../assets/images/로고.png'; // 로고 이미지 경로를 확인하세요.
import styled from 'styled-components';

const StyledNavigationBar = styled(Navbar)`

  font-family: 'Montserrat', sans-serif; // 기본 폰트로 설정
  background-color: #F6F5F2;
  padding: 10px 0; // 상하 패딩 증가

  .navbar-brand, .nav-link {
    font-size: 25px; // 폰트 크기 증가
    margin-right: 40px; // 각 링크의 우측 마진 증가
  }

  .navbar-toggle {
    border-color: #ddd;
  }

  .navbar-collapse {
    justify-content: flex-end; // 모든 내용을 오른쪽으로 밀어내기
  }

  .ms-auto {
    margin-left: auto; // 오른쪽 정렬을 강제함
  }

  .dropdown-toggle {
    margin-right: 20px; // 드롭다운 토글의 우측 마진 증가
  }

  .nav-dropdown {
    .nav-link {
      padding: 8px 12px; // 드롭다운 내 아이템의 패딩 조정
    }
  }
`;

const NavigationBar = () => {

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
    <StyledNavigationBar expand="lg">
        <Container>
          <Navbar.Brand href="/">
            <img src={로고} alt="RoomCatcher Logo" style={{ height: '30px', width: '22px', marginRight: '5px' }} />
            RoomCatcher
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="#intro">소개</Nav.Link>
              <Nav.Link href="#type-description">유형 설명</Nav.Link>
              <Nav.Link href="#subscription-info">청약 정보 글</Nav.Link>
              <Nav.Link href="mypage">마이페이지</Nav.Link>
              <Nav className="ms-auto">
                <NavDropdown title="더보기" id="basic-nav-dropdown" alignRight>
                  <NavDropdown.Item href="#favorites">찜한 매물</NavDropdown.Item>
                  <NavDropdown.Item href="#recommended-properties">
                    추천 매물
                  </NavDropdown.Item>
                  <NavDropdown.Item href="#help">도움말</NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href="login">
                    로그아웃
                  </NavDropdown.Item>
                </NavDropdown>
              </Nav>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </StyledNavigationBar>
  );
};

export default NavigationBar;
