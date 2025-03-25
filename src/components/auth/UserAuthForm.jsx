"use client"

import React,{useState} from "react"

import { cn } from "@/lib/utils"
import { Label } from "../ui/label"
// import { Icons } from "@/components/icons"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { useRouter } from "next/navigation"
import Link from "next/link"

// import { Label } from "@/registry/new-york/ui/label"

// interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export function UserAuthForm({ className, ...props }) {
  const router =useRouter();
  const [isLoading, setIsLoading] = useState(false)
  const [formData,setFormData]=useState({});

  async function onSubmit(event) {
    event.preventDefault()
    setIsLoading(true)
    router.push("/dashboard")
    setTimeout(() => {
      setIsLoading(false)
    }, 3000)
  }

  const handleChangeForm=()=>{

  }

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <form onSubmit={onSubmit}>
        <div className="grid gap-2">
          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="email">
              Email
            </Label>
            <Input
              id="email"
              placeholder="name@example.com"
              type="email"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
              value={formData?.email}
              disabled={isLoading}
            />
          </div>
          <div className="grid gap-1">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                {/* <Link href="/forgot-password" className="text-sm text-primary hover:underline">
                  Forgot password?
                </Link> */}
              </div>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="••••••"
                value={formData?.password}
                onChange={handleChangeForm}
                required
              />
            </div>
          <Button disabled={isLoading}>
            {isLoading && (
                <></>
            //   <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
            {props?.currentState==="login"? "Sign In with Email":props?.currentState==="signUp"?" Create your account":""}

           
          </Button>
        </div>
      </form>
      {/* <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>
      </div> */}
      {/* <Button variant="outline" type="button" disabled={isLoading}>
        {isLoading ? (
            <></>
        //   <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
        ) : (
            <></>
        //   <Icons.gitHub className="mr-2 h-4 w-4" />
        )}{" "}
        GitHub
      </Button> */}
    </div>
  )
}
