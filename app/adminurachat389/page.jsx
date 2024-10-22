"use client";
import { useState, useEffect } from 'react';
import { useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { auth } from '@/app/Shared/firebaseConfig';
import { useRouter } from 'next/navigation';
import { Button, Input } from "@nextui-org/react";
import { IoIosEye, IoIosEyeOff } from "react-icons/io";
import { useSession, signIn } from "next-auth/react";

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isVisible, setIsVisible] = useState(false);
  const [signInWithEmailAndPassword] = useSignInWithEmailAndPassword(auth);
  const router = useRouter();
  const { data: session, status } = useSession();

  const toggleVisibility = () => setIsVisible(!isVisible);

  const handleSignIn = async (e) => {
    e.preventDefault();
    try {
      const res = await signInWithEmailAndPassword(email, password);
      console.log({ res });
      sessionStorage.setItem('user', true);
      setEmail('');
      setPassword('');
      router.push('/adminurachat389/Dashboard');
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    // Only redirect if we're certain about the authentication status
    if (status === "unauthenticated") {
      router.push("/api/auth/signin");
      return;
    }

    if (status === "authenticated") {
      // Check both session existence and admin role
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

  // Show loading state while checking authentication
  if (status === "loading") {
    return (
      <div className="flex min-h-full items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  // Only render the form if user is authenticated and is admin
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
              onChange={(e) => setEmail(e.target.value)}
              className="max-w-xs text-white pb-4"
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
              onChange={(e) => setPassword(e.target.value)}
              className="max-w-xs text-white pb-4"
            />

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