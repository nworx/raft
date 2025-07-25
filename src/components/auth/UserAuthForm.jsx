"use client"

import React,{useState} from "react"

import { cn } from "@/lib/utils"
import { Label } from "../ui/label"
// import { Icons } from "@/components/icons"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { useRouter } from "next/navigation"
import Link from "next/link"

import { toast } from "../ui/use-toast"
import signIn from "@/services/auth/signIn"
import signUp from "@/services/auth/signUp"
import { Eye, EyeIcon, EyeOff, EyeOffIcon } from "lucide-react"

// import { Label } from "@/registry/new-york/ui/label"

// interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export function UserAuthForm( {currentState} ) {
  const router =useRouter();
  const [isLoading, setIsLoading] = useState(false)
  const [formData,setFormData]=useState({});
   const [showPassword, setShowPassword] = useState(false);

  async function onSubmit(event) {
    event.preventDefault()
    setIsLoading(true)
    let response;
    if(currentState==="login"){
      response=await signIn(formData);
      console.log("looks like",response);
      if(response){
        router.push("/raft/dashboard")
      }
    }
    else{
      response= await signUp(formData);
    }
    // router.push("/dashboard")
      setIsLoading(false)
    
  }

  const handleChangeForm=(event)=>{
    const {name,value}=event.target;
    setFormData((previousValue)=>({
      ...previousValue,
      [name]:value
    }))
  }

  const handleCreateUser=async()=>{
  
  }

  return (
    <div className={cn("grid gap-6")} >
      <form onSubmit={onSubmit}>
        <div className="grid gap-2">
          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="email">
              Email
            </Label>
            <Input
              id="email"
              name="email"
              placeholder="name@example.com"
              type="email"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
              value={formData?.email}
              disabled={isLoading}
              onChange={handleChangeForm}
            />
          </div>
          {/* <div className="grid gap-1 flex">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                
              </div>
              <Input
                id="password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                placeholder="•••"
                value={formData?.password}
                onChange={handleChangeForm}
                required
              />
              {showPassword ? <EyeOffIcon className="w-4 h-4" onClick={()=>setShowPassword(!showPassword)} /> : <EyeIcon className="w-4 h-4" onClick={()=>setShowPassword(!showPassword)} />}
            </div> */}

             <div className="grid gap-1">
      <div className="flex items-center justify-between">
        <Label htmlFor="password">Password</Label>
        {/* <Link href="/forgot-password" className="text-sm text-primary hover:underline">
          Forgot password?
        </Link> */}
      </div>

      <div className="relative">
        <Input
          id="password"
          name="password"
          type={showPassword ? 'text' : 'password'}
          placeholder="•••"
          value={formData?.password}
          onChange={handleChangeForm}
          required
          className="pr-10" // ensures text doesn't go under the icon
        />
        <div
          className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground cursor-pointer"
          onClick={() => setShowPassword((prev) => !prev)}
        >
          {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
        </div>
      </div>
    </div>
          <Button disabled={isLoading}>
            {isLoading && (
                <></>
            //   <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
            {currentState==="login"? "Sign In with Email":currentState==="signUp"?" Create your account":""}

           
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
