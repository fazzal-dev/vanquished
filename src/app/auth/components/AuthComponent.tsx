"use client";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import React from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
export default function AuthComponent() {
  const supabase = createClientComponentClient();

  const handleLogin = () => {
    supabase.auth.signInWithOAuth({
      provider: "twitch",
      options: {
        redirectTo: `${location.origin}/auth/callback`,
      },
    });
  };

  return (
    <div className="p-5">
      <Navbar />
      <div className="flex justify-center items-center h-80vh">
        <div className="text-center space-y-5">
          <p>
            "Don't stress if I die. It was great knowing you all.
            <br /> Also, delete my hard drive." - Killjoy
          </p>
          <Button onClick={handleLogin}>Login with twitch</Button>
        </div>
      </div>
    </div>
  );
}
