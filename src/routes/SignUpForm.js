import useForm from "../hooks/useForm";
import ErrorText from "../components/ErrorText";
import SimpleFooter from "../components/SimpleFooter";
import { Link } from "react-router-dom";

import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { makeStyles } from "@mui/styles";
import axios from "axios";



import Form from "react-bootstrap/Form";
// import Button from "react-bootstrap/Button";
import "../styles/form.css";

import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";

import { instance } from "../api";


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
}));

function SignUpForm({ onSubmit, onClick }) {
  const classes = useStyles();

  // 상태 설정 추가
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [gender, setGender] = useState("");

  const handleChange = (event) => {
    setGender(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const [birthYear, birthMonth, birthDay] = birthDate.split("-");

    const memberSignupDto = {
      email,
      password,
      name,
      birthYear,
      birthMonth,
      birthDay,
      gender,
    };

    try {
      const response = await axios.post(
          "http://localhost:8080/members/signup",
          memberSignupDto
      );
      if (response.status === 200 || response.status == 201) {
        // router.push("/welcome");
                  navigate("/welcome");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const navigate = useNavigate();
  const [emailCheck, setEmailCheck] = useState(false);

  // const sleep = () => {
  //   return new Promise((resolve) => {
  //     setTimeout(() => resolve(), 1000);
  //   });
  // };
  // const { values, errors, isLoading, handleChange, handleCheck, handleSubmit } =
  //   useForm({
  //     initialValues: {
  //       email: "",
  //       username: "",
  //       password: "",
  //       passwordConfirm: "",
  //     },
  //     onSubmit: async () => {
  //       await sleep();
  //
  //       let body = {
  //         email: values.email,
  //         password: values.password,
  //         username: values.username,
  //       };
  //
  //       instance.post("/join", body).then((res) => {
  //         if (res.data.success) {
  //           alert("회원가입이 완료되었습니다.");
  //           navigate("/login");
  //         } else {
  //           alert(res.data.error.message);
  //         }
  //       });
  //     },
  //     onClick: async () => {
  //       const body = {
  //         email: values.email,
  //       };
  //
  //       instance.post("/check", body).then((res) => {
  //         if (res.data.success) {
  //           alert("사용 가능한 이메일입니다.");
  //           setEmailCheck(true);
  //         } else {
  //           alert(res.data.error.message);
  //           setEmailCheck(false);
  //         }
  //       });
  //     },
  //     setEmailCheck,
  //     validate: ({ email, username, password, passwordConfirm }) => {
  //       const newErrors = {};
  //       const emailRegex =
  //         /([\w-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
  //
  //       if (!email) newErrors.email = "이메일을 입력해주세요.";
  //       else if (!emailRegex.test(email))
  //         newErrors.email = "이메일 형식이 틀렸습니다. 다시 한번 확인해주세요.";
  //       else if (emailCheck == false)
  //         newErrors.email = "이메일 중복 확인을 해주세요.";
  //
  //       if (!username) newErrors.username = "이름을 입력해주세요.";
  //       if (!password) newErrors.password = "비밀번호를 입력해주세요.";
  //       if (password !== passwordConfirm)
  //         newErrors.passwordConfirm = "비밀번호가 일치하지 않습니다.";
  //       return newErrors;
  //     },
  //   });
  //
  // console.log(values, errors);

  return (
      <Container maxWidth="sm" className={classes.container} component="main">
        <Typography variant="h4" component="h1" gutterBottom>
          회원가입
        </Typography>
        <Box component="form" className={classes.form} onSubmit={handleSubmit}>
          <TextField
              label="회원이름"
              type="text"
              variant="outlined"
              margin="normal"
              fullWidth
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
          />
          <TextField
              label="이메일"
              type="email"
              variant="outlined"
              margin="normal"
              fullWidth
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
              label="암호"
              type="password"
              variant="outlined"
              margin="normal"
              fullWidth
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
          />
          <TextField
              label="생년월일"
              type="date"
              variant="outlined"
              margin="normal"
              fullWidth
              InputLabelProps={{
                shrink: true,
              }}
              required
              value={birthDate}
              onChange={(e) => setBirthDate(e.target.value)}
          />

          <FormControl fullWidth variant="outlined" margin="normal" required>
            <InputLabel>성별</InputLabel>
            <Select value={gender} onChange={handleChange} label="성별">
              <MenuItem value="M">남성</MenuItem>
              <MenuItem value="F">여성</MenuItem>
            </Select>
          </FormControl>
          <Button
              type="submit"
              variant="contained"
              color="primary"
              size="large"
              fullWidth
          >
            회원가입
          </Button>
        </Box>
      </Container>
    // <div className="outBox">
    //   <div>
    //     <Link to="/">
    //       <img
    //         className="logoText"
    //         src={"logoKakaoText.png"}
    //         alt="logoKakaoText.png"
    //         width={120}
    //       />
    //     </Link>
    //
    //     <div className="inBox">
    //       <Form onSubmit={handleSubmit}>
    //         <Form.Group className="mb-3" controlId="formGroupEmail">
    //           <label className="form-label"> 이메일 (아이디) </label>
    //           <Form.Control
    //             type="email"
    //             name="email"
    //             placeholder="이메일"
    //             onChange={handleChange}
    //           />
    //           <Button
    //             className="form-btn-email-check"
    //             variant="outline-secondary"
    //             onClick={handleCheck}
    //           >
    //             {" "}
    //             이메일 중복 확인
    //           </Button>
    //           {errors.email && <ErrorText>{errors.email}</ErrorText>}
    //         </Form.Group>
    //
    //         <label className="form-label"> 이름 </label>
    //         <Form.Control
    //           type="text"
    //           name="username"
    //           placeholder="이름"
    //           onChange={handleChange}
    //         />
    //         {errors.username && <ErrorText>{errors.username}</ErrorText>}
    //
    //         <label className="form-label"> 비밀번호 </label>
    //         <Form.Control
    //           type="password"
    //           name="password"
    //           placeholder="비밀번호"
    //           onChange={handleChange}
    //         />
    //         {errors.password && <ErrorText>{errors.password}</ErrorText>}
    //
    //         <label className="form-label"> 비밀번호 확인 </label>
    //         <Form.Control
    //           type="password"
    //           name="passwordConfirm"
    //           placeholder="비밀번호 확인"
    //           onChange={handleChange}
    //         />
    //         {errors.passwordConfirm && (
    //           <ErrorText>{errors.passwordConfirm}</ErrorText>
    //         )}
    //
    //         <Button
    //           className="form-btn"
    //           style={{
    //             backgroundColor: "#FEE500",
    //             color: "black",
    //             border: "none",
    //           }}
    //           type="submit"
    //           disabled={isLoading}
    //         >
    //           회원가입
    //         </Button>
    //       </Form>
    //     </div>
    //     <SimpleFooter />
    //   </div>
    // </div>
  );
}

export default SignUpForm;
