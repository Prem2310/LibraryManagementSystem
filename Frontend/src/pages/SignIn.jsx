// if user logged in, add log out button and user profile button
import { SignIn } from "@clerk/clerk-react";
export default function Signin() {
  return (
    <>
    <div className="flex justify-center items-center">
      <SignIn path="/signin" routing="path" />

    </div>
    </>
  );
}
