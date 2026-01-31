"use client";

import { Button } from "@/components/ui/button";

export default function DownloadExcel() {
  async function download() {
    const res = await fetch("/api/export-base-excel");
    const blob = await res.blob();

    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "data.xlsx";
    a.click();
    window.URL.revokeObjectURL(url);
  }

  return <Button onClick={download}>Download Demo Excel</Button>;
}
