"use client";
import { Button } from "@radix-ui/themes";
import { GrAdd, GrSubtract } from "react-icons/gr";
import { useToast } from "@/components/ui/use-toast";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useState } from "react";
import useUserData from "../hooks/useUserData";

export function NewLog() {
  const { toast } = useToast();
  const supabase = createClientComponentClient();
  const { userData } = useUserData();
  console.log(userData);

  const closeDialog = () => {
    document.getElementById("close-btn")?.click();
  };

  const submitLog = async () => {
    try {
      const username = userData?.user?.identities[0].identity_data.name;
      const id = parseInt(userData?.user?.identities[0].id);
      const avatar_url = userData?.user?.identities[0].identity_data.avatar_url;
      const fallback_letter = username.charAt(0).toUpperCase();
      const { count, error: countError } = await supabase
        .from("queue")
        .select("id", { count: "exact" });

      if (countError) {
        console.error("Error counting entries:", countError);
        return;
      }

      const currentQueueSize = count ?? 0;

      const maxQueueSize = 10;

      if (currentQueueSize >= maxQueueSize) {
        toast({
          variant: "destructive",
          title: "Queue is full. Cannot join.",
        });
        return;
      }

      const { error } = await supabase.from("queue").insert({
        username,
        id,
        avatar_url,
        fallback_letter,
      });
      if (!error) {
        toast({
          title: "Successfully joined queue",
        });
        closeDialog();
      } else if (error?.code === "23505") {
        toast({
          variant: "destructive",
          title: "You are already in the queue",
        });
      } else {
        toast({
          variant: "destructive",
          title: "Failed to join queue",
        });
      }
    } catch (error) {
      console.error("Error submitting log:", error);
      toast({
        variant: "destructive",
        title: "Failed to join queue",
      });
    }
  };

  const handleLeave = async () => {
    try {
      const id = parseInt(userData?.user?.identities[0].id);
      const { error } = await supabase.from("queue").delete().eq("id", id);

      if (!error) {
        toast({
          title: "Successfully left the queue",
        });
      } else {
        toast({
          variant: "destructive",
          title: "Failed to leave the queue",
        });
      }
    } catch (error) {
      console.error("Error leaving the queue:", error);
      toast({
        variant: "destructive",
        title: "Failed to leave the queue",
      });
    }
  };

  return (
    <>
      <Button size="3" variant="soft" color="grass" onClick={submitLog}>
        <GrAdd />
      </Button>

      <Button size="3" variant="soft" color="red" onClick={handleLeave}>
        <GrSubtract />
      </Button>
    </>
  );
}
