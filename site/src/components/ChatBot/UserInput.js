//사용자의 입력을 받는 컴포넌트.

import React, { useState } from 'react';

function UserInput({ onSend }) {
  const [input, setInput] = useState('');

  const handleSend = () => {
    onSend(input);
    setInput(''); // 입력 필드 초기화
  };

  return (
    <div className="user-input">
      <input type="text" value={input} onChange={(e) => setInput(e.target.value)} />
      <button onClick={handleSend}>Send</button>
    </div>
  );
}

export default UserInput;