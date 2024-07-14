import { SignUp } from "@clerk/clerk-react";
export default function Signup() {
  return (
    <div>
      <SignUp path="/signup" routing="path" />
    </div>
  );
}
