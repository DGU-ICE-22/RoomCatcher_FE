document.addEventListener('DOMContentLoaded', function() {
    let generatedToken = null;
    let timerInterval = null;

    function generateToken() {
        return Math.floor(100000 + Math.random() * 900000).toString();
    }

    function validatePhoneNumber(input) {
        const value = input.value;
        const numericValue = value.replace(/[^0-9]/g, '');
        if (value !== numericValue) {
            document.getElementById('error__phone').innerText = '숫자만 입력하세요.';
            input.value = numericValue;
        } else {
            document.getElementById('error__phone').innerText = '';
        }
        checkPhoneNumber();
    }

    function checkPhoneNumber() {
        const phone1 = document.getElementById("phone1").value;
        const phone2 = document.getElementById("phone2").value;
        const phone3 = document.getElementById("phone3").value;

        if (phone1.length === 3 && phone2.length === 4 && phone3.length === 4) {
            document.getElementById("token__button").style = "background-color: #FFFFFF; color: #0068ff; cursor: pointer;";
            document.getElementById("token__button").removeAttribute("disabled");
        } else {
            document.getElementById("token__button").style = "background-color: #d2d2d2; color: #FFFFFF; cursor: not-allowed;";
            document.getElementById("token__button").setAttribute("disabled", true);
        }
        validateForm();
    }

    function getToken() {
        generatedToken = generateToken();
        document.getElementById('token').innerText = generatedToken;
        document.getElementById('token__button').innerText = '재전송';
        document.getElementById('token__button').disabled = false;
        document.getElementById('error__token').innerText = '';
        startTimer();

        document.getElementById('token__confirm__button').disabled = false;
        document.getElementById('token__input').disabled = false;
    }

    function confirmToken() {
        const userToken = document.getElementById('token__input').value;
        if (userToken === generatedToken) {
            document.getElementById('error__token').innerText = '';
            alert('인증이 완료되었습니다.');
            clearInterval(timerInterval);
            document.getElementById('token__timer').innerText = '인증 완료';
            document.getElementById('token__timer__finish').disabled = true;
            document.getElementById('token__button').disabled = true;
            document.getElementById("token__button").style = "background-color: #fafafa; color: #d0d0d0";
            document.getElementById('token__confirm__button').disabled = true;
        } else {
            document.getElementById('error__token').innerText = '죄송합니다. 인증번호가 올바르지 않습니다. 다시 입력해주세요.';
        }
    }

    function startTimer() {
        let timer = 180;
        clearInterval(timerInterval);
        timerInterval = setInterval(function() {
            const minutes = Math.floor(timer / 60);
            const seconds = timer % 60;
            document.getElementById('token__timer').innerText = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
            if (--timer < 0) {
                clearInterval(timerInterval);
                document.getElementById('token__timer').innerText = '시간 초과';
                document.getElementById('token__timer__finish').disabled = true;
            }
        }, 1000);
        document.getElementById('token__timer__finish').disabled = false;
    }

    function getTokenTimerConfirm() {
        alert('인증이 완료되었습니다.');
        clearInterval(timerInterval);
        document.getElementById('token__timer').innerText = '인증 완료';
        document.getElementById('token__timer__finish').disabled = true;
        document.getElementById('token__button').disabled = true;
        document.getElementById('token__confirm__button').disabled = true;
    }

    window.getToken = getToken;
    window.confirmToken = confirmToken;
    window.getTokenTimerConfirm = getTokenTimerConfirm;
    window.validatePhoneNumber = validatePhoneNumber;

    function checkPasswordFields() {
        const password1 = document.getElementById('password1').value;
        const password2 = document.getElementById('password2').value;
        const button = document.getElementById('pw__check');

        if (password1.length > 0 || password2.length > 0) {
            button.disabled = false;
        } else {
            button.disabled = true;
        }

        validateForm();
    }

    function validateForm() {
        const email = document.getElementById('email').value;
        const name = document.getElementById('name').value;
        const userid = document.getElementById('userid').value;
        const password1 = document.getElementById('password1').value;
        const password2 = document.getElementById('password2').value;
        const phone1 = document.getElementById('phone1').value;
        const phone2 = document.getElementById('phone2').value;
        const phone3 = document.getElementById('phone3').value;
        const location = document.getElementById('location').value;
      
        if (email && name && userid && password1 && password1 === password2 && phone1.length === 3 && phone2.length === 4 && phone3.length === 4 && location !== "지역을 선택하세요.") {
            document.getElementById('signup__button').disabled = false;
        } else {
            document.getElementById('signup__button').disabled = true;
        }
    }

    function signup() {
        const email = document.getElementById("email").value;
        const writer = document.getElementById("name").value;
        const userid = document.getElementById("userid").value;
        const password1 = document.getElementById("password1").value;
        const password2 = document.getElementById("password2").value;
        const location = document.getElementById("location").value;

        let isValid = true;

        if (email.includes("@") === false) {
            document.getElementById("error__email").innerText = "이메일이 올바르지 않습니다.";
            isValid = false;
        } else {
            document.getElementById("error__email").innerText = "";
        }

        if (writer === "") {
            document.getElementById("error__name").innerText = "이름이 올바르지 않습니다.";
            isValid = false;
        } else {
            document.getElementById("error__name").innerText = "";
        }

        if (userid === "") {
            document.getElementById("error__userid").innerText = "아이디를 입력해 주세요.";
            isValid = false;
        } else {
            document.getElementById("error__userid").innerText = "";
        }

        if (password1 === "") {
            document.getElementById("error__password1").innerText = "비밀번호를 입력해 주세요.";
            isValid = false;
        } else {
            document.getElementById("error__password1").innerText = "";
        }

        if (password2 === "") {
            document.getElementById("error__password2").innerText = "비밀번호를 입력해 주세요.";
            isValid = false;
        } else {
            document.getElementById("error__password2").innerText = "";
        }

        if (password1 !== password2) {
            document.getElementById("error__password1").innerText = "비밀번호가 일치하지 않습니다.";
            document.getElementById("error__password2").innerText = "비밀번호가 일치하지 않습니다.";
            isValid = false;
        }

        if (location !== "서울시" && location !== "경기도" && location !== "인천시" && location !== "충청도" && location !== "전라도" && location !== "경상도" && location !== "강원도" && location !== "제주도") {
            document.getElementById("error__location").innerText = "지역을 선택해 주세요.";
            isValid = false;
        } else {
            document.getElementById("error__location").innerText = "";
        }

        if (isValid === true) {
            alert("회원가입을 축하합니다.");
        }
    }

    window.checkPasswordFields = checkPasswordFields;
    window.validateForm = validateForm;
    window.signup = signup;

    document.getElementById('email').addEventListener('input', validateForm);
    document.getElementById('name').addEventListener('input', validateForm);
    document.getElementById('userid').addEventListener('input', validateForm);
    document.getElementById('password1').addEventListener('input', checkPasswordFields);
    document.getElementById('password2').addEventListener('input', checkPasswordFields);
    document.getElementById('location').addEventListener('change', validateForm);
});

function togglePasswords(button) {
    const password1 = document.getElementById('password1');
    const password2 = document.getElementById('password2');
    const isPasswordVisible = password1.type === 'text';

    if (isPasswordVisible) {
        password1.type = 'password';
        password2.type = 'password';
        button.innerText = '보기';
    } else {
        password1.type = 'text';
        password2.type = 'text';
        button.innerText = '숨기기';
    }
}
