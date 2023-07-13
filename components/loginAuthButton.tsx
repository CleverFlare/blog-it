import { Button } from "./ui/button";
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
        <AiOutlineLoading3Quarters className="w-4 h-4 animate-spin me-2" />
      )}
      Proceed
    </Button>
  );
}
