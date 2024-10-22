"use client";
import React, { useState } from "react";
import { Button, Input } from "@nextui-org/react";
import { IoIosEye, IoIosEyeOff } from "react-icons/io";
import { useRouter } from 'next/navigation';
import { useSession } from "next-auth/react";

export default function App() {
    const [isVisible, setIsVisible] = useState(false);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter();
    const { data: session } = useSession();

    const toggleVisibility = () => setIsVisible(!isVisible);

    const handleLogin = (e) => {
        e.preventDefault();

        const correctUsername = "admin389";
        const correctPassword = "admin389";
        const correctEmail = "arnuphap.t@kkumail.com";

        if (username === correctUsername && password === correctPassword && (session ? session.user.email : "") === correctEmail) {
            router.push('/adminurachat389/Dashboard');
        } else {
            alert("Incorrect username, password, or email.");
        }
    };

    return (
        <div className="flex min-h-full bg-background items-center justify-center mt-32 p-4 ">
            <div className="w-full max-w-sm gap-4 rounded-large px-8 pb-10 pt-9 bg-gray-100 drop-shadow-md">
                <form className="flex flex-col gap-4" onSubmit={handleLogin}>
                    <p className="pb-4 text-left text-3xl font-semibold">
                        ADMIN LOGIN
                        <span aria-label="emoji" className="ml-2" role="img">👋</span>
                    </p>
                    <Input
                        isDisabled
                        type="email"
                        label="Email"
                        variant="underlined"
                        placeholder={session ? session.user.email : ""}
                        defaultValue={session ? session.user.email : ""}
                        onClear={() => console.log("input cleared")}
                        className="max-w-xs text-white pb-4"
                    />
                    <Input
                        label="Username"
                        variant="underlined"
                        placeholder="Enter your Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
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
                        Login
                    </Button>
                </form>
            </div>
        </div>
    );
}
