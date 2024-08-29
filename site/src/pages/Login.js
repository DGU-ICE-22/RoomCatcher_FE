import React, { useRef, useState, useEffect } from "react";
import axios from 'axios';
import 로고 from '../assets/images/로고.png';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const LoginStyle = styled.div`
  
@import url('https://fonts.googleapis.com/css?family=Montserrat:400,800');

* {
	box-sizing: border-box;
}

body {
	background: #f6f5f7;
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
	font-family: 'Montserrat', sans-serif;
	height: 100vh;
	margin: -20px 0 50px;
}

h1 {
	font-weight: bold;
	margin: 0;
}

h2 {
	text-align: center;
}

p {
	font-size: 14px;
	font-weight: 100;
	line-height: 20px;
	letter-spacing: 0.5px;
	margin: 20px 0 30px;
}

span {
	font-size: 12px;
}

a {
	color: #333;
	font-size: 14px;
	text-decoration: none;
	margin: 15px 0;
}

button {
	border-radius: 20px;
	border: 1px solid #FA8072;
	background-color: #FA8072;
	color: #FFFFFF;
	font-size: 12px;
	font-weight: bold;
	padding: 12px 45px;
	letter-spacing: 1px;
	text-transform: uppercase;
	transition: transform 80ms ease-in;
}

button:active {
	transform: scale(0.95);
}

button:focus {
	outline: none;
}

button.ghost {
	background-color: transparent;
	border-color: #FFFFFF;
}

form {
	background-color: #FFFFFF;
	display: flex;
	align-items: center;
	justify-content: center;
	flex-direction: column;
	padding: 0 50px;
	height: 100%;
	text-align: center;
}

input {
	background-color: #eee;
	border: none;
	padding: 12px 15px;
	margin: 8px 0;
	width: 100%;
}

.identity-inputs {
    display: flex;
    justify-content: flex-end; /* 왼쪽 정렬 */
    width: 100%; /* 컨테이너의 전체 너비 사용 */
		align-items: baseline; /* 아이템들을 기준선에 맞춰 정렬 */
    margin-bottom: 15px; /* 필드들 아래에 여백 추가 */
}



#생년월일, #주민번호앞자리 {
    width: auto; /* 각 input 필드의 너비를 자동으로 설정 */
    flex-grow: 1; /* 사용 가능한 공간을 균등하게 분배 */
}

#주민번호앞자리 {
	width: 20%;
}



.container {
	background-color: #fff;
	border-radius: 10px;
  box-shadow: 0 14px 28px rgba(0,0,0,0.25), 
			0 10px 10px rgba(0,0,0,0.22);
	position: relative;
	overflow: hidden;
	width: 768px;
	max-width: 100%;
	min-height: 480px;
	margin: auto; /* 중앙 정렬을 위해 추가 */
  display: flex; /* Flexbox를 사용하여 항목들을 중앙에 정렬 */
  flex-direction: column; /* 항목들을 수직으로 정렬 */
  justify-content: center; /* 수직 중앙 정렬 */
  align-items: center; /* 수평 중앙 정렬 */
}

.form-container {
	position: absolute;
	top: 0;
	height: 100%;
	transition: all 0.6s ease-in-out;
}

.sign-in-container {
	left: 0;
	width: 50%;
	z-index: 2;
}

.container.right-panel-active .sign-in-container {
	transform: translateX(100%);
}

.sign-up-container {
	left: 0;
	width: 50%;
	opacity: 0;
	z-index: 1;
}

.container.right-panel-active .sign-up-container {
	transform: translateX(100%);
	opacity: 1;
	z-index: 5;
	animation: show 0.6s;
}

@keyframes show {
	0%, 49.99% {
		opacity: 0;
		z-index: 1;
	}
	
	50%, 100% {
		opacity: 1;
		z-index: 5;
	}
}

.overlay-container {
	position: absolute;
	top: 0;
	left: 50%;
	width: 50%;
	height: 100%;
	overflow: hidden;
	transition: transform 0.6s ease-in-out;
	z-index: 100;
}

.container.right-panel-active .overlay-container{
	transform: translateX(-100%);
}

.overlay {
	background: #FF416C;
	background: -webkit-linear-gradient(to right, #FF4B2B, #FF416C);
	background: linear-gradient(to right, #FA8072, #FF416C);
	background-repeat: no-repeat;
	background-size: cover;
	background-position: 0 0;
	color: #FFFFFF;
	position: relative;
	left: -100%;
	height: 100%;
	width: 200%;
  transform: translateX(0);
	transition: transform 0.6s ease-in-out;
}

.container.right-panel-active .overlay {
  transform: translateX(50%);
}

.overlay-panel {
	position: absolute;
	display: flex;
	align-items: center;
	justify-content: center;
	flex-direction: column;
	padding: 0 40px;
	text-align: center;
	top: 0;
	height: 100%;
	width: 50%;
	transform: translateX(0);
	transition: transform 0.6s ease-in-out;
}

.overlay-left {
	transform: translateX(-20%);
}

.container.right-panel-active .overlay-left {
	transform: translateX(0);
}

.overlay-right {
	right: 0;
	transform: translateX(0);
}

.container.right-panel-active .overlay-right {
	transform: translateX(20%);
}

.social-container {
	margin: 20px 0;
}

.social-container a {
	border: 1px solid #DDDDDD;
	border-radius: 50%;
	display: inline-flex;
	justify-content: center;
	align-items: center;
	margin: 0 5px;
	height: 40px;
	width: 40px;
}

footer {
    background-color: #222;
    color: #fff;
    font-size: 14px;
    bottom: 0;
    position: fixed;
    left: 0;
    right: 0;
    text-align: center;
    z-index: 999;
}

footer p {
    margin: 10px 0;
}

footer i {
    color: red;
}

footer a {
    color: #3c97bf;
    text-decoration: none;
}

  
  `;

	function Login() {

		const containerRef = useRef(null);  // useRef 훅을 사용하여 container DOM 요소에 대한 참조를 생성합니다.
		const [email, setEmail] = useState('');
  	const [password, setPassword] = useState('');
		const [loginAttempt, setLoginAttempt] = useState(null);
		const navigate = useNavigate(); // 리다이렉트를 위한 훅 사용

			// 회원 가입을 처리하는 함수
		const handleRegister = async (event) => {
		event.preventDefault(); // 폼 제출의 기본 이벤트를 차단

		// 입력받은 데이터를 객체로 정리
		const userData = {
			name: event.target.name.value,
			email: event.target.email.value,
			password: event.target.password.value,
			birth: event.target.birth.value,
			sex: event.target.sex.value
		};

		try {
			// 회원가입 API 요청
			const response = await axios.post('http://13.125.189.241:8080/api/register', userData);
			
			if (response.data.code === 201) {
				alert('회원가입에 성공하였습니다.');
				console.log('회원 ID:', response.data.data.userId);
				// 회원 가입 후 필요한 로직
				navigate('/login');
				}
			} catch (error) {
				console.error('회원 가입 실패:', error);
				alert('회원 가입 실패: ' + error.response.data.message);
			}
		};


		useEffect(() => {
			const handleLogin = async () => {
				if (!loginAttempt) return;
	
				try {
					const response = await axios.post('http://13.125.189.241:8080/api/login', {
						email: loginAttempt.email,
						password: loginAttempt.password
					});
					console.log('로그인 성공:', response.data);
	
					if (response.data.code === 201) {
						localStorage.setItem('accessToken', response.data.data.accessToken);
						localStorage.setItem('userId', response.data.data.userId);
						console.log('토큰과 사용자 ID 저장됨');
						navigate('/');
					}
				} catch (error) {
					console.error('로그인 실패:', error);
					if (error.response && error.response.data) {
						alert(`${error.response.data.message}`);
					} else {
						alert("네트워크 오류 또는 서버 응답 없음");
					}
				}
			};
	
			handleLogin();
		}, [loginAttempt]); // loginAttempt 상태에 따라 useEffect가 트리거됩니다.
	
		const handleSubmit = (event) => {
			event.preventDefault();
			setLoginAttempt({ email, password });
		};

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
			<LoginStyle>
				<h2><img style={{height : "1em", verticalAlign : "middle"}} src={로고}></img> RoomCatcher</h2>
				<div className="container" id="container" ref={containerRef}>
	
					{/* 회원가입 폼을 위한 컨테이너 */}
					<div className="form-container sign-up-container">
						<form onSubmit={handleRegister}>
							<h1>Create Account</h1>
							<div className="social-container">
								<a href="#" className="social"><i className="fab fa-facebook-f"></i></a>
								<a href="#" className="social"><i className="fab fa-google-plus-g"></i></a>
								<a href="#" className="social"><i className="fab fa-linkedin-in"></i></a>
							</div>
							<span>or use your email for registration</span>
							<input type="text"  name="name" placeholder="Name" required />
							<input type="email" name="email" placeholder="Email" required />
							<input type="password" name="password" placeholder="Password" required />
							<div className="identity-inputs">
								<input  type="text" name="birth" placeholder="YYMMDD" required id="생년월일" />
								<span style={{fontSize : "20px"}}>-</span>
								<input type="password" placeholder="*" title="주민등록번호 7번째 자리를 입력하세요." id="주민번호앞자리" name="sex" required/>
							</div>
							<button type="submit" onClick={handleSignUpClick}>Sign Up</button>
						</form>
					</div>
	
					{/* 로그인 폼을 위한 컨테이너 */}
					<div className="form-container sign-in-container">
						<form onSubmit={handleSubmit}>
							<h1>Sign in</h1>
	
							{/* 소셜 미디어 로그인 버튼 컨테이너 */}
							<div className="social-container">
								<a href="#" className="social"><i className="fab fa-facebook-f"></i></a>
								<a href="#" className="social"><i className="fab fa-google-plus-g"></i></a>
								<a href="#" className="social"><i className="fab fa-linkedin-in"></i></a>
							</div>
	
							<span>or use your account</span>
	
							{/* 이메일, 비밀번호, 주민번호 입력 필드 */}
								<input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)}/>
								<input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}/>
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
			</LoginStyle>
		);
	}
	
	export default Login;