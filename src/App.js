import { useState, useEffect } from 'react';
// Router
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// components
import Header from './components/Header'
import Footer from './components/Footer'
import { Outlet } from 'react-router-dom';
import MainLayout from './routes/MainLayout';

// routes
import Main from './routes/Main'
import Login from './routes/Login'
import SignUp from './routes/SignUpForm'
import Detail from './routes/Detail'
import Cart from './routes/Cart'
import Order from './routes/Order'
import Result from './routes/Result'
import NotFound from './routes/NotFound'

// CSS
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import { useNavigate } from "react-router-dom";
import { createTheme } from "@mui/material/styles";
import myAxios from "./utils/myaxios";
import MyPage from "./routes/mypage";
import Products from "./routes/products";
// 추가된 코드


const theme = createTheme({
  typography: {
    fontFamily: "Roboto, sans-serif",
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: `
        html, body, #__next {
          height: 100%;
        }
      `,
    },
  },
});

function App() {

  useEffect(() => {
    const refreshTokenInterval = setInterval(async () => {
      const loginInfo = JSON.parse(localStorage.getItem("loginInfo"));

      console.log(loginInfo);
      if (loginInfo) {
        const { accessToken, refreshToken } = loginInfo; // 수정된 코드

        try {
          const response = await myAxios.post(
              "/members/refreshToken",
              { refreshToken }, // refreshToken을 별도의 객체로 보냅니다.
              {
                headers: {
                  Authorization: `Bearer ${accessToken}`,
                },
              }
          );

          const loginInfo = response.data;
          localStorage.setItem("loginInfo", JSON.stringify(loginInfo));
        } catch (error) {
          console.error(error);

          // 오류가 발생하면 local storage를 삭제하고 홈 페이지로 이동
          // 수정된 코드
          localStorage.removeItem("loginInfo");
          window.dispatchEvent(new CustomEvent("loginStatusChanged"));
          window.location.href = "/";
          // Router.push("/");
          // navigate("/");
        }
      }
    }, 10 * 1000); // 10분마다 실행

    // 컴포넌트가 언마운트 될 때 인터벌을 정리
    return () => {
      clearInterval(refreshTokenInterval);
    };
  }, []);

  return (

      <div className="layout">
        <BrowserRouter>
          <Routes>
            {/* 단독 레이아웃 */}
            <Route path="/login" element={<Login />}></Route>
            <Route path="/signup" element={<SignUp />}></Route>
            <Route path="/my-page" element={<MyPage />}></Route>
            <Route path="/products" element={<Products />}></Route>


            {/* Header, Footer 레이아웃 */}
            <Route element={<MainLayout />}>
              <Route path="/" element={<Main />}></Route>
              <Route path="/product/:productId" element={<Detail />}></Route>
              <Route path="/cart" element={<Cart />}></Route>
              <Route path="/order" element={<Order />}></Route>
              <Route path="/result/:orderId" element={<Result />}></Route>

              {/* 위 라우트 경로 중 일치하는 라우트가 없다면 아래 라우트 출력 */}
              <Route path="*" element={<NotFound />}></Route>
            </Route>
          </Routes>
        </BrowserRouter>
      </div>
  );
}

export default App;
