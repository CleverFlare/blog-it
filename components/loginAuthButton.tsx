import { FaGoogle } from "react-icons/fa6";
import { Button } from "./ui/button";
import { signIn } from "next-auth/react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useState } from "react";

interface LoginAuthButtonProps {}

export default function LoginAuthButton({}: LoginAuthButtonProps) {
  const [loading, setLoading] = useState<boolean>(false);
  function onClick() {
    setLoading(true);
  }
  return (
    <Button
      type="submit"
      className="w-full"
      onClick={onClick}
      disabled={loading}
    >
      {loading && (
        <AiOutlineLoading3Quarters className="me-2 w-4 h-4 animate-spin" />
      )}
      Proceed
    </Button>
  );
}