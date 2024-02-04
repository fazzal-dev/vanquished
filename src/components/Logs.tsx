"use client";
import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge, Avatar } from "@radix-ui/themes";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { createClient } from "@supabase/supabase-js";

interface LogsProps {
  id: string;
  username: string;
  status: string;
  joined_at: string;
  avatar_url: string;
  fallback_letter: string;
}

export default function Logs({
  username,
  id,
  status,
  joined_at,
  avatar_url,
  fallback_letter,
}: LogsProps) {
  const supabase = createClientComponentClient();

  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    async function fetchDataFromSupabase() {
      try {
        const { data, error } = await supabase.from("queue").select("*");

        if (error) {
          console.error("Error fetching data:", error.message);
          return [];
        }

        return data || [];
      } catch (error) {
        return [];
      }
    }

    const fetchAndSetData = async () => {
      const fetchedData = await fetchDataFromSupabase();
      setData(fetchedData);
    };

    const channel = supabase
      .channel("schema-db-changes")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "queue",
        },
        () => {
          fetchAndSetData();
        }
      )
      .subscribe();

    fetchAndSetData();
    return () => {
      channel.unsubscribe();
    };
  }, []);

  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-1/3">Name</TableHead>
            <TableHead className="w-1/3">Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((item) => (
            <TableRow key={item.id}>
              <TableCell className="font-bold">
                <Avatar
                  src={item.avatar_url}
                  fallback={item.fallback_letter}
                  radius="full"
                  className="m-2"
                />
                {item.username}
              </TableCell>
              <TableCell>
                <Badge color="green" size="2">
                  {item.status}
                </Badge>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
