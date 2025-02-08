"use client";
import { useState, useEffect } from 'react';
import { useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { auth } from '@/app/Shared/firebaseConfig';
import { useRouter } from 'next/navigation';
import { Button, Input } from "@heroui/react";
import { IoIosEye, IoIosEyeOff } from "react-icons/io";
import { useSession } from "next-auth/react";
const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isVisible, setIsVisible] = useState(false);
  const [errors, setErrors] = useState({ email: '', password: '' });
  const [signInWithEmailAndPassword] = useSignInWithEmailAndPassword(auth);
  const router = useRouter();
  const { data: session, status } = useSession();
  const toggleVisibility = () => setIsVisible(!isVisible);
  // Validation functions
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      return 'อีเมลจำเป็นต้องระบุ';
    }
    if (!emailRegex.test(email)) {
      return 'รูปแบบอีเมลไม่ถูกต้อง';
    }
    return '';
  };
  const validatePassword = (password) => {
    if (!password) {
      return 'รหัสผ่านจำเป็นต้องระบุ';
    }
    if (password.length < 6) {
      return 'รหัสผ่านต้องมีความยาวอย่างน้อย 6 ตัวอักษร';
    }
    return '';
  };
  // Handle input changes with validation
  const handleEmailChange = (e) => {
    const newEmail = e.target.value;
    setEmail(newEmail);
    setErrors(prev => ({
      ...prev,
      email: validateEmail(newEmail)
    }));
  };
  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    setErrors(prev => ({
      ...prev,
      password: validatePassword(newPassword)
    }));
  };
  const handleSignIn = async (e) => {
    e.preventDefault();
    // Validate all fields before submission
    const emailError = validateEmail(email);
    const passwordError = validatePassword(password);
    setErrors({
      email: emailError,
      password: passwordError
    });
    // If there are any errors, don't proceed with sign in
    if (emailError || passwordError) {
      return;
    }
    // Check against predefined credentials
    const validEmail = "admin@kkumail.com";
    
    try {
      // First check if email matches
      if (email !== validEmail) {
        setErrors(prev => ({
          ...prev,
          email: 'อีเมลไม่ถูกต้อง',
          general: 'อีเมลหรือรหัสผ่านไม่ถูกต้อง'
        }));
        return;
      }
      // If email matches, proceed with Firebase authentication
      const res = await signInWithEmailAndPassword(email, password);
      
      if (res) {
        console.log({ res });
        sessionStorage.setItem('user', true);
        setEmail('');
        setPassword('');
        router.push('/admin/dashboard');
      } else {
        setErrors(prev => ({
          ...prev,
          password: 'รหัสผ่านไม่ถูกต้อง',
          general: 'อีเมลหรือรหัสผ่านไม่ถูกต้อง'
        }));
      }
    } catch (e) {
      console.error(e);
      setErrors(prev => ({
        ...prev,
        general: 'อีเมลหรือรหัสผ่านไม่ถูกต้อง'
      }));
    }
  };
  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/api/auth/signin");
      return;
    }
    if (status === "authenticated") {
      if (!session?.user?.role) {
        console.error("No role found in session");
        router.push("/unauthorized");
        return;
      }
      if (session.user.role !== "admin") {
        console.error("User is not an admin");
        router.push("/unauthorized");
        return;
      }
    }
  }, [session, status, router]);
  if (status === "loading") {
    return (
      <div className="flex min-h-full items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }
  if (session?.user?.role === "admin") {
    return (
      <div className="flex min-h-full bg-background items-center justify-center mt-32 p-4">
        <div className="w-full max-w-sm gap-4 rounded-large px-8 pb-10 pt-9 bg-gray-100 drop-shadow-md">
          <form className="flex flex-col gap-4" onSubmit={handleSignIn}>
            <p className="pb-4 text-left text-3xl font-semibold">
              Sign In
              <span aria-label="emoji" className="ml-2" role="img">👋</span>
            </p>
            
            <Input
              type="email"
              label="Email"
              variant="underlined"
              placeholder="Enter your email"
              value={email}
              onChange={handleEmailChange}
              className="max-w-xs text-white pb-4"
              errorMessage={errors.email}
              isInvalid={!!errors.email}
            />
            <Input
              label="Password"
              variant="underlined"
              placeholder="Enter your password"
              endContent={
                <button
                  className="focus:outline-none"
                  type="button"
                  onClick={toggleVisibility}
                  aria-label="toggle password visibility"
                >
                  {isVisible ? (
                    <IoIosEyeOff className="text-2xl text-default-400 pointer-events-none" />
                  ) : (
                    <IoIosEye className="text-2xl text-default-400 pointer-events-none" />
                  )}
                </button>
              }
              type={isVisible ? "text" : "password"}
              value={password}
              onChange={handlePasswordChange}
              className="max-w-xs text-white pb-4"
              errorMessage={errors.password}
              isInvalid={!!errors.password}
            />
            {errors.general && (
              <p className="text-red-500 text-sm mt-2">{errors.general}</p>
            )}
            <Button color="primary" type="submit">
              Sign In
            </Button>
          </form>
        </div>
      </div>
    );
  }
  return null;
};
export default SignIn;