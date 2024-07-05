"use client";

import React from "react";
import Image from "next/image";
import chat from "@/public/des.png";
import { FlipWords } from "@/components/ui/flip-words";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";

const Hero = () => {
    const route = useRouter();

    return (
        <div className='flex py-12 px-6 lg:px-8 z-10 justify-between'>
            <div className='dark:text-white text-black'>
                <h1 className='text-7xl font-bold leading-tight'>
                    Chat
                </h1>
                <h2 className='my-6 text-2xl leading-relaxed'>
                    Chat, Call, and Video Call your<br />
                    <FlipWords words={["Friends", "Family"]} /> from wherever you are.
                </h2>
                <div className='relative mt-8 p-8'>
                    <Button
                        className='relative gap-2 text-xl rounded-full bg-white text-blue-600 hover:bg-blue-600 hover:text-white transition-all duration-300'
                        onClick={() => route.push("/login")}
                    >
                        Login
                    </Button>
                </div>
            </div>
            <div className='hidden lg:block' style={{ marginRight: "10px" }}>
                <Image
                    src={chat}
                    alt='chat image'
                    width={800}
                    height={800}
                    className='-rotate-[5.5deg] transition-transform duration-500 ease-in-out transform hover:rotate-0'
                />
            </div>
        </div>
    );
};

export default Hero;
