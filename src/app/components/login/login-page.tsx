import { useContext } from "react";

import { FcGoogle } from "react-icons/fc";

import { LoginWithGoogleContext } from "@/app/providers/login-with-google.provider";

export default function LoginPage() {
  const { handleGoogleSignIn } = useContext(LoginWithGoogleContext);

  return (
    <section
      className="flex justify-end cursor-pointer mb-4"
      onClick={handleGoogleSignIn}
    >
      <FcGoogle className="text-3xl" />
      <button className="font-bold pl-2">Sign with Google</button>
    </section>
  );
}
