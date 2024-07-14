// if user logged in, add log out button and user profile button
import { SignIn } from "@clerk/clerk-react";
export default function Signin() {
  return (
    <>
      <SignIn path="/signin" routing="path" />
    </>
  );
}
