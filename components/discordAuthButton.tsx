import { FaDiscord, FaGoogle } from "react-icons/fa6";
import { Button } from "./ui/button";
import { signIn } from "next-auth/react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useState } from "react";

interface DiscordAuthButtonProps {}

export default function DiscordAuthButton({}: DiscordAuthButtonProps) {
  const [loading, setLoading] = useState<boolean>(false);
  function onDiscordClick() {
    signIn("discord", {});
    setLoading(true);
  }
  return (
    <Button
      type="button"
      variant="outline"
      className="w-full"
      onClick={onDiscordClick}
      disabled={loading}
    >
      {loading && (
        <AiOutlineLoading3Quarters className="me-2 w-4 h-4 animate-spin" />
      )}
      {!loading && <FaDiscord className="me-2 w-4 h-4" />}
      Discord
    </Button>
  );
}
