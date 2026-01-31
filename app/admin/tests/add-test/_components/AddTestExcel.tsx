"use client";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import MaxWidthWrapper from "@/components/Wrappers/MaxWidthWrapper";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useState } from "react";
import { z } from "zod";
import DownloadBaseExcelButton from "./DownloadBaseExcelButton";

export const ExcelUploadSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  description: z.string().min(3, "Description must be at least 3 characters"),
  subject: z.string().min(3, "Subject must be at least 3 characters"),
  file: z
    .instanceof(File, { message: "Excel file is required" })
    .refine(
      (file) =>
        file.type ===
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" ||
        file.type === "application/vnd.ms-excel",
      "Only Excel files are allowed",
    ),
});

type ExcelUploadType = z.infer<typeof ExcelUploadSchema>;

export default function AddTestExcel({
  subjects,
}: {
  subjects: { _id: string; name: string }[];
}) {
  const [loading, setLoading] = useState(false);
  const form = useForm<ExcelUploadType>({
    resolver: zodResolver(ExcelUploadSchema),
    defaultValues: {
      title: "",
      description: "",
      subject: "",
    },
  });

  async function onSubmit(values: ExcelUploadType) {
    setLoading(true);

    const formData = new FormData();
    formData.append("file", values.file);
    formData.append("title", values.title);
    formData.append("description", values.description);
    formData.append("subject", values.subject);

    try {
      const res = await fetch("/api/upload-excel-test", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.message);
      }

      toast.success(data.message || "Test uploaded successfully");
    } catch (error: any) {
      toast.error(error.message || "Error while uploading test");
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <MaxWidthWrapper>
      <div>{JSON.stringify(subjects)}</div>
      <div className="max-w-md mx-auto">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-5 rounded-xl border bg-background p-6 shadow"
          >
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Test Title</FormLabel>
                  <FormControl>
                    <Input placeholder="JS Basics Test" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Test Description</FormLabel>
                  <FormControl>
                    <Input placeholder="Excel uploaded test" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="subject"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Subject Id</FormLabel>
                  <FormControl>
                    <Input placeholder="Subject Id" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* FILE INPUT */}
            <FormField
              control={form.control}
              name="file"
              render={() => (
                <FormItem>
                  <FormLabel>Excel File</FormLabel>
                  <FormControl>
                    <Input
                      type="file"
                      accept=".xlsx,.xls"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          form.setValue("file", file, {
                            shouldValidate: true,
                          });
                        }
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              className="w-full"
              disabled={form.formState.isSubmitting || loading}
            >
              {form.formState.isSubmitting ? "Uploading..." : "Upload Excel"}
            </Button>
          </form>
        </Form>
        {/* DOWNLOAD BASE EXCEL  */}
        <p className="text-red-400 font-mono mt-4 text-sm mb-2">
          Write your answers in this format else it wont be uploaded by the app
        </p>
        <DownloadBaseExcelButton />
      </div>
    </MaxWidthWrapper>
  );
}
