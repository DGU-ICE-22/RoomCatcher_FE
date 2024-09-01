import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import NavigationBar from '../pages/NavigationBar';
import { useNavigate } from 'react-router-dom';
import Loading from './Loading';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faQuestionCircle } from '@fortawesome/free-solid-svg-icons';

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: start;
  height: 90vh;
  padding: 20px;
`;

const GuidePanel = styled.div`
  width: 40%;
  background: #fff;
  margin-right: 20px;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
  overflow: auto;
  display: flex;
  flex-direction: column;
`;

const GuideSection = styled.div`
  margin-bottom: 20px;
  padding-bottom: 20px; // 패딩 추가로 내용과 선 사이 거리 조절
  border-bottom: 1px solid #e0e0e0; // 하단 경계선 추가
`;

const GuideTitle = styled.h2`
  cursor: pointer;
  &:hover {
    color: #005f73;
  }
`;

const GuideContent = styled.div`
  display: ${props => props.isOpen ? 'block' : 'none'};
  padding: 10px 0;
`;

const StyledChatBot = styled.div`
  width: 60%;
  background: #f5f5f5;
  font-family: sans-serif;
  text-align: center;
  
  .chat-box {
    width: 100%;
    height: 620px;
    background: #fff;
    border-radius: 8px;
    box-shadow: 0px 14px 24px rgba(0, 0, 0, 0.13);
    overflow: hidden;
    display: flex;
    flex-direction: column;
  }
  .messages-list {
    flex-grow: 1;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    padding: 10px 20px; /* Reduced padding */
  }
  .bot, .user {
    margin-bottom: 20px;
    max-width: 35%;
    padding: 10px 15px;
    border-radius: 16px;
    align-self: flex-start;
    background: #f0f0f0;
    color: #333;
    text-align: left;
  }
  .user {
    align-self: flex-end;
    background: #2979ff;
    color: #fff;
    border-radius: 16px 16px 0 16px;
    text-align: left;
  }
  .message-input {
    flex-grow: 1;
    margin-right: 5px;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 16px;
    margin-bottom: 10px;
    width: 70%;
  }

  .send-button {
    padding: 10px 20px;
    background-color: #2979ff;
    color: #fff;
    border: none;
    border-radius: 16px;
    cursor: pointer;
  }
`;

function ChatBot() {
  const [messages, setMessages] = useState([{ id: 1, text: "로딩 중...", sender: "bot" }]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const messagesEndRef = useRef(null);

  const [isGuideOpen, setGuideOpen] = useState(false);
  const [isFaqOpen, setFaqOpen] = useState(false);
  const [isUpdateOpen, setUpdateOpen] = useState(false);
  

  // 메시지를 지정된 간격으로 추가하는 함수
  const addMessageInIntervals = (messagesArray) => {
    return new Promise(resolve => {
      messagesArray.forEach((messageText, index) => {
        setTimeout(() => {
          setMessages(prevMessages => [
            ...prevMessages,
            { id: prevMessages.length + 1, text: messageText, sender: "bot" }
          ]);
  
          // 마지막 메시지를 추가한 후에 resolve를 호출
          if (index === messagesArray.length - 1) {
            resolve();
          }
        }, index * 1000); // 1초 간격으로 메시지 추가
      });
    });
  };


  useEffect(() => {
    async function fetchInitialMessage() {
      
       // 로컬 스토리지에서 가져온 정보들
      const accessToken = localStorage.getItem('accessToken');
      const accessName = localStorage.getItem('userName');

      if (!accessToken) {
        console.error('No access token available');
        return;
      }

      try {
        const response = await axios.post('http://127.0.0.1:8000/api/chat', {
          request_message: "",
          user_name: accessName
        }, {
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json',
            "Authorization": `Bearer ${accessToken}`
          }
        });
        setMessages([{ id: 1, text: response.data.response_message || "반갑습니다! 무엇을 도와드릴까요?", sender: "bot" }]);
      } catch (error) {
        console.log(accessToken);
        console.error('There was an error!', error);
        setMessages([{ id: 1, text: "오류가 발생했습니다.", sender: "bot" }]);
      }
    }
    fetchInitialMessage();
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  

  

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleSend = async () => {
    setInputValue('');
    if (inputValue.trim()) {
      const newMessage = { id: messages.length + 1, text: inputValue, sender: "user" };
      setMessages([...messages, newMessage]);
      const accessToken = localStorage.getItem('accessToken');
      const accessName = localStorage.getItem('userName');

      try {
        const response = await axios.post('http://127.0.0.1:8000/api/chat', {
          request_message: inputValue,
          user_name: accessName
        }, {
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json',
            "Authorization": `Bearer ${accessToken}`
          }
        });
  
        const fullMessage = response.data.response_message;
        const splitPoint = fullMessage.indexOf("예를 들어");
        const firstPart = fullMessage.substring(0, splitPoint).trim();
        const secondPart = fullMessage.substring(splitPoint).trim();
  
        if (splitPoint !== -1) {
          await addMessageInIntervals([firstPart, secondPart]);
        } else {
          await addMessageInIntervals([fullMessage]);
        }
  
        if (response.data.response_message.includes("부동산 소비 유형을 알려드리기 위해 분석 중이에요!") && response.data.report_data) {
          // 모든 메시지가 화면에 표시된 후 5초를 기다립니다
          await new Promise(resolve => setTimeout(resolve, 5000));
  
          setIsLoading(true); // 로딩 상태 활성화
          setTimeout(() => { // 로딩 화면을 보여주고 나서 리포트 페이지로 네비게이션
            navigate('/report', { state: { reportData: response.data.report_data } });
            setIsLoading(false); // 로딩 상태 해제
          }, 5000); // 예: 5초 동안 로딩 화면 표시
        }
  
      } catch (error) {
        console.error('There was an error!', error);
        setMessages(messages => [...messages, { id: messages.length + 1, text: "오류가 발생했습니다.", sender: "bot" }]);
      }
    }
  };
  



  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleSend();
    }
  };

  return (
    <>
      <NavigationBar />
      <Container>
      {isLoading && <Loading />}
        <GuidePanel>
        <GuideSection>
        <GuideTitle onClick={() => setGuideOpen(!isGuideOpen)}>이용 가이드<FontAwesomeIcon icon={faQuestionCircle} aria-hidden="true" style={{ fontSize: '15px', verticalAlign: 'top' }}/></GuideTitle>
          <GuideContent isOpen={isGuideOpen}>
            <p>저희 부동산 매물 추천 서비스의 AI 챗봇을 이용해 주셔서 감사합니다. 이 가이드는 챗봇을 통해 여러분의 부동산 요구사항을 더 잘 이해하고 적합한 매물을 추천받기 위한 방법을 안내해드립니다.</p>
            <h3 style={{ fontSize: '1.25em' }}>시작하기 전에</h3>
            <ul>
              <li>챗봇과의 대화는 간단한 질문부터 시작하여 점점 더 구체적인 정보를 제공하도록 설계되어 있습니다.</li>
              <li>최상의 추천을 받기 위해서는 정확하고 세부적인 답변을 제공하시는 것이 중요합니다.</li>
            </ul>
            <h3 style={{ fontSize: '1.25em' }}>대화하는 방법</h3>
            <ol>
              <li><strong>개인적인 요구사항 명확히 하기</strong>: 위치, 예산, 주택 유형(아파트, 빌라, 단독주택 등)과 같은 기본적인 정보를 명확히 해주세요.</li>
              <li><strong>세부 선호사항 공유하기</strong>: 예를 들어, 햇빛이 잘 드는 방향, 학군, 대중교통 접근성 등 세부적인 선호도를 말씀해 주세요.</li>
              <li><strong>질문에 대한 답변 제공하기</strong>: 챗봇이 여러분의 답변을 바탕으로 추가 질문을 할 수 있습니다. 이 질문들에 정확하게 답변하면 더욱 맞춤화된 추천을 받을 수 있습니다.</li>
              <li><strong>피드백 제공하기</strong>: 추천받은 매물에 대해 피드백을 제공하면, 챗봇은 이를 통해 더 정확한 매물을 추천할 수 있습니다.</li>
            </ol>
          </GuideContent>
        </GuideSection>
        <GuideSection>
          <GuideTitle onClick={() => setFaqOpen(!isFaqOpen)}>FAQ</GuideTitle>
          <GuideContent isOpen={isFaqOpen}>
          <h3 style={{ fontSize: '1.25em' }}>Q1: 이 서비스를 사용하는 데 비용이 드나요?</h3>
          <p>A1: 저희 부동산 매물 추천 서비스는 한이음 프로젝트로 만들어진 것으로, 기본적으로 무료입니다.</p>
          <h3 style={{ fontSize: '1.25em' }}>Q2: 어떤 정보를 제공해야 하나요?</h3>
          <p>A2: 매물 추천을 위해 위치, 예산, 주택 유형, 그리고 특별히 중요시하는 조건들(예: 학군, 대중교통 접근성) 등의 정보를 제공하시면 됩니다.</p>
          <h3 style={{ fontSize: '1.25em' }}>Q3: 추천 받은 매물이 마음에 들지 않으면 어떻게 하나요?</h3>
          <p>A3: 추천받은 매물이 마음에 들지 않을 경우, 피드백을 제공해 주시면 이를 반영하여 더 적합한 매물을 추천드리게 됩니다. 피드백은 챗봇과의 대화를 통해 언제든지 제출하실 수 있습니다.</p>
          <h3 style={{ fontSize: '1.25em' }}>Q4: 서비스 지역에는 어떤 곳이 포함되나요?</h3>
          <p>A4: 현재 저희 서비스는 제한적인 지역에서 매물을 추천드리고 있습니다. 더 다양한 부동산 매물 데이터를 수집하기 위해 노력하고 있습니다!</p>
          <h3 style={{ fontSize: '1.25em' }}>Q5: AI 챗봇이 제 질문을 잘못 이해한 경우 어떻게 하나요?</h3>
          <p>A5: AI 챗봇이 질문을 잘못 이해한 경우, 챗봇과의 대화를 통해 질문을 다시 구체적으로 입력하시면 올바른 정보를 학습할 수 있습니다.</p>
          </GuideContent>
        </GuideSection>
        <GuideSection>
          <GuideTitle onClick={() => setUpdateOpen(!isUpdateOpen)}>업데이트 및 개선사항</GuideTitle>
          <GuideContent isOpen={isUpdateOpen}>
            <p>저희 부동산 매물 추천 서비스는 지속적으로 개선하고 업데이트하여 사용자에게 더 나은 경험을 제공하고자 합니다. 여기에서 최근 업데이트된 사항들을 확인하실 수 있습니다.</p>
            <h3 style={{ fontSize: '1.25em' }}>최근 업데이트</h3>
            <ul>
              <li><strong>새로운 검색 필터 추가</strong>: 위치, 가격대, 주택 유형별로 매물을 더욱 세밀하게 검색할 수 있습니다.</li>
              <li><strong>사용자 인터페이스 개선</strong>: 더욱 직관적이고 사용하기 쉬운 디자인으로 개편되었습니다.</li>
              <li><strong>보안 강화</strong>: 사용자 데이터 보호를 위한 새로운 보안 기능이 추가되었습니다.</li>
            </ul>
            <h3 style={{ fontSize: '1.25em' }}>계획 중인 개선사항</h3>
            <ul>
              <li><strong>모바일 앱 출시 예정</strong>: 휴대폰에서도 편리하게 매물 정보를 확인하고 추천 받을 수 있는 앱을 개발 중입니다.</li>
              <li><strong>AI 추천 알고리즘 업그레이드</strong>: 더 정확하고 개인화된 매물 추천을 위해 AI 알고리즘을 개선하고 있습니다.</li>
            </ul>
          </GuideContent>
        </GuideSection>
      </GuidePanel>
        <StyledChatBot>
          <div className='chat-box'>
            <div className='messages-list'>
              {messages.map(message => (
                <div key={message.id} className={`bubble ${message.sender === 'bot' ? 'bot' : 'user'}`}>
                  {message.text}
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
            <div className="message-form">
              <input
                type="text"
                value={inputValue}
                onChange={handleInputChange}
                onKeyPress={handleKeyPress}
                placeholder="메시지를 입력해주세요."
                className='message-input'
              />
              <button onClick={handleSend} className='send-button'>
                전송
              </button>
            </div>
          </div>
        </StyledChatBot>
      </Container>
    </>
  );
}

export default ChatBot;