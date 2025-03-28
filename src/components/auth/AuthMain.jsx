"use client"
import { Metadata } from "next"
import React,{useState} from "react"

import Image from "next/image"
import Link from "next/link"

import { cn } from "@/lib/utils"
import { buttonVariants } from "../ui/button"
import { UserAuthForm } from "./UserAuthForm"

// export const metadata: Metadata = {
//   title: "Authentication",
//   description: "Authentication forms built using the components.",
// }

export default function AuthMain() {
  const [currentState,setCurrentState]=useState("login");

  const handleChangeCurrentState=(state)=>{
    setCurrentState(state)
  }


  return (
    <div>
      <div className="md:hidden">
        <Image
          src="/examples/authentication-light.png"
          width={1280}
          height={843}
          alt="Authentication"
          className="block dark:hidden h-[100vh]"
        />
        <Image
          src="/examples/authentication-dark.png"
          width={1280}
          height={843}
          alt="Authentication"
          className="hidden dark:block"
        />
      </div>
      <div className="container relative hidden h-[100vh] flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
        <div
          // href="/examples/authentication"
       
          onClick={(()=>{
            handleChangeCurrentState( currentState==="login"? "signUp":currentState==="signUp"?"login":""
            )
          })
        }
          className={cn(
            buttonVariants({ variant: "ghost" }),
            "absolute right-4 top-4 md:right-8 md:top-8 cursor-pointer"
          )}
         
        >
          {currentState==="login"? "Sign up":currentState==="signUp"?"Login":"Back to login"}
        </div>
        <div className="relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex">
          <div className="absolute inset-0 bg-zinc-900" />
          <div className="relative z-20 flex items-center text-lg font-medium">
            {/* <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="mr-2 h-6 w-6"
            >
              <path d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3" />
            </svg>
            Acme Inc */}
          </div>
          <div className="relative z-20 mt-auto">
            <blockquote className="space-y-2">
              {/* <p className="text-lg">
                &ldquo;This library has saved me countless hours of work and
                helped me deliver stunning designs to my clients faster than
                ever before.&rdquo;
              </p> */}
              <footer className="text-sm">{""}</footer>
            </blockquote>
          </div>
        </div>
        <div className="lg:p-8">
          <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
            <div className="flex flex-col space-y-2 text-center">
              <h1 className="text-2xl font-semibold tracking-tight">
              {currentState==="login"? " Login an account":currentState==="signUp"?" Create an account":""}
             
              </h1>
              <p className="text-sm text-muted-foreground">
                Enter your email below to 
                {currentState==="login"? " Login your account":currentState==="signUp"?" create your account":""}

                
              </p>
            </div>

            <UserAuthForm currentState={currentState} />

            <p className="px-8 text-center text-sm text-muted-foreground">
              By clicking continue, you agree to our{" "}
              <Link
                href="/terms"
                className="underline underline-offset-4 hover:text-primary"
              >
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link
                href="/privacy"
                className="underline underline-offset-4 hover:text-primary"
              >
                Privacy Policy
              </Link>
              .
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}