import useForm from "../hooks/useForm";
import ErrorText from "../components/ErrorText";
import SimpleFooter from "../components/SimpleFooter";
import { Link } from "react-router-dom";


import { Container, Box, Typography, TextField, Button } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

// import Form from "react-bootstrap/Form";
// import Button from "react-bootstrap/Button";
import "../styles/form.css";
import axios from "axios";

import { instance } from "../api";
import { LoginDto, ResDto } from "../dto";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    maxWidth: "500px",
    height: "100%",
    margin: "0 auto",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
  },
  backButton: {
    alignSelf: "flex-start",
  },
}));

function Login({ onSubmit }) {
  const classes = useStyles();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post("http://localhost:8080/members/login", {
        email,
        password,
      });

      if (response.status === 200) {
        const loginInfo = response.data;
        localStorage.setItem("loginInfo", JSON.stringify(loginInfo));
        // router.push("/");
        navigate("/");

        // 로그인 상태 변경 이벤트 발생
        const event = new Event("loginStatusChanged");
        window.dispatchEvent(event);
      }
    } catch (error) {
      console.error(error);
      setErrorMessage("이메일이나 암호가 틀렸습니다.");
    }
  };

  const sleep = () => {
    return new Promise((resolve) => {
      setTimeout(() => resolve(), 1000);
    });
  };

  const { values, errors, isLoading, handleChange, handleSubmit } = useForm({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: async () => {
      // await sleep();
      // await handleLogin();

      const body = new LoginDto(values);

      instance.post("/members/login", body).then((r) => {
        const res = new ResDto(r.data);
        console.log(res);
        const { error } = res;

        if (error !== null) {
          alert(error.message);
          return;
        }

        localStorage.setItem("token", r.headers.authorization);
        alert("로그인 되었습니다.");
        navigate("/");
      });
    },
    validate: ({ email, password }) => {
      const newErrors = {};
      const emailRegex =
        /([\w-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;

      if (!email) newErrors.email = "이메일을 입력해주세요.";
      else if (!emailRegex.test(email))
        newErrors.email = "이메일 형식이 틀렸습니다. 다시 한번 확인해주세요.";

      if (!password) newErrors.password = "비밀번호를 입력해주세요.";

      return newErrors;
    },
  });

  console.log(values, errors);

  return (
    <div className="outBox">
      <div>
        <Link to="/">
          <img
            className="logoText"
            src={"logoKakaoText.png"}
            width={120}
            alt="logoKakaoText.png"
          />
        </Link>

        <Container maxWidth="sm" className={classes.container} component="main">
          {/* 변경된 코드 */}
          <Typography variant="h4" component="h1" gutterBottom>
            로그인
          </Typography>
          <Box component="form" className={classes.form} onSubmit={handleLogin}>
            <TextField
                label="이메일"
                type="email"
                variant="outlined"
                margin="normal"
                fullWidth
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
                label="비밀번호"
                type="password"
                variant="outlined"
                margin="normal"
                fullWidth
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            {errorMessage && (
                <Typography variant="body1" color="error" paragraph>
                  {errorMessage}
                </Typography>
            )}
            <Button
                type="submit"
                variant="contained"
                color="primary"
                size="large"
                fullWidth
            >
              로그인
            </Button>

            {/*<Link href="/joinform" passHref>*/}
            {/*  <Button color="inherit">회원가입</Button>*/}
            {/*</Link>*/}

              <Link
                to="/signup"
                className="login-signup"
                style={{ textDecoration: "none" }}
              >
                {" "}
                회원가입{" "}
              </Link>


            <Link href="/findpassword" passHref>
              <Button color="inherit">암호를 잊었어요.</Button>
            </Link>
          </Box>
        </Container>


        {/*<div className="inBox">*/}
        {/*  <Form onSubmit={handleLogin}>*/}
        {/*    <Form.Group className="mb-3" controlId="formGroupEmail">*/}
        {/*      <Form.Control*/}
        {/*        type="email"*/}
        {/*        name="email"*/}
        {/*        placeholder="이메일"*/}
        {/*        onChange={handleChange}*/}
        {/*      />*/}
        {/*      {errors.email && <ErrorText>{errors.email}</ErrorText>}*/}
        {/*    </Form.Group>*/}

        {/*    <Form.Control*/}
        {/*      type="password"*/}
        {/*      name="password"*/}
        {/*      placeholder="비밀번호"*/}
        {/*      onChange={handleChange}*/}
        {/*    />*/}
        {/*    {errors.password && <ErrorText>{errors.password}</ErrorText>}*/}

        {/*    <Button*/}
        {/*      className="form-btn"*/}
        {/*      style={{*/}
        {/*        backgroundColor: "#FEE500",*/}
        {/*        color: "black",*/}
        {/*        border: "none",*/}
        {/*      }}*/}
        {/*      type="submit"*/}
        {/*      disabled={isLoading}*/}
        {/*    >*/}
        {/*      로그인*/}
        {/*    </Button>*/}
        {/*  </Form>*/}

        {/*  <Link*/}
        {/*    to="/signup"*/}
        {/*    className="login-signup"*/}
        {/*    style={{ textDecoration: "none" }}*/}
        {/*  >*/}
        {/*    {" "}*/}
        {/*    회원가입{" "}*/}
        {/*  </Link>*/}
        {/*</div>*/}
        <SimpleFooter />
      </div>
    </div>
  );
}

export default Login;
