import React, { useState } from "react";
import { Button, Snackbar } from "@mui/material";
import LoginForm from "./Login/LoginForm";
import SignupForm from "./Login/SignupForm";
import { useAppSelector } from "../Redux Toolkit/Store";

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);

  const auth = useAppSelector((state) => state.auth);


  return (
    <div className="min-h-screen bg-[#FFFCF7] flex items-center justify-center px-4 py-12">
      <div
        className="
          w-full max-w-xl
          bg-white/80 backdrop-blur-md
          border border-[#E3D4B6]
          rounded-3xl shadow-[0_18px_45px_rgba(0,0,0,0.10)]
          overflow-hidden
        "
      >
        <div className="p-6 md:p-8">
          {/* header */}
          <div className="text-center mb-6">
            <p className="text-xs tracking-[0.25em] uppercase text-[#B9935A]">
              Welcome to Swastik
            </p>
            <h1 className="text-2xl md:text-3xl font-semibold text-[#4A1F2A] mt-2">
              {isLogin ? "Customer Login" : "Create Customer Account"}
            </h1>
            <p className="text-sm text-[#7A6A58] mt-1">
              {isLogin
                ? "Login to your account to buy premium sarees"
                : "Sign up to start shopping exclusive Kosa & Tassar sarees"}
            </p>
          </div>

          {/* form */}
          {/* <div>{isLogin ? <LoginForm /> : <SignupForm />}</div> */}
          <div>
  {isLogin ? (
    <LoginForm switchToSignup={() => setIsLogin(false)} />
  ) : (
    <SignupForm switchToLogin={() => setIsLogin(true)} />
  )}
</div>

          {/* toggle */}
          <div className="mt-6 flex items-center justify-center gap-2">
            <p className="text-sm text-[#7A6A58]">
              {isLogin ? "New here?" : "Already have an account?"}
            </p>
            <Button
              onClick={() => setIsLogin(!isLogin)}
              sx={{
                textTransform: "none",
                fontWeight: 600,
                color: "#4A1F2A",
                "&:hover": { backgroundColor: "rgba(217,168,108,0.08)" },
                borderRadius: "999px",
              }}
            >
              {isLogin ? "Create Account" : "Login"}
            </Button>
          </div>
        </div>
      </div>

      <Snackbar
        open={auth.otpSent}
        autoHideDuration={6000}
        // onClose={handleClose}
        message="Otp sent successfully "
      />

    </div>
  );
};

export default Auth;
