import React, {useEffect} from 'react';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown'
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import 로고 from '../assets/images/로고.png';
import WelcomeHero from './WelcomeHero';
import ListTopics from './ListTopics';
import Works from './Works';
import styled from 'styled-components';


const StyledNavbar = styled(Navbar)`
  background-color: #f8f9fa;
  padding: 10px 0; // 상하 패딩 증가

  .navbar-brand, .nav-link {
    font-size: 30px; // 폰트 크기 증가
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

function Home() {


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
    <>
      <StyledNavbar expand="lg">
        <Container>
          <Navbar.Brand href="#home">
            <img src={로고} alt="RoomCatcher Logo" style={{ height: '30px', width: '22px', marginRight: '5px' }} />
            RoomCatcher
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="#intro">소개</Nav.Link>
              <Nav.Link href="#type-description">유형 설명</Nav.Link>
              <Nav.Link href="#subscription-info">청약 정보 글</Nav.Link>
              <Nav.Link href="#mypage">마이페이지</Nav.Link>
              <Nav className="ms-auto">
                <NavDropdown title="더보기" id="basic-nav-dropdown" alignRight>
                  <NavDropdown.Item href="#favorites">찜한 매물</NavDropdown.Item>
                  <NavDropdown.Item href="#recommended-properties">
                    추천 매물
                  </NavDropdown.Item>
                  <NavDropdown.Item href="#help">도움말</NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href="#action/3.4">
                    로그아웃
                  </NavDropdown.Item>
                </NavDropdown>
              </Nav>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </StyledNavbar>

      {/* Welcome-Hero */}
      <WelcomeHero/>

      <ListTopics/>

      <Works/>


      </>
  )

}

export default Home;