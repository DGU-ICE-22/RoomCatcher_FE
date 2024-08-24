import React from 'react';
import { Container, Row, Col} from 'react-bootstrap';
import styled from 'styled-components';
import 카드1 from '../assets/images/카드1.png';
import 카드2 from '../assets/images/카드2.png';
import 카드3 from '../assets/images/카드3.png';

const WorksStyled = styled.section`
/* section-header */
.section-header{
    position: relative;
    text-align: center;
}
.section-header h2{
    color: #505866;
    font-size:24px;
    font-weight: 500;
    margin-bottom: 24px;
    text-transform: uppercase;
    letter-spacing: 1.3px;
}
.section-header h2 span{text-transform: lowercase;}
.section-header p{
    font-size:16px;
}
/* section-header */
.fix{position: relative;clear: both;}

  padding: 0 0 90px;

  .works-content {
    margin-top: 73px;
  }

  .single-how-works {
    text-align: center;
    padding: 50px 42px;
    border-radius: 3px;
    box-shadow: 0 0px 5px rgba(71, 71, 71, 0.2);
    margin-bottom: 30px;
    transition: 0.3s linear;

    &:hover {
      color: #fff;
      background: #ff545a;
      box-shadow: 0 0px 10px rgba(71, 71, 71, 0.4);

      .single-how-works-icon {
        background: #fff;
      }

      .welcome-hero-btn.how-work-btn {
        background: #fff;
        color: #ff545a;
      }

      h2 a,
      p {
        color: #fff;
      }
    }
  }

  img {
        width: 80%;
        height: 80%;
        border-radius: 50%;  // 이미지 자체도 원형으로 만듭니다.
        object-fit: cover;  // 이미지 비율을 유지하면서 컨테이너를 채웁니다.
    }

  .single-how-works-icon {
    display: inline-block;
    color: #ffffff;
    width: 80px;
    height: 80px;
    line-height: 80px;
    background: #ffffff;
    border-radius: 50%;
    font-size: 35px;

    }
  }

  .single-how-works h2 a {
    font-size: 18px;
    margin: 35px 0 20px;

    span {
      text-transform: lowercase;
    }
  }

  .single-how-works p {
    margin-bottom: 25px;
    text-transform: initial;
  }

  .welcome-hero-btn.how-work-btn {
    display: inline-block;
    margin: 0;
    width: 100px;
    height: 35px;
    font-size: 12px;
    background: transparent;
    color: #767f86;
    border: 1px solid #d3d6d9;
    border-radius: 3px;
  }
`;

const worksData = [
    {
        iconClass: 카드1,
        title: "내 부동산 유형 분석하기",
        description: " 당신의 생활 스타일과 예산에 맞는 최적의 부동산 유형을 발견하세요.",
        link: "#"
    },
    {
        iconClass: 카드2,
        title: "전체 매물 보러가기",
        description: "다양한 필터와 선호도를 설정하여, 당신의 조건에 완벽하게 부합하는 부동산을 찾아보세요.",
        link: "#"
    },
    {
        iconClass: 카드3,
        title: "추천 매물 보러가기",
        description: "당신의 취향과 조건을 완벽히 만족시키는 매물을 지금 확인해보세요.",
        link: "#"
    }
];

function Works() {
    return (
      <WorksStyled>
        <section id="works" className="works">
            <Container>
                <div className="section-header">
                    <h2>Introduction</h2>
                    <p>Learn more about how our website works</p>
                </div>
                <div className="works-content">
                    <Row>
                        {worksData.map((work, index) => (
                            <Col md={4} sm={6} key={index}>
                                <div className="single-how-works">
                                    <div className="single-how-works-icon">
                                        <img src={work.iconClass}></img>
                                    </div>
                                    <h2><a href={work.link}>{work.title}</a></h2>
                                    <p>{work.description}</p>
                                </div>
                            </Col>
                        ))}
                    </Row>
                </div>
            </Container>
        </section>
        </WorksStyled>
    );
}

export default Works;
