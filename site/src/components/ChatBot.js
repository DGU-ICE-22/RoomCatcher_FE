import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import NavigationBar from '../pages/NavigationBar';


const StyledChatBot = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: #f5f5f5;
  font-family: sans-serif;
  text-align: center;

  .chat-box {
    width: 500px;
    height: 600px;
    background: #fff;
    border-radius: 8px;
    box-shadow: 0px 14px 24px rgba(0, 0, 0, 0.13);
    overflow: hidden;
    display: flex;
    flex-direction: column; // 이 속성이 중요: 내부 요소들을 세로로 정렬합니다
  }

  h1 {
    background-color: #f5f5f5;
    padding: 20px;
    margin: 0;
  }

  .messages-list {
    padding: 20px;
    flex-grow: 1;
    overflow-y: auto; // 스크롤 가능
    display: flex;
    flex-direction: column; // 세로 방향으로 메시지 배열
  }

  .bot, .user {
    margin-bottom: 20px;
    max-width: 80%;
    padding: 10px 15px;
    border-radius: 16px;
    align-self: flex-start; // 'bot' 클래스는 항상 왼쪽
  }

  .user {
    align-self: flex-end; // 'user' 클래스는 오른쪽
    background: #2979ff;
    color: #fff;
    border-radius: 16px 16px 0 16px;
  }

  .bot {
  align-self: flex-start;
  background: #f0f0f0;
  color: #333;
  padding: 10px 15px;
  border-radius: 16px 16px 16px 0;
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
`;

function ChatBot() {
  const [messages, setMessages] = useState([{ id: 1, text: "로딩 중...", sender: "bot" }]);
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    const fetchInitialMessage = async () => {
      try {
        const response = await axios.post('http://127.0.0.1:8001/api/chat', {
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

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleSend = async () => {
    setInputValue('');
    if (inputValue.trim()) {
      const newMessage = { id: messages.length+1, text: inputValue, sender: "user" };
      setMessages([...messages, newMessage]);
      try {
        const response = await axios.post('http://127.0.0.1:8001/api/chat', {
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
        setMessages(prevMessages => [...prevMessages, reply]);
      } catch (error) {
        console.error('There was an error!', error);
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
    <NavigationBar></NavigationBar>

    <StyledChatBot>

      <div className='chat-box'>

        <h1>내 부동산 유형 분석하기</h1>

        {/* 대화 내용 출력 부분 */}
        <div className='messages-list'>
          {messages.map(message => (
              <div key={message.id} className={`bubble ${message.sender === 'bot' ? 'bot' : 'user'}`}>
                {message.text}
              </div>
          ))}
        </div>
        
        {/* 사용자 입력 부분 */}
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
