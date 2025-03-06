import { useState } from "react";
import { useForm } from "react-hook-form";
import { Mail, Lock, User, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Link, useNavigate } from "react-router-dom";
import Logo from "@/assets/logo/Logo";
import { useRegisterUserMutation } from "@/redux-store/features/userApi";
import { toast } from "sonner";

const Register = () => {
   const navigate = useNavigate();
   const [showPassword, setShowPassword] = useState(false);
   const [showConfirmPassword, setShowConfirmPassword] = useState(false);
   const [registerUser] = useRegisterUserMutation()
   const {
      register,
      handleSubmit,
      watch,
      formState: { errors },
   } = useForm();

   const onSubmit = async (data) => {
      console.log(data);
      try {
         const response = await registerUser(data).unwrap();
         console.log("response", response);
         toast.success("Register successfully.")
         navigate("/auth/login");
      } catch {
         toast.error("Failed to register user.")
      }
   };

   return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
         <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
            <div className="flex items-center justify-center mb-4">
               <Logo />
            </div>
            <h2 className="text-2xl font-bold text-gray-600 text-center mb-6">Create an Account</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
               <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <div className="relative">
                     <Input
                        id="name"
                        type="text"
                        placeholder="Enter your full name"
                        {...register("name", { required: "Name is required" })}
                        className="pl-10"
                     />
                     <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                  </div>
                  {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
               </div>
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
               <div className="space-y-2">
                  <Label htmlFor="confirm-password">Confirm Password</Label>
                  <div className="relative">
                     <Input
                        id="confirm-password"
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder="Confirm your password"
                        {...register("confirmPassword", {
                           required: "Confirm Password is required",
                           validate: (value) => value === watch("password") || "Passwords do not match",
                        })}
                        className="pl-10 pr-10"
                     />
                     <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                     <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                     >
                        {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                     </button>
                  </div>
                  {errors.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword.message}</p>}
               </div>
               <Button type="submit" className="w-full cursor-pointer">Register</Button>
            </form>
            <Separator className="my-6" />
            <p className="text-center">
               Already have an account? <Link to="/auth/login" className="hover:underline text-blue-600">Sign in here</Link>
            </p>
         </div>
      </div>
   );
};

export default Register;
