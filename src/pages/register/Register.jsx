import React, { useState } from "react";
import "./Register.css";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { BsEnvelopeFill } from "react-icons/bs";
import { FaUserAlt, FaUserCircle, FaRegEyeSlash, FaRegEye } from "react-icons/fa";
import { MdPassword, MdVpnKey } from "react-icons/md";
import Lottieanimation from "../../components/Lottieanimation";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
  sendEmailVerification,
} from "firebase/auth";
export const Register = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    firebase: "", // For Firebase-related errors
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false); // New loading state
  const navigate = useNavigate();

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "",
      verificationEmailSent: "", // Clear verification email message on input change
    }));
  };

  const validateFirstName = (firstName) => {
    if (!firstName.trim()) {
      return "Please fill out this field.";
    } else if (firstName.length < 4) {
      return "First name should be at least 4 characters long.";
    }
    return "";
  };

  const validateLastName = (lastName) => {
    if (!lastName.trim()) {
      return "Please fill out this field.";
    } else if (lastName.length < 4) {
      return "Last name should be at least 4 characters long.";
    }
    return "";
  };

  const validateEmail = (email) => {
    if (!email.trim()) {
      return "Please fill out this field.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return "Invalid email address.";
    }
    return "";
  };

  const validatePassword = (password, confirmPassword) => {
    if (!password.trim()) {
      return "Please fill out this field.";
    } else if (password.length < 8) {
      return "Password should be at least 8 characters long.";
    } else if (password !== confirmPassword) {
      return "Passwords do not match.";
    } else if (!/[A-Z]/.test(password)) {
      return "Password should contain at least one uppercase letter.";
    } else if (!/[a-z]/.test(password)) {
      return "Password should contain at least one lowercase letter.";
    } else if (!/\d/.test(password)) {
      return "Password should contain at least one digit.";
    } else if (!/[!@#$%^&*]/.test(password)) {
      return "Password should contain at least one special character (!@#$%^&*).";
    }
    return "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { firstName, lastName, email, password, confirmPassword } = formData;
    const newErrors = {
      firstName: validateFirstName(firstName),
      lastName: validateLastName(lastName),
      email: validateEmail(email),
      password: validatePassword(password, confirmPassword),
      confirmPassword: password !== confirmPassword ? "Passwords do not match." : "", // Redundant check, but clear
      firebase: "",
    };

    setErrors(newErrors);

    if (Object.values(newErrors).every((error) => !error)) {
      setIsSubmitting(true); // Set loading state to true
      const auth = getAuth();
      try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        await updateProfile(userCredential.user, {
          displayName: `${firstName} ${lastName}`,
        });
        await sendEmailVerification(auth.currentUser);
        setIsSubmitting(false); // Set loading state to false on success
        navigate("/confirm-mail");
      } catch (error) {
        console.error("Firebase Registration Error:", error);
        let firebaseErrorMessage = "Registration failed. Please try again.";
        if (error.code === "auth/email-already-in-use") {
          firebaseErrorMessage = "This email address is already in use.";
        } else if (error.code === "auth/weak-password") {
          firebaseErrorMessage = "Password is too weak. Please try a stronger password.";
        }
        setErrors((prevErrors) => ({ ...prevErrors, firebase: firebaseErrorMessage }));
        setIsSubmitting(false); // Set loading state to false on error
      }
    }
  };

  return (
    <>
      <div className='reg_container'>
        <div className='bg2'>
          <div className='logo flex justify-center flex-col  w-full items-center py-8'>
            <h1 className='text-4xl capitalize font-bold text-white text-left'>Register!</h1>
            <h4 className='text-slate-300 text-xs text-left'>
              Create a new account to get started.
            </h4>
          </div>

          <div className='reg_box'>
            <div className='err'>{errors.firebase} </div> {/* Display Firebase errors here */}
            <form onSubmit={handleSubmit}>
              {" "}
              {/* Use onSubmit for form submission */}
              <label htmlFor='firstName' className='animate__animated animate__fadeInLeft'>
                <h4>FirstName</h4>
                <div className='inputs'>
                  <input
                    type='text'
                    name='firstName'
                    value={formData.firstName}
                    onChange={handleChange}
                    className='input-w'
                    required
                  />
                  <div className='icon'>
                    <FaUserAlt className='icond' />
                  </div>
                </div>
                <div className='err'>{errors.firstName} </div>
              </label>
              <label htmlFor='lastName' className='animate__animated animate__fadeInLeft'>
                <h4>LastName</h4>
                <div className='inputs'>
                  <input
                    type='text'
                    name='lastName'
                    value={formData.lastName}
                    onChange={handleChange}
                    className='input-w'
                    required
                  />
                  <div className='icon'>
                    <FaUserCircle className='icond' />
                  </div>
                </div>
                <div className='err'>{errors.lastName} </div>
              </label>
              <label htmlFor='email' className='animate__animated animate__fadeInLeft'>
                <h4>Email</h4>
                <div className='inputs'>
                  <input
                    type='email'
                    name='email'
                    value={formData.email}
                    onChange={handleChange}
                    className='input-w'
                    required
                  />
                  <div className='icon'>
                    <BsEnvelopeFill className='icond' />
                  </div>
                </div>
                <div className='err'>{errors.email} </div>
              </label>
              <div className='pass-inputs'>
                <label htmlFor='password' className='animate__animated animate__fadeInLeft'>
                  <h4>Password</h4>
                  <div className='inputs relative'>
                    <input
                      type={showPassword ? "text" : "password"}
                      name='password'
                      value={formData.password}
                      onChange={handleChange}
                      className='input-w'
                      required
                    />
                    <div className='icon'>
                      <MdVpnKey className='icond' />
                    </div>
                    <div className='icon2' onClick={togglePasswordVisibility}>
                      {showPassword ? (
                        <FaRegEye className='icond' />
                      ) : (
                        <FaRegEyeSlash className='icond' />
                      )}
                    </div>
                  </div>
                  <div className='err'>{errors.password} </div>
                </label>
              </div>
              <div className='pass-inputs'>
                <label htmlFor='confirmPassword' className='animate__animated animate__fadeInLeft'>
                  <h4>Confirm password</h4>
                  <div className='inputs'>
                    <input
                      type='password'
                      name='confirmPassword'
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      className='input-w'
                      required
                    />
                    <div className='icon'>
                      <MdPassword className='icond' />
                    </div>
                  </div>
                  <div className='err'>{errors.confirmPassword} </div>
                </label>
              </div>
              <button type='submit' className='btn-primary btn1' disabled={isSubmitting}>
                {isSubmitting ? "Signing up..." : "Register"}
              </button>
            </form>
            <div className='register animate__animated animate__fadeInUp'>
              <h5>
                Already have an account?
                <Link to='/' className='ck_reg'>
                  Login
                </Link>
              </h5>
            </div>
          </div>
          <Outlet />
        </div>
        <div className='illustrator2'>
          <div className='f-design'>
            <Lottieanimation />
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
