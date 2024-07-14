import { SignUp } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom"; // Assuming you're using React Router

export default function Signup() {


  return (
    <div className="flex justify-center items-center">
      <SignUp path="/signup" routing="path" />
    </div>
  );
}
 