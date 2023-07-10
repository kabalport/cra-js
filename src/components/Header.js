import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import "../styles/Header.css";
import useLogout from "../hooks/useLogout"; // Import useAuth

import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
function Header() {
  // const [isLogin, setIsLogin] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // 로그인 상태 추가
  const {
    logoutDialogOpen,
    handleLogoutDialogOpen,
    handleLogoutDialogClose,
    handleLogout,
  } = useLogout(); // 커스텀 훅 사용

  useEffect(() => {
    const handleLoginStatusChange = () => {
      const loginInfo = localStorage.getItem("loginInfo");
      if (loginInfo) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    };

    // 컴포넌트 마운트 시 초기 로그인 상태 확인
    handleLoginStatusChange();

    window.addEventListener("loginStatusChanged", handleLoginStatusChange);

    return () => {
      window.removeEventListener("loginStatusChanged", handleLoginStatusChange);
    };
  }, []);

  // useEffect(() => {
  //   if (localStorage.getItem("token") != null) setIsLogin(true);
  //
  //   console.log(isLogin);
  // }, [isLogin]);

  // const handleLogout = () => {
  //   localStorage.removeItem("token");
  //   alert("정상적으로 로그아웃되었습니다.");
  // };

  return (

      <AppBar position="static">
        <Toolbar>
          <Link href="/" passHref>
            <Typography
                variant="h6"
                style={{ textDecoration: "none", color: "inherit" }}
            >
              <img src="https://via.placeholder.com/30" alt="logo" width="30" />{" "}
              TEST
            </Typography>
          </Link>



          <div style={{ flexGrow: 1 }} />

          <Link
              to="/products"
              style={{ textDecoration: "none", color: "inherit" }}
          >
            {" "}
            상품목록{" "}
          </Link>



          <Link
              to="/my-page"
              style={{ display: isLoggedIn ? "block" : "none",textDecoration: "none", color: "inherit" }}
          >
            {" "}
            MyPage{" "}
          </Link>


          <Link
                           to="/login"
                           style={{ display: isLoggedIn ? "none" : "block",textDecoration: "none", color: "inherit" }}
                         >
                           {" "}
               로그인{" "}
          </Link>

          <Button
              color="inherit"
              style={{ display: isLoggedIn ? "block" : "none",textDecoration: "none", color: "inherit" }}
              onClick={handleLogoutDialogOpen}
          >
            로그아웃
          </Button>

          <Dialog
              open={logoutDialogOpen}
              onClose={handleLogoutDialogClose}
              aria-labelledby="logout-dialog-title"
              aria-describedby="logout-dialog-description"
          >
            <DialogTitle id="logout-dialog-title">로그아웃</DialogTitle>
            <DialogContent>
              <DialogContentText id="logout-dialog-description">
                로그아웃하시겠습니까?
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleLogoutDialogClose} color="primary">
                취소
              </Button>
              <Button onClick={handleLogout} color="primary" autoFocus>
                확인
              </Button>
            </DialogActions>
          </Dialog>
        </Toolbar>
      </AppBar>

    // <header className="header">
    //   <div className="contents">
    //     <Link to="/">
    //       <img src={"/logoKakao.png"} alt="logoKakao.png" height={30} />
    //     </Link>
    //     <nav>
    //       <div className="navigation">
    //         <span>
    //           <Link to="/cart">
    //             <img src={"/cart.png"} alt="cart.png" height={30} />
    //           </Link>
    //         </span>
    //         <span>|</span>
    //         <span>
    //           {isLogin ? (
    //             <Link
    //               to="/login"
    //               onClick={handleLogout}
    //               style={{ textDecoration: "none", color: "black" }}
    //             >
    //               {" "}
    //               로그아웃{" "}
    //             </Link>
    //           ) : (
    //             <Link
    //               to="/login"
    //               style={{ textDecoration: "none", color: "black" }}
    //             >
    //               {" "}
    //               로그인{" "}
    //             </Link>
    //           )}
    //         </span>
    //       </div>
    //     </nav>
    //   </div>
    // </header>
  );
}

export default Header;
