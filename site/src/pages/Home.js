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
      <Navbar expand="lg" className="bg-body-tertiary">
        <Container>

          {/* 로고 사진 */}
          <Row>
          <Col xs={6} md={4}>
            <img src={로고} style={{ height: '24px', width: '17px', marginRight: '5px' }} />
          </Col>
          </Row>

          <Navbar.Brand href="#home">
            
            RoomCatcher
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="#intro">소개</Nav.Link>
              <Nav.Link href="#type-description">유형 설명</Nav.Link>
              <Nav.Link href="#subscription-info">청약 정보 글</Nav.Link>
              <Nav.Link href="#mypage">마이페이지</Nav.Link>
              <NavDropdown title="더보기" id="basic-nav-dropdown">
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
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Welcome-Hero */}
      <WelcomeHero/>

      <ListTopics/>

      <Works/>


      </>
  )

}

export default Home;