"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { deleteTest } from "../_actions/deleteTest";
import { TestType } from "@/Types/TestType";
import { useActionState } from "react";

export const DeleteTestCard = ({ test }: { test: TestType }) => {
  const [_, action, loading] = useActionState(deleteTest, null);

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Card className="cursor-pointer hover:shadow-md transition">
          <CardHeader>
            <CardTitle>{test.name}</CardTitle>
            <CardDescription>{test.description}</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Available Questions: {test.questions.length}</p>
          </CardContent>
        </Card>
      </AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete the test
            and all its questions.
          </AlertDialogDescription>
        </AlertDialogHeader>

        {/* ✅ FORM is required for useActionState */}
        <form action={action}>
          <input type="hidden" name="testId" value={test._id} />

          <AlertDialogFooter>
            <AlertDialogCancel disabled={loading}>Cancel</AlertDialogCancel>

            <AlertDialogAction
              type="submit"
              disabled={loading}
              variant={"destructive"}
            >
              {loading ? "Deleting..." : "Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </form>
      </AlertDialogContent>
    </AlertDialog>
  );
};
