"use client";

import Editor from "@monaco-editor/react";
import { Button } from "@/components/ui/button";
import { useRef, useState } from "react";
import axios from "axios";

export default function AdminTestEditor({
  defaultJSON,
  testId,
}: {
  defaultJSON: string;
  testId?: string;
}) {
  const editorRef = useRef<any>(null);

  const [value, setValue] = useState(() => {
    try {
      return JSON.stringify(JSON.parse(defaultJSON), null, 2);
    } catch {
      return defaultJSON;   
    }
  });

  const [error, setError] = useState<string | null>(null);

  const submit = async () => {
    try {
      JSON.parse(value);
      setError(null);

      if (!testId) await axios.post("/api/admin/test", value);
      else await axios.put(`/api/admin/test/${testId}`, value);

      alert("Test saved");
    } catch {
      setError("Invalid JSON");
    }
  };

  return (
    <div className="space-y-4">
      <Editor
        height="500px"
        defaultLanguage="json"
        value={value}
        onChange={(v) => setValue(v || "")}
        onMount={(editor) => (editorRef.current = editor)}
        options={{
          minimap: { enabled: false },
          fontSize: 14,
          formatOnPaste: true,
          formatOnType: true,
          automaticLayout: true,
        }}
      />

      {error && <p className="text-red-500 text-sm">{error}</p>}

      <div className="flex gap-2">
        <Button
          variant="secondary"
          onClick={() =>
            editorRef.current?.getAction("editor.action.formatDocument")?.run()
          }
        >
          Format JSON
        </Button>

        <Button onClick={submit}>Save Test</Button>
      </div>
    </div>
  );
}
