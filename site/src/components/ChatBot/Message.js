//챗봇과 사용자 간의 메시지를 담당하는 컴포넌트.

import React from 'react';

function Message({ text }) {
  return <div className="message">{text}</div>;
}

export default Message;