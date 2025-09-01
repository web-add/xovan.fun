"use client"

import { useState } from "react"
import { Eye, EyeOff, User, Mail, Lock, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link"
import Created from "@/components/login/accountcreated"
import ReCAPTCHA from "react-google-recaptcha";

export default function RegisterPage() {
  const [captchaValue, setCaptchaValue] = useState(null);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [prioritizeMainPW, setPrioritizeMainPW] = useState(false);
  const [AllowRegist, setAllowRegist] = useState(false);
  const [Success, setSuccess] = useState(false)
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPass = e.target.value;
    setPassword(newPass);

    if (newPass.length < 8) {  
      setMessage("Password must be at least 8 characters");
      setAllowRegist(false);
      setPrioritizeMainPW(true);
      return; 
    }
    if (confirmPassword && newPass !== confirmPassword) {
      setMessage("Password not match!");
      setAllowRegist(false);
      setPrioritizeMainPW(true);
      return;
    }

    setMessage("");
    setAllowRegist(true);
    setPrioritizeMainPW(false);
  };

  const handleConfirmChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newConfirm = e.target.value;
    setConfirmPassword(newConfirm);
    if(!prioritizeMainPW) {
      if (password === newConfirm) {
        setMessage("");
        setAllowRegist (true);
      } else {
        setMessage("Password not match!");
        setAllowRegist (false);
      }
    }
  };
  const register = async () => {
    if(AllowRegist === false) {
      console.log("Read instruction!");
      return;
    }
    if (!captchaValue) {
      setMessage("Please complete the CAPTCHA");
      return;
    }
    const res = await fetch("https://api.xovan.fun/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password, captcha: captchaValue }),
      credentials: "include" // penting untuk cookie
    });
    const data = await res.json();
    if (res.ok) {
      setSuccess(true);
    }
    setMessage(data.error || "User registered!");
  };
  return (
    <>
      {Success ?
        <Created />
        :
        <div className="min-h-screen flex items-center justify-center p-4">
          <div className="w-full max-w-md">
            <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  Create Account
                </CardTitle>
                <CardDescription>Join Xovan Store and access premium gaming services</CardDescription>
                <CardDescription style={{ color: "red" }}>{message}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="username">Username</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input id="username" placeholder="Enter your username" className="pl-10" onChange={(e) => setUsername(e.target.value)}/>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Create a password"
                      className="pl-10 pr-10"
                      onChange={handlePasswordChange}
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4 text-muted-foreground" />
                      ) : (
                        <Eye className="h-4 w-4 text-muted-foreground" />
                      )}
                    </Button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="Confirm your password"
                      className="pl-10 pr-10"
                      onChange={handleConfirmChange}
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    >
                      {showConfirmPassword ? (
                        <EyeOff className="h-4 w-4 text-muted-foreground" />
                      ) : (
                        <Eye className="h-4 w-4 text-muted-foreground" />
                      )}
                    </Button>
                  </div>
                </div>

                <ReCAPTCHA
                  data-size="compact"
                  style={{"filter": "invert(1) hue-rotate(180deg)", "width": "100%mm"}}
                  sitekey="6Le9_rUrAAAAAKyPoUoutBhT3HJBcN1d5Ooq3MWU"
                  onChange={setCaptchaValue}
                />

                <Button className="w-full" size="lg" onClick={register}>
                  Create Account
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>

                <div className="text-center text-sm text-muted-foreground">
                  Already have an account?{" "}
                  <Link href="/login" className="text-primary hover:underline font-medium">
                    Sign in
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      }
    </>
  )
}
