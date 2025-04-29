import React, { useState, useEffect } from "react";
import "./Emailconfirm.css";
import { useNavigate } from "react-router-dom";
import Lottieanimation from "../../components/Lottieanimation";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { AiFillCheckCircle } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

const RESEND_DELAY_SECONDS = 60; // Define the cooldown period in seconds

const Emailconfirm = () => {
  const [user, setUser] = useState(null);
  const [verificationStatus, setVerificationStatus] = useState("checking");
  const [resendStatus, setResendStatus] = useState("");
  const [isResending, setIsResending] = useState(false);
  const [resendTimer, setResendTimer] = useState(RESEND_DELAY_SECONDS);
  const [canResend, setCanResend] = useState(false);
  const navigate = useNavigate();
  const auth = getAuth();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (currentUser && currentUser.emailVerified) {
        setVerificationStatus("verified");
        navigate("/dashboard");
      } else if (currentUser) {
        setVerificationStatus("sent");
        // Start the resend timer when the component mounts and user is not verified
        startResendTimer();
      } else {
        setVerificationStatus("failed");
        // navigate("/");
      }
    });
    return () => unsubscribe();
  }, [auth, navigate]);

  useEffect(() => {
    let intervalId;
    if (!canResend && resendTimer > 0) {
      intervalId = setInterval(() => {
        setResendTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    } else if (resendTimer === 0) {
      setCanResend(true);
      clearInterval(intervalId);
    }
    return () => clearInterval(intervalId); // Cleanup the interval
  }, [canResend, resendTimer]);

  const startResendTimer = () => {
    setCanResend(false);
    setResendTimer(RESEND_DELAY_SECONDS);
  };

  // const handleRouting = () => {
  //   if (user && user.emailVerified) {
  //     navigate("/dashboard");
  //   } else {
  //     setResendStatus("Please verify your email first.");
  //   }
  // }

  const handleResendVerification = async () => {
    if (user && !user.emailVerified && canResend) {
      setIsResending(true);
      setResendStatus("");
      try {
        await auth.currentUser.sendEmailVerification();
        setResendStatus("Verification email resent! Please check your inbox (and spam folder).");
        startResendTimer(); // Restart the timer after a successful resend
      } catch (error) {
        console.error("Error resending verification:", error);
        setResendStatus("Failed to resend email. Please try again later.");
        // Optionally provide more specific error messages
      } finally {
        setIsResending(false);
      }
    } else if (user && user.emailVerified) {
      setResendStatus("Your email is already verified.");
      navigate("/");
    } else if (!canResend) {
      setResendStatus(`Please wait ${resendTimer} seconds before resending.`);
    } else {
      setResendStatus("No user signed in. Please log in.");
      // navigate("/");
    }
  };

  if (verificationStatus === "checking") {
    return <div className='confirm_container'>{/* ... checking UI ... */}</div>;
  }

  if (verificationStatus === "verified") {
    return <div className='confirm_container'>{/* ... verified UI ... */}</div>;
  }

  return (
    <div className='confirm_container'>
      <div className='back'>
        <div className='logo'>{/* Your logo */}</div>

        <div className='check-icons'>
          <AiFillCheckCircle className='inn-icons' />
        </div>

        <div className='e_message'>
          <p className='inn-message'>
            A verification email has been sent to: <br />
            <strong>{user?.email}</strong> <br />
            Please check your email (including spam/junk folders) and click the verification link to
            continue.
          </p>
          {resendStatus && <p className='info-message'>{resendStatus}</p>}
        </div>

        <div className='Button'>
          <button className='btn-btn btn2' onClick={handleResendVerification}>
            Continue
          </button>
          <button
            className='btn-btn btn2'
            onClick={handleResendVerification}
            disabled={isResending || !canResend}
          >
            {isResending
              ? "Resending..."
              : canResend
              ? "Resend Verification Email"
              : `Resend in ${resendTimer}s`}
          </button>
        </div>
      </div>

      <div className='c_illustrator'>
        <div className='f-design'>
          <Lottieanimation />
        </div>
      </div>
    </div>
  );
};

export default Emailconfirm;
