import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const VerifyMailCode = () => {
   return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
         <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md text-center">
            <h2 className="text-2xl font-bold text-gray-600 mb-6">Verify Your Email</h2>
            <p className="text-gray-500 mb-4">Enter the 6-digit verification code sent to your email.</p>
            <div className="flex justify-center gap-2">
               {[...Array(6)].map((_, index) => (
                  <Input key={index} type="text" maxLength={1} className="w-12 h-12 text-center text-xl" />
               ))}
            </div>
            <Button className="w-full mt-6">Verify</Button>
         </div>
      </div>
   );
};

export default VerifyMailCode;
