"use client";

import Layout from "../components/Layout";
import { useEffect, useRef, useState } from "react";
import { Memo } from "../types";
import Editor from "../components/Editor";
import MemoList from "../components/MemoList";

const STORAGE_KEY = "memos";

const defaultMemos: Memo[] = [
  {
    id: 1,
    text: "思いついたことを、サッとメモ。\n作業に集中するための、シンプルなメモアプリです！",
    timestamp: new Date().toLocaleString("ja-JP"),
  },
];

export default function Home() {
  const [memos, setMemos] = useState<Memo[]>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) return JSON.parse(saved);
    }
    return defaultMemos;
  });
  const hasMounted = useRef(false);

  useEffect(() => {
    if (!hasMounted.current) {
      hasMounted.current = true;
      return;
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(memos));
  }, [memos]);

  const addMemo = (inputText: string) => {
    if (inputText.trim()) {
      const memo: Memo = {
        id: Date.now(),
        text: inputText,
        timestamp: new Date().toLocaleString("ja-JP"),
      };
      setMemos([memo, ...memos]);
    }
  };

  return (
    <Layout memoCount={memos.length}>
      <Editor
        placeholder="新しいメモを入力..."
        type="main"
        onSubmit={addMemo}
      />
      <MemoList memos={memos} setMemos={setMemos} />
    </Layout>
  );
}
