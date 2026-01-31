"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { capText } from "@/utils/textUtils";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

export function AddTestDialog() {
  const [value, setValue] = useState<string>("");

  const router = useRouter();
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(value);
    if (value == "json") {
      router.push("/admin/tests/add-test/json");
    } else if (value == "excel/csv") {
      router.push("/admin/tests/add-test/excel");
    } else {
      router.push("/admin/tests/add-test/form");
    }
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Card>
          <CardHeader>
            <CardTitle>Add Test</CardTitle>
            <CardDescription>Add a new test</CardDescription>
          </CardHeader>
        </Card>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Select mode</DialogTitle>
            <DialogDescription>
              Select the mode for the test. Click save when you&apos;re done.
            </DialogDescription>
          </DialogHeader>
          <div className="my-4">
            <ModeSelect value={value} setValue={setValue} />
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit">Confirm</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

function ModeSelect({
  value,
  setValue,
}: {
  value: string;
  setValue: (value: string) => void;
}) {
  const modes = ["json", "excel/csv", "form"];
  return (
    <Select onValueChange={setValue} value={value}>
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Select Mode" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Modes</SelectLabel>
          {modes.map((i, _) => (
            <SelectItem key={i} value={i}>
              {capText(i)}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
