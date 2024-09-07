import React, {useEffect} from 'react';
import WelcomeHero from './WelcomeHero';
import ListTopics from './ListTopics';
import Works from './Works';
import NavigationBar from './NavigationBar';
import ReturnToHome from '../components/ReturnToHome';


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
      {/* 상단 Nav바 */}
      <NavigationBar></NavigationBar>

      {/* Welcome-Hero */}
      <WelcomeHero/>

      {/* 리스트 토픽 */}
      <ListTopics/>

      {/* 내 부동산 유형 분석하기, .. 클릭할 수 있는 구간 */}
      <Works/>


      </>
  )

}

export default Home;