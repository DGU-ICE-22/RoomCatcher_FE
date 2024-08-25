import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import axios from 'axios';
import styled from 'styled-components';

const StyledChatBot = styled.div`
  .bubble {
    padding: 10px 15px;
    border-radius: 20px;
    margin: 5px;
    display: inline-block;
  }

  .bot {
    background-color: #e9ecef;
    align-self: flex-start;
  }

  .user {
    background-color: #007bff;
    color: white;
    align-self: flex-end;
  }
`;

function ChatBot() {
  useEffect(() => {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css';
    document.head.appendChild(link);

    return () => {
      document.head.removeChild(link);
    };
  }, []);

  const [messages, setMessages] = useState([
    { id: 1, text: "반갑습니다! 무엇을 도와드릴까요?", sender: "bot" }
  ]);
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleSend = async () => {
    if (inputValue.trim()) {
      const newMessage = { id: messages.length + 1, text: inputValue, sender: "user" };
      setMessages([...messages, newMessage]);
      try {
        const response = await axios.post('https://your-server-url/messages', { message: inputValue });
        const reply = { id: messages.length + 2, text: response.data.reply, sender: "bot" };
        setMessages(prevMessages => [...prevMessages, reply]);
      } catch (error) {
        console.error('There was an error!', error);
      }
      setInputValue('');
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleSend();
    }
  };

  return (
    <StyledChatBot>
      <Container style={{ maxWidth: '600px', marginTop: '20px' }}>
        <Row>
          {messages.map(message => (
            <Col key={message.id} xs={12} style={{ marginBottom: '10px' }}>
              <div className={`bubble ${message.sender === 'bot' ? 'bot' : 'user'}`}>
                {message.text}
              </div>
            </Col>
          ))}
        </Row>
        <Row>
          <Col xs={12}>
            <Form.Control
              type="text"
              value={inputValue}
              onChange={handleInputChange}
              onKeyPress={handleKeyPress}
              placeholder="메시지를 입력해주세요."
            />
            <Button onClick={handleSend} variant="primary" style={{ marginTop: '10px' }}>
              전송
            </Button>
          </Col>
        </Row>
      </Container>
    </StyledChatBot>
  );
}

export default ChatBot;
