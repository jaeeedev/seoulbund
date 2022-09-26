import styled from "styled-components";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { userActions } from "../store";
import { useState } from "react";

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

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isError, setIsError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const validationSchema = Yup.object({
    id: Yup.string().required("아이디를 입력해주세요."),
    password: Yup.string().required("비밀번호를 입력해주세요."),
  });

  const formik = useFormik({
    initialValues: {
      id: "",
      password: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      setIsError(false);

      const response = await fetch("/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      const data = await response.json();

      if (!data.loginSuccess) {
        setIsError(true);
        setErrorMsg(data.message);
      }

      if (data.loginSuccess) {
        dispatch(userActions.nowLogin());
        navigate("/");
      }
    },
  });

  return (
    <Wrapper>
      <ImageSection>
        <FillImage src="/imgs/loginImage.jpg" alt="회원가입 이미지" />
      </ImageSection>
      <LoginSection>
        <LoginTitle>로그인</LoginTitle>

        <FormContainer onSubmit={formik.handleSubmit}>
          <LoginInput
            type="text"
            id="id"
            name="id"
            value={formik.values.id}
            onChange={formik.handleChange}
            placeholder="ID"
          />
          {formik.touched.id && formik.errors.id && (
            <AlertText>{formik.errors.id}</AlertText>
          )}

          <LoginInput
            type="password"
            id="password"
            name="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            placeholder="Password"
          />
          {isError && <AlertText>{errorMsg}</AlertText>}

          <LoginBtn type="submit">로그인</LoginBtn>
        </FormContainer>

        <SignupText>
          아직 계정이 없으세요? <SignupLink to="/register">회원가입</SignupLink>
        </SignupText>
      </LoginSection>
    </Wrapper>
  );
}

export default Login;
