import styled from "styled-components";
import { useFormik } from "formik";
import {
  Wrapper,
  ImageSection,
  LoginSection,
  FormContainer,
  LoginInput,
  LoginTitle,
  LoginBtn,
  SignupText,
  SignupLink,
  AlertText,
} from "./Login";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const Label = styled.label`
  font-weight: 500;
`;

const FillImage = styled.img`
  display: block;
  width: 100%;
  object-fit: cover;
`;

function Login() {
  const [errorMsg, setErrorMsg] = useState(false);

  const navigate = useNavigate();
  const validationSchema = Yup.object({
    id: Yup.string()
      .min(5, "아이디는 최소 5글자 이상이어야 합니다.")
      .required("아이디는 필수적으로 입력하여야 합니다."),
    username: Yup.string()
      .min(2, "이름은 최소 2글자 이상이어야 합니다.")
      .required("이름은 필수적으로 입력하여야 합니다."),
    password: Yup.string()
      .min(6, "비밀번호는 최소 6글자 이상이어야 합니다.")
      .required("비밀번호는 필수적으로 입력하여야 합니다."),
    checkPassword: Yup.string().oneOf(
      [Yup.ref("password"), null],
      "비밀번호가 일치하지 않습니다."
    ),
  });

  const formik = useFormik({
    initialValues: {
      id: "",
      username: "",
      password: "",
      checkPassword: "",
    },
    onSubmit: async (values, { resetForm }) => {
      setErrorMsg(false);
      const response = await fetch("/api/users/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });
      const data = await response.json();

      if (data.success) {
        resetForm();
        navigate("/login");
      } else {
        if (data.err.code === 11000) {
          //아이디 중복
          setErrorMsg(true);
          console.log(data);
        }
      }
    },
    validationSchema,
  });

  return (
    <Wrapper>
      <ImageSection>
        <FillImage src="/imgs/loginImage.jpg" alt="회원가입 이미지" />
      </ImageSection>
      <LoginSection>
        <LoginTitle>회원가입</LoginTitle>
        <FormContainer onSubmit={formik.handleSubmit}>
          <Label htmlFor="id">아이디</Label>
          <LoginInput
            type="text"
            id="id"
            name="id"
            value={formik.values.id}
            onChange={formik.handleChange}
          />
          {formik.touched.id && formik.errors.id && (
            <AlertText>{formik.errors.id}</AlertText>
          )}
          {errorMsg && <AlertText>이미 존재하는 아이디입니다.</AlertText>}
          <Label htmlFor="username">이름</Label>
          <LoginInput
            type="text"
            id="username"
            name="username"
            value={formik.values.username}
            onChange={formik.handleChange}
          />
          {formik.touched.username && formik.errors.username && (
            <AlertText>{formik.errors.username}</AlertText>
          )}
          <Label>비밀번호</Label>
          <LoginInput
            type="password"
            id="password"
            name="password"
            value={formik.values.password}
            onChange={formik.handleChange}
          />
          {formik.touched.password && formik.errors.password && (
            <AlertText>{formik.errors.password}</AlertText>
          )}
          <Label>비밀번호 확인</Label>
          <LoginInput
            type="password"
            id="checkPassword"
            name="checkPassword"
            value={formik.values.checkPassword}
            onChange={formik.handleChange}
          />
          {formik.touched.checkPassword && formik.errors.checkPassword && (
            <AlertText>{formik.errors.checkPassword}</AlertText>
          )}

          <LoginBtn type="submit">회원가입</LoginBtn>
        </FormContainer>
        <SignupText>
          이미 회원가입되어 있으세요?{" "}
          <SignupLink to="/login">로그인</SignupLink>{" "}
        </SignupText>
      </LoginSection>
    </Wrapper>
  );
}

export default Login;
