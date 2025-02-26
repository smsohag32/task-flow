import logoImage from "@/assets/logo/logo.png"
const Logo = () => {
   return (
      <div className="flex items-center">
         <img src={logoImage} alt="Task Flow" className="w-8" />    <p className="font-semibold text-lg">TASK <span className="text-blue-600">FLOW</span></p>
      </div>
   );
};

export default Logo;
