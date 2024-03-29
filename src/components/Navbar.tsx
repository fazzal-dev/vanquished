"use client";
import React from "react";
import { Button } from "./ui/button";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { usePathname, useRouter } from "next/navigation";
export default function Navbar() {
  const router = useRouter();
  const path = usePathname();
  const supabase = createClientComponentClient();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.refresh();
  };
  const isAuthPage = path === "/auth";

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center">
        <h1 className="font-bold text-lg">Vanquished.</h1>
      </div>
      {!isAuthPage && <Button onClick={handleLogout}>Logout</Button>}
    </div>
  );
}
