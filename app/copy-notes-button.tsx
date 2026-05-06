"use client";

import { useState, useTransition } from "react";

export default function CopyNotesButton({ text }: { text: string }) {
  const [status, setStatus] = useState<"idle" | "copied" | "failed">("idle");
  const [isPending, startTransition] = useTransition();

  function copy() {
    startTransition(async () => {
      try {
        await navigator.clipboard.writeText(text);
        setStatus("copied");
      } catch {
        setStatus("failed");
      }
    });
  }

  return (
    <div className="notes-copy">
      <button
        className="btn secondary"
        disabled={isPending || !text}
        onClick={copy}
        type="button"
      >
        {isPending ? "Copying..." : "Copy for Apple Notes"}
      </button>
      {status === "copied" && <span className="good">Copied</span>}
      {status === "failed" && <span className="bad">Copy failed</span>}
    </div>
  );
}
