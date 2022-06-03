import React, { useCallback, useContext } from 'react';
import styled from 'styled-components';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import { LoginContext } from '../context/LoginContext';
import { useNavigate } from 'react-router';

const LoginPageContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: ${window.innerHeight - 100}px;
    .join-btn{
        font-size: small;
        text-align: right;
        margin-top: 16px;
    }
`;

function LoginPage() {
    const { setUser } = useContext(LoginContext);
    const navigate = useNavigate();


    
    const onClickLoginBtn = useCallback(() => {
        const userId = document.getElementById("user-id").value;
        const userPw = document.getElementById("user-pw").value;
        if(userId.replaceAll(" ","") == "" || userPw.replaceAll(" ","") == ""){
            alert("아이디와 비밀번호를 모두 입력하세요.");
            document.getElementById("user-id").focus();
        }
        setUser({
            id: userId,
            pw : userPw,
            name : "홍길동",
            like : []
        });
        navigate('/');
    },[navigate, setUser]);
    
    
    const onKeyDownPWInput = (e) => {
        if(e.keyCode === 13){
            document.getElementById("login-btn").click();
        }
    }

    return (
        <LoginPageContainer>
            <div className="d-flex flex-column">
                <h3 className="fw-bold text-primary text-center pb-2">로그인</h3>
                <TextField
                    className="pb-2"
                    label="아이디"
                    id="user-id"
                    size="small"
                />
                <TextField
                    className="pb-2"
                    label="비밀번호"
                    id="user-pw"
                    size="small"
                    onKeyDown={onKeyDownPWInput}
                />
                <Button id="login-btn" variant="contained" onClick={onClickLoginBtn}>로그인</Button>
                <Button id="join-btn" color="primary" className="mt-2">회원가입</Button>
            
            </div>


        </LoginPageContainer>
    );
}

export default LoginPage;