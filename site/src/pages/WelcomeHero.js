import React, {useEffect} from 'react';
import { Container, Row, Col, Button, Image, Form } from 'react-bootstrap';
import bannerImage from '../assets/images/banner.jpg';
import styled from 'styled-components';

function WelcomeHero() {

  // 스타일 객체
  let WelcomeStyle = styled.div`
  .welcome-hero {
    position: relative;
    background:url(${bannerImage})no-repeat;
    background-position:center;
    background-size:cover;
    text-align: center;
    height:800px;
    z-index: 1;
}
.welcome-hero:before{
    position: absolute;
    content: " ";
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background:rgba(65,73,89,.65);
    z-index: -1;
}
.welcome-hero-txt { padding-top: 155px;}

.welcome-hero-txt h2 {
    font-size: 48px;
    color: #fff;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 2.4px;
    line-height: 1.4;
}
.welcome-hero-txt p {
    font-size: 18px;
    color: #fcfcfc;
    margin-top: 25px;
}

.welcome-hero-serch-box{margin-top: 78px;display: flex;}
.welcome-hero-form {
    display: flex;
    background: #fff;
    height: 70px;
    border-radius: 3px;
    width: 85%;
}
.single-welcome-hero-form {
    position: relative;
    display: flex;
    flex-direction: row;
    align-items: center;
    width: 50%;
    padding: 0 30px;
}
.single-welcome-hero-form:first-child{border-right: 1px solid #edeff1;}
.single-welcome-hero-form input {
    margin-left: 10px;
    height: 70px;
    width: 300px;
    border: 0;
    background: transparent;
}
.single-welcome-hero-form input[type="text"]{
    font-size: 14px;
    color: #859098;
    text-transform: capitalize;
    font-weight: 500;
}
.welcome-hero-form-icon {
    position: absolute;
    top: 20px;
    right: 30px;
    color: #252d32;
}
.welcome-hero-btn {
    display:  flex;
    justify-content:  center;
    align-items:  center;
    font-size:  14px;
    color:  #fff;
    width:  170px;
    height:  70px;
    background:  #FA8072;
    text-transform:  capitalize;
    margin-left:  30px;
    border-radius: 3px;
    -webkit-transition: 0.3s linear; 
    -moz-transition: 0.3s linear; 
    -ms-transition: 0.3s linear; 
    -o-transition: 0.3s linear; 
    transition: 0.3s linear;
}
.welcome-hero-btn:hover{/*background: #fd4043;*/background: #f43032;}

.welcome-hero-btn svg {
    width:  14px;
    height:  auto;
    margin-left:  12px;
}
  `
  

  return (
    <WelcomeStyle>
    <section className="welcome-hero" id='home'>
      <Container>
        <div className='welcome-hero-txt'>
          <h2>Welcome to Our Website!</h2>
          <p>
            Discover Properties That Match Your Budget and Preferences
          </p>
        </div>
        <div className="welcome-hero-serch-box">
          <div className="welcome-hero-form">
            <Row>

              <Col md={6}>
                <div className="single-welcome-hero-form">
                  <h3>What?</h3>
                  <Form>
                      <Form.Group controlId="formBasicWhat">
                          <Form.Control type="text" placeholder="궁금한 유형을 입력하세요" />
                      </Form.Group>
                  </Form>
                  <div className="welcome-hero-form-icon">
                      <i className="flaticon-list-with-dots"></i>
                  </div>
                </div>
              </Col>

              <Col md={6}>
                <div className="single-welcome-hero-form">
                    <h3>Location</h3>
                    <Form>
                        <Form.Group controlId="formBasicLocation">
                            <Form.Control type="text" placeholder="지역, 지하철 또는 단지명을 입력하세요" />
                        </Form.Group>
                    </Form>
                    <div className="welcome-hero-form-icon">
                        <i className="flaticon-gps-fixed-indicator"></i>
                    </div>
                </div>
              </Col>

            </Row>
          </div>

          <div className="welcome-hero-serch">
            <button className='welcome-hero-btn' variant="primary" onClick={() => window.location.href='#'}>
              Search <i data-feather="search"></i> 
            </button>
          </div>

        </div>
      </Container>
    </section>
    </WelcomeStyle>
  );
}

export default WelcomeHero;
