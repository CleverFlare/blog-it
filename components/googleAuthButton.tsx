import { FaGoogle } from "react-icons/fa6";
import { Button } from "./ui/button";
import { signIn } from "next-auth/react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useState } from "react";

interface GoogleAuthButtonProps {}

export default function GoogleAuthButton({}: GoogleAuthButtonProps) {
  const [loading, setLoading] = useState<boolean>(false);
  function onGoogleClick() {
    signIn("google", {
      callbackUrl: "/home",
    });
    setLoading(true);
  }
  return (
    <Button
      type="button"
      variant="outline"
      className="w-full"
      onClick={onGoogleClick}
      disabled={loading}
    >
      {loading && (
        <AiOutlineLoading3Quarters className="me-2 w-4 h-4 animate-spin" />
      )}
      {!loading && <FaGoogle className="me-2 w-4 h-4" />}
      Google
    </Button>
  );
}
