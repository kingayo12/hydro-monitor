import React, { useState, useEffect } from "react";
import "./Login.css";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { FaRegEyeSlash, FaRegEye } from "react-icons/fa";
import Lottieanimation from "../../components/Lottieanimation";
import { BsEnvelopeFill } from "react-icons/bs";
import { MdPassword } from "react-icons/md";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../utils/firebase"; // Ensure the path to your Firebase config is correct

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const validateEmail = (email) => {
    const emailRegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim()) {
      setEmailError("Please fill out this field.");
      return false;
    } else if (!emailRegExp.test(email)) {
      setEmailError("Invalid email address.");
      return false;
    } else {
      setEmailError("");
      return true;
    }
  };

  const validatePassword = (password) => {
    if (!password.trim()) {
      setPasswordError("Please enter your password.");
      return false;
    } else if (password.length < 8) {
      setPasswordError("Password should be at least 8 characters long.");
      return false;
    } else {
      setPasswordError("");
      return true;
    }
  };

  useEffect(() => {
    const rememberMeValue = localStorage.getItem("rememberMe");
    if (rememberMeValue === "true") {
      setRememberMe(true);
      // Optionally, you could try to re-authenticate based on stored credentials
      // but this is generally not recommended for security reasons without proper handling.
    }
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();

    const isEmailValid = validateEmail(email);
    const isPasswordValid = validatePassword(password);

    if (!isEmailValid || !isPasswordValid) {
      return;
    }

    setIsLoading(true);
    setErrorMessage(""); // Clear any previous error messages

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      console.log("Login successful:", user);

      if (rememberMe) {
        localStorage.setItem("rememberMe", "true");
      } else {
        localStorage.removeItem("rememberMe");
      }

      navigate("/dashboard");
    } catch (error) {
      console.error("Login error:", error);
      switch (error.code) {
        case "auth/user-not-found":
          setErrorMessage("User not found. Please check your email.");
          break;
        case "auth/wrong-password":
          setErrorMessage("Incorrect password. Please try again.");
          break;
        case "auth/invalid-email":
          setErrorMessage("Invalid email address.");
          break;
        case "auth/user-disabled":
          setErrorMessage("This account has been disabled.");
          break;
        default:
          setErrorMessage(error.message || "Login failed");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className='login_container'>
        <div className='bg2'>
          <div className='logo flex justify-center flex-col w-full items-center py-8'>
            <h1 className='text-4xl capitalize font-bold text-white text-left'>Sign In!</h1>
            <h4 className='text-slate-300 text-xs text-left'>
              Access your account by logging in with your email and password.
            </h4>
          </div>
          <div className='login_box'>
            <div className='err'>{errorMessage}</div>
            <form onSubmit={handleLogin}>
              <label htmlFor='email' className='animate__animated animate__fadeInLeft'>
                <h4>Email</h4>
                <div className='inputs'>
                  <input
                    type='email'
                    id='email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className='input-w'
                    required
                  />
                  <div className='icon'>
                    <BsEnvelopeFill className='icond' />
                  </div>
                </div>
                <div className='err'>{emailError}</div>
              </label>
              <label htmlFor='password' className='animate__animated animate__fadeInLeft'>
                <h4>Password</h4>
                <div className='inputs relative'>
                  <input
                    type={showPassword ? "text" : "password"}
                    id='password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className='input-w'
                    required
                  />
                  <div className='icon'>
                    <MdPassword className='icond' />
                  </div>
                  <div className='icon2' onClick={togglePasswordVisibility}>
                    {showPassword ? (
                      <FaRegEye className='icond' />
                    ) : (
                      <FaRegEyeSlash className='icond' />
                    )}
                  </div>
                </div>
                <div className='err'>{passwordError}</div>
              </label>
              <label htmlFor='rememberMe' className='flex-check'>
                <div className='inputs'>
                  <input
                    type='checkbox'
                    id='rememberMe'
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                  />
                </div>
                <h4>Remember me</h4>
              </label>
              <button
                className='btn-primary2 btn1 animate__animated animate__fadeInUp'
                type='submit'
                disabled={isLoading}
              >
                {isLoading ? "Logging in..." : "Login"}
              </button>
            </form>
            <div className='register animate__animated animate__fadeInUp'>
              <h5>
                Don't have an account yet?
                <Link to='/Register' className='ck_reg'>
                  Register
                </Link>
              </h5>
            </div>
          </div>
        </div>
        <Outlet />
        <div className='illustrator'>
          <div className='f-design'>
            <Lottieanimation />
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
