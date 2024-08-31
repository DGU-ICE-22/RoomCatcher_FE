import React, {useEffect} from 'react';
import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import 로고 from '../assets/images/로고.png'; // 로고 이미지 경로를 확인하세요.
import styled from 'styled-components';

const StyledNavigationBar = styled(Navbar)`
  font-family: 'Montserrat', sans-serif;
  background-color: rgba(246, 245, 242, 0.95); // 배경색에 약간의 투명도 추가
  padding: 10px 0;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1); // 그림자 추가

  .navbar-brand, .nav-link {
    font-size: 18px; // 폰트 크기 조정
    margin-right: 20px; // 우측 마진 조정
    color: #333; // 색상 설정
    transition: color 0.3s; // 색상 변화에 애니메이션 효과 추가

    &:hover {
      color: #0056b3; // 호버 시 색상 변경
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
        background-color: #f8f9fa; // 드롭다운 내 아이템 호버 시 배경색 변경
      }
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
          <Navbar.Brand href="/home">
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
