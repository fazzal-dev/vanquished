"use client";
import { Button } from "@radix-ui/themes";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import MapPicker from "./MapPicker";

export function SelectMap() {
  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <Button size="3" variant="soft" color="gray">
            🎲
          </Button>
        </DialogTrigger>
        <DialogContent className="shadow-[0px] border-0 h-[500px] w-[500px]">
          <MapPicker />
        </DialogContent>
      </Dialog>
    </>
  );
}
