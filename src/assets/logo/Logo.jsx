import logoImage from "@/assets/logo/logo.png"
const Logo = () => {
   return (
      <div className="flex items-center">
         <img src={logoImage} alt="Task Flow" className="w-6" />    <p className="text-primary">TASK <span>FLOW</span></p>
      </div>
   );
};

export default Logo;
