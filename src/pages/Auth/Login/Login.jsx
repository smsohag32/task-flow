
import { useState } from "react"
import { useForm } from "react-hook-form"
import { Mail, Lock, Eye, EyeOff } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Link, useNavigate } from "react-router-dom"
import Logo from "@/assets/logo/Logo"
import { toast } from "sonner"
import { useDispatch } from "react-redux"
import { loginUser } from "@/redux-store/slices/authSlice"

const Login = () => {
   const navigate = useNavigate()
   const [showPassword, setShowPassword] = useState(false)
   const [loading, setLoading] = useState(false)
   const dispatch = useDispatch()
   const {
      register,
      handleSubmit,

      formState: { errors },
   } = useForm()

   const handleLogin = async (data) => {
      const { email, password } = data;
      setLoading(true);
      try {
         const resultAction = await dispatch(loginUser({ email, password })).unwrap();
         console.log(resultAction)
         if (resultAction) {
            if (resultAction?.user) {
               toast.success("Login successful");
               navigate("/dashboard");

            } else {
               toast.success("Invalid credentials");
               navigate("/auth/login");
            }
         } else {
            console.log(resultAction)
            toast.error(`${resultAction?.message}` || "Login Failed");
         }
      } catch (error) {
         console.log(error);

         if (error?.message) {
            toast.error(error.message);
         } else if (typeof error === "string") {
            toast.error(error);
         } else {
            toast.error("Login failed due to server not responding.");
         }
      } finally {
         setLoading(false);
      }
   };

   return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
         <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
            <div className="flex items-center justify-center mb-4">
               <Logo />
            </div>
            <h2 className="text-2xl font-bold text-gray-600 text-center mb-6">Welcome Back</h2>
            <form onSubmit={handleSubmit(handleLogin)} className="space-y-4">
               <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <div className="relative">
                     <Input
                        id="email"
                        type="email"
                        placeholder="Enter your email"
                        {...register("email", {
                           required: "Email is required",
                           pattern: {
                              value: /\S+@\S+\.\S+/,
                              message: "Invalid email address",
                           },
                        })}
                        className="pl-10"
                     />
                     <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                  </div>
                  {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
               </div>
               <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                     <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter your password"
                        {...register("password", {
                           required: "Password is required",
                           minLength: {
                              value: 8,
                              message: "Password must be at least 8 characters",
                           },
                        })}
                        className="pl-10 pr-10"
                     />
                     <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                     <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                     >
                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                     </button>
                  </div>
                  {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
               </div>
               <Button type="submit" disabled={loading} className="w-full cursor-pointer">
                  Sign In
               </Button>
            </form>
            <div className="mt-4 text-center">
               <Link to="/forgot-password" className="text-sm text-blue-600 hover:underline">
                  Forgot password?
               </Link>
            </div>
            <Separator className="my-6" />
            <div className="space-y-3">
               <Button variant="outline" className="w-full">
                  <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
                     <path
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                        fill="#4285F4"
                     />
                     <path
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                        fill="#34A853"
                     />
                     <path
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                        fill="#FBBC05"
                     />
                     <path
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                        fill="#EA4335"
                     />
                  </svg>
                  Sign in with Google
               </Button>

               <p className="text-center">
                  Don&apos;t have an account? <Link to="/auth/register" className="hover:underline text-blue-600">Register here</Link>
               </p>
            </div>
         </div>
      </div>
   )
}

export default Login

