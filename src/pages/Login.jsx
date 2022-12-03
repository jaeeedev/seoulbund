import styled, { css } from "styled-components";
import { Link } from "react-router-dom";
import LoginForm from "../components/LoginForm";
import { useNavigate } from "react-router-dom";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import app from "../fb";
import { userActions } from "../store";
import { useDispatch, useSelector } from "react-redux";
import { useCallback } from "react";

export const Wrapper = styled.div`
  display: flex;
  width: 100%;
  height: 100vh;
`;

export const ImageSection = styled.div`
  position: relative;
  width: 60%;
  min-width: 600px;
  height: 100%;
  background: #f3f3f3;
`;

export const LoginSection = styled.div`
  width: 40%;
  min-width: 400px;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  .sns_auth {
    margin-top: 40px;
  }
`;

export const FormContainer = styled.form`
  margin-bottom: 40px;
`;

export const LoginInput = styled.input`
  display: block;
  padding: 10px;
  font-size: 16px;
  border: none;
  border-bottom: 1px solid #ccc;
  width: 350px;
  margin: 0 auto;
  margin-bottom: 20px;

  &::placeholder {
    font-size: 16px;
    color: #999;
  }
`;

export const LoginTitle = styled.h1`
  margin-bottom: 30px;
`;

export const LoginBtn = styled.button`
  border-radius: 5px;
  width: 370px;
  padding: 15px;
  border: none;
  font-size: 16px;
  background: var(--green);
  color: white;
  cursor: pointer;

  ${(props) =>
    props.bg === "google" &&
    css`
      background: #333;
    `}
`;

export const SignupText = styled.p`
  text-align: center;
  font-size: 15px;
  color: #999;
`;

export const SignupLink = styled(Link)`
  display: inline-block;
  color: #333;
  text-decoration: underline;
  font-weight: 600;
  margin-left: 5px;
`;
const FillImage = styled.img`
  display: block;
  width: 100%;
  object-fit: cover;
`;

export const AlertText = styled.p`
  color: red;
  font-size: 15px;
  margin-bottom: 15px;
`;

const Notice = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;

  .go_main {
    font-weight: 600;
  }
`;

function Login() {
  const auth = getAuth(app);
  const provider = new GoogleAuthProvider();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);

  const loginWithGoogle = useCallback(
    async (auth, provider) => {
      await signInWithPopup(auth, provider);
      dispatch(userActions.nowLogin());
      navigate("/");
    },
    [dispatch, navigate]
  );

  return (
    <Wrapper>
      <ImageSection>
        <FillImage src="/imgs/loginImage.jpg" alt="회원가입 이미지" />
      </ImageSection>
      {isLoggedIn && (
        <Notice>
          <p>이미 로그인 되어 있습니다.</p>
          <span>
            <Link className="go_main" to="/">
              메인으로 돌아가기
            </Link>
          </span>
        </Notice>
      )}
      {!isLoggedIn && (
        <LoginSection>
          <LoginTitle>로그인</LoginTitle>
          <LoginForm />
          <SignupText>
            아직 계정이 없으세요?{" "}
            <SignupLink to="/register">회원가입</SignupLink>
          </SignupText>

          <div className="sns_auth">
            <LoginBtn
              bg="google"
              onClick={() => {
                loginWithGoogle(auth, provider);
              }}
            >
              구글로 로그인하기
            </LoginBtn>
          </div>
        </LoginSection>
      )}
    </Wrapper>
  );
}

export default Login;
