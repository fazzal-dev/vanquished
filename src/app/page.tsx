import Logs from "@/components/Logs";
import Navbar from "@/components/Navbar";
import { NewLog } from "@/components/NewLog";
import React from "react";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { SelectMap } from "@/components/SelectMap";
export const dynamic = "force-dynamic";

export default async function page() {
  const supabase = createServerComponentClient({ cookies });
  const { data } = await supabase.auth.getSession();

  if (!data.session) {
    return redirect("/auth");
  }

  return (
    <div className="p-5 space-y-10">
      <Navbar />
      <div className="flex space-x-4">
        <NewLog />
        <SelectMap />
      </div>
      <Logs username={""} id="" status="" joined_at="" />
    </div>
  );
}
