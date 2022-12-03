import styled from "styled-components";
import RegisterForm from "../components/RegisterForm";

import {
  Wrapper,
  ImageSection,
  LoginSection,
  LoginTitle,
  SignupText,
  SignupLink,
} from "./Login";

const FillImage = styled.img`
  display: block;
  width: 100%;
  object-fit: cover;
`;

function Login() {
  return (
    <Wrapper>
      <ImageSection>
        <FillImage src="/imgs/loginImage.jpg" alt="회원가입 이미지" />
      </ImageSection>
      <LoginSection>
        <LoginTitle>회원가입</LoginTitle>
        <RegisterForm />
        <SignupText>
          이미 회원가입되어 있으세요?{" "}
          <SignupLink to="/login">로그인</SignupLink>{" "}
        </SignupText>
      </LoginSection>
    </Wrapper>
  );
}

export default Login;
