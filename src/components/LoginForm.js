import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { FormContainer, LoginInput, AlertText, LoginBtn } from "../pages/Login";
import app from "../fb";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";

const LoginForm = () => {
  const [errorMsg, setErrorMsg] = useState("");
  const [currentError, setCurrentError] = useState("");
  const navigate = useNavigate();
  const auth = getAuth(app);

  const loginWithEmail = async (auth, email, password) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      setCurrentError("");
      setErrorMsg("");
    } catch (err) {
      console.log(err);

      if (err.message.includes("user")) {
        setCurrentError("user");
        setErrorMsg("존재하지 않는 아이디입니다.");
      }
      if (err.message.includes("password")) {
        setCurrentError("password");
        setErrorMsg("틀린 비밀번호입니다.");
      }
    }
  };

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("이메일을 입력해주세요.")
      .required("아이디를 입력해주세요."),
    password: Yup.string().required("비밀번호를 입력해주세요."),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      await loginWithEmail(auth, values.email, values.password);
      navigate("/");
    },
  });

  return (
    <FormContainer onSubmit={formik.handleSubmit}>
      <LoginInput
        type="text"
        id="email"
        name="email"
        value={formik.values.email}
        onChange={formik.handleChange}
        placeholder="Email"
        autoComplete="email"
      />
      {formik.touched.email && formik.errors.email && (
        <AlertText>{formik.errors.email}</AlertText>
      )}
      {currentError === "user" && <AlertText>{errorMsg}</AlertText>}

      <LoginInput
        type="password"
        id="password"
        name="password"
        value={formik.values.password}
        onChange={formik.handleChange}
        placeholder="Password"
      />
      {formik.touched.password && formik.errors.password && (
        <AlertText>{formik.errors.password}</AlertText>
      )}
      {currentError === "password" && <AlertText>{errorMsg}</AlertText>}

      <LoginBtn type="submit">로그인</LoginBtn>
    </FormContainer>
  );
};

export default LoginForm;
