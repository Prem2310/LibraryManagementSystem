import { SignIn } from "@clerk/clerk-react";
import Navbar from "../components/Navbar";
export default function Signin() {
  return (
    <>
      <Navbar />
      <SignIn path="/signin" routing="path" />
    </>
  );
}
