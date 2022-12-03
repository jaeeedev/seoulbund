import React from "react";
import { FormContainer, LoginInput, LoginBtn, AlertText } from "../pages/Login";
import styled from "styled-components";
import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import app from "../fb";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";

const Label = styled.label`
  font-weight: 500;
`;

const RegisterForm = () => {
  const auth = getAuth(app);
  const registerWithEmail = async (auth, email, password) => {
    try {
      const user = await createUserWithEmailAndPassword(auth, email, password);
    } catch (e) {
      console.log(e);
    }
  };

  const setProfile = async (auth, username) => {
    await updateProfile(auth, {
      displayName: username,
    });
  };

  const navigate = useNavigate();

  const [errorMsg, setErrorMsg] = useState(false);

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("이메일을 입력해 주세요.")
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
      email: "",
      username: "",
      password: "",
      checkPassword: "",
    },
    onSubmit: async (values, { resetForm }) => {
      setErrorMsg(false);
      await registerWithEmail(auth, values.email, values.password);
      await setProfile(auth.currentUser, values.username);
      //전역 상태 변경은 App.js에서 onAuthStateChanged가 처리
      resetForm();
      navigate("/");
    },
    validationSchema,
  });

  return (
    <FormContainer onSubmit={formik.handleSubmit}>
      <Label htmlFor="email">이메일</Label>
      <LoginInput
        type="text"
        id="email"
        name="email"
        value={formik.values.email}
        onChange={formik.handleChange}
      />
      {formik.touched.email && formik.errors.email && (
        <AlertText>{formik.errors.email}</AlertText>
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
  );
};

export default RegisterForm;
