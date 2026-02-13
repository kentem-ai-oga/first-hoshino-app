"use client";

import { Send } from "lucide-react";
import { useState } from "react";

type EditorProps = {
  initialValue?: string;
  placeholder?: string;
  type?: "main" | "reply" | "edit";
  onSubmit: (content: string) => void;
};

const Editor = (props: EditorProps) => {
  const { initialValue = "", placeholder = "", type = "main" } = props;
  const [inputText, setInputText] = useState(initialValue);
  const [isFocused, setIsFocused] = useState(false);

  const handleSubmit = () => {
    if (inputText.trim()) {
      props.onSubmit(inputText);
      setInputText("");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const isMain = type === "main";

  return (
    <div
      className={`rounded-lg transition-shadow duration-200 ${
        isMain
          ? `bg-neutral-0 border shadow-sm p-4 ${
              isFocused
                ? "border-blue-500 shadow-md shadow-blue-500/5"
                : "border-neutral-200"
            }`
          : ""
      }`}
    >
      <textarea
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        rows={isMain ? 3 : 2}
        className={`w-full rounded-md border border-neutral-200 bg-neutral-0 px-3 py-2 text-neutral-900 placeholder:text-neutral-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none transition-all ${
          isMain ? "text-[15px] leading-relaxed" : "text-[13px]"
        }`}
      />
      <div className="flex items-center justify-between mt-2">
        <span className="text-[11px] text-neutral-300">
          Ctrl+Enter
        </span>
        <button
          onClick={handleSubmit}
          disabled={!inputText.trim()}
          className="group flex items-center gap-1.5 px-3.5 py-1.5 bg-blue-700 text-white text-sm font-medium rounded-md hover:bg-blue-800 active:scale-[0.97] disabled:opacity-30 disabled:cursor-not-allowed transition-all"
          style={{ fontFamily: "var(--font-rounded)" }}
        >
          <Send className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
          <span>{isMain ? "投稿" : type === "reply" ? "返信" : "保存"}</span>
        </button>
      </div>
    </div>
  );
};

export default Editor;
