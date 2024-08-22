import React, { useRef } from "react";
import '../styles/Login.css';
import 로고 from '../assets/images/로고.png';

function Login() {
  const containerRef = useRef(null);  // useRef 훅을 사용하여 container DOM 요소에 대한 참조를 생성합니다.

  // signUp 클릭 이벤트 핸들러
  // 클릭 시 container DOM 요소에 'right-panel-active' 클래스를 추가합니다.
  const handleSignUpClick = () => {
    if (containerRef.current) {   // containerRef가 참조하는 요소가 존재하는지 확인
      containerRef.current.classList.add("right-panel-active");
    }
  };

  // signIn 클릭 이벤트 핸들러
  // 클릭 시 container DOM 요소에서 'right-panel-active' 클래스를 제거합니다.
  const handleSignInClick = () => {
    if (containerRef.current) {
      containerRef.current.classList.remove("right-panel-active");
    }
  };

  return (
    <div>
      <h2><img style={{height : "1em", verticalAlign : "middle"}} src={로고}></img> RoomCatcher</h2>
      <div className="container" id="container" ref={containerRef}>

        {/* 회원가입 폼을 위한 컨테이너 */}
        <div className="form-container sign-up-container">
          <form>
            <h1>Create Account</h1>
            <div className="social-container">
              <a href="#" className="social"><i className="fab fa-facebook-f"></i></a>
              <a href="#" className="social"><i className="fab fa-google-plus-g"></i></a>
              <a href="#" className="social"><i className="fab fa-linkedin-in"></i></a>
            </div>
            <span>or use your email for registration</span>
            <input type="text" placeholder="Name" />
            <input type="email" placeholder="Email" />
            <input type="password" placeholder="Password" />
            <div className="identity-inputs">
              <input type="YYMMDD" placeholder="YYMMDD" id="생년월일"/>
              <span style={{fontSize : "20px"}}>-</span>
              <input type="password" placeholder="*" title="주민등록번호 7번째 자리를 입력하세요." id="주민번호앞자리"/>
            </div>
            <button type="submit" onClick={handleSignUpClick}>Sign Up</button>
          </form>
        </div>

        {/* 로그인 폼을 위한 컨테이너 */}
        <div className="form-container sign-in-container">
          <form>
            <h1>Sign in</h1>

            {/* 소셜 미디어 로그인 버튼 컨테이너 */}
            <div className="social-container">
              <a href="#" className="social"><i className="fab fa-facebook-f"></i></a>
              <a href="#" className="social"><i className="fab fa-google-plus-g"></i></a>
              <a href="#" className="social"><i className="fab fa-linkedin-in"></i></a>
            </div>

            <span>or use your account</span>

            {/* 이메일, 비밀번호, 주민번호 입력 필드 */}
              <input type="email" placeholder="Email" />
              <input type="password" placeholder="Password"/>
            <br></br>
            <button type="submit" onClick={handleSignInClick}>Sign In</button>
          </form>
        </div>

        {/* 오버레이 패널 컨테이너 */}
        <div className="overlay-container">
          <div className="overlay">
            {/* 오버레이 왼쪽 패널 (로그인) */}
            <div className="overlay-panel overlay-left">
              <h1>Welcome Back!</h1>
              <p>To keep connected with us please login with your personal info</p>
              <button className="ghost" onClick={handleSignInClick}>Sign In</button>
            </div>
            {/* 오버레이 오른쪽 패널 (회원가입) */}
            <div className="overlay-panel overlay-right">
              <h1>Hello, Friend!</h1>
              <p>Enter your personal details and start journey with us</p>
              <button className="ghost" onClick={handleSignUpClick}>Sign Up</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;