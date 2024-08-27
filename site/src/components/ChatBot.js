import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import NavigationBar from '../pages/NavigationBar';
import { useNavigate } from 'react-router-dom';

const StyledChatBot = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 90vh;
  background: #f5f5f5;
  font-family: sans-serif;
  text-align: center;

  @media (max-width: 600px) {
  .chat-box {
    width: 100%;
    height: auto;
  }
}

  .chat-box {
    width: 500px;
    height: 600px;
    background: #fff;
    border-radius: 8px;
    box-shadow: 0px 14px 24px rgba(0, 0, 0, 0.13);
    overflow: hidden;
    display: flex;
    flex-direction: column;
  }

  h1 {
    background-color: #f5f5f5;
    padding: 20px;
    margin: 0;
  }

  .messages-list {
    padding: 20px;
    flex-grow: 1;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
  }

  .bot, .user {
    margin-bottom: 20px;
    max-width: 80%;
    padding: 10px 15px;
    border-radius: 16px;
    align-self: flex-start;
    background: #f0f0f0; /* Light gray background for bot messages */
    color: #333; /* Dark text for readability */
    text-align: left; /* Align text to the left */
  }

  .user {
    align-self: flex-end;
    background: #2979ff; /* Blue background for user messages */
    color: #fff; /* White text for readability */
    border-radius: 16px 16px 0 16px;
    text-align: left; /* Align text to the left */
  }

  .message-form {
    border-top: 1px solid #f0f0f0;
    padding: 20px;
    display: flex;
    align-items: center;
  }

  .message-input {
    flex-grow: 1;
    padding: 10px;
    border-radius: 16px;
    border: 1px solid #ccc;
    margin-right: 10px;
  }

  .send-button {
    padding: 10px 20px;
    border-radius: 16px;
    border: none;
    background-color: #2979ff;
    color: #fff;
    cursor: pointer;
  }

  .send-button:active {
  opacity: 0.8;
}
`;


function ChatBot() {
  const [messages, setMessages] = useState([{ id: 1, text: "로딩 중...", sender: "bot" }]); //채팅창에 표시될 메시지 목록
  const [inputValue, setInputValue] = useState(""); //입력 필드
  const navigate = useNavigate(); //페이지 전환 담당 (사용자 분석이 완료된 후에 리포트 페이지로 넘어감)
  const messagesEndRef = useRef(null); // ref 객체를 생성 (스크롤 하단 고정 기능)
  useEffect(() => {
    
    const fetchInitialMessage = async () => {
      try {
        const response = await axios.post('http://127.0.0.1:8000/api/chat', {
          request_message: "",
          user_name: "5hseok"
        }, {
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json',
            "Authorization": "Bearer e"
          }
        });
        setMessages([{ id: 1, text: response.data.response_message || "반갑습니다! 무엇을 도와드릴까요?", sender: "bot" }]);
      } catch (error) {
        console.error('There was an error!', error);
        setMessages([{ id: 1, text: "오류가 발생했습니다.", sender: "bot" }]);
      }
    };

    fetchInitialMessage();
  }, []);  // 종속성 배열을 비워서 컴포넌트 마운트 시 1회만 실행
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);  // 메시지 목록이 업데이트될 때 스크롤을 하단으로 이동

  //사용자가 입력 필드에 텍스트를 입력하면 inputValue 상태를 업데이트
  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  //전송 버튼을 누르거나 엔터 키를 입력하면 입력된 메시지를 'messages'배열에 추가하고 서버에 메시지를 전송
  const handleSend = async () => {
    setInputValue('');
    if (inputValue.trim()) {
      const newMessage = { id: messages.length+1, text: inputValue, sender: "user" };
      setMessages([...messages, newMessage]); //메시지 목록에 사용자 메시지를 추가
      try {
        const response = await axios.post('http://127.0.0.1:8000/api/chat', {
          request_message: inputValue,
          user_name: "5hseok"
        }, {
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json',
            "Authorization": "Bearer e"
          }
        });
        const reply = { id: messages.length + 2, text: response.data.response_message, sender: "bot" };
        setMessages(prevMessages => [...prevMessages, reply]); //메시지 목록에 서버 응답을 추가


        // AnalyticsReport 페이지로 넘어갇록 구현 (분석이 끝나면 동작)
        if (response.data.response_message.includes("부동산 소비 유형을 알려드리기 위해 분석 중이에요!") && response.data.report_data){
          console.log("Navigating with data:", response.data.report_data);
          navigate('/report', {state: {reportData: response.data.report_data}}); //분석 결과 페이지로 이동, 데이터를 전달
        }
      } catch (error) {
        console.error('There was an error!', error);
      }
    }
  };

  //엔터 키를 누르면 handleSend 함수를 호출
  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleSend();
    }
  };

  return (
    <>
    <NavigationBar></NavigationBar>

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
          <button onClick={handleSend} variant="primary" className='send-button'>
            전송
          </button>
        </div>
      </div>
    </StyledChatBot>
    </>
  );
}

export default ChatBot;
