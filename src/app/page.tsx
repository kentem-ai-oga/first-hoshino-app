"use client";

import Layout from "../components/Layout";
import { useEffect, useState } from "react";
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
  const [memos, setMemos] = useState<Memo[]>(defaultMemos);
  const [isLoaded, setIsLoaded] = useState(false);

  // マウント後にlocalStorageから読み込む
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      setMemos(JSON.parse(saved));
    }
    setIsLoaded(true);
  }, []);

  // 初回読み込み後のみlocalStorageに保存する
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(memos));
    }
  }, [memos, isLoaded]);

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
    <Layout>
      <div className="w-3/4 flex-col space-y-4">
        <Editor
          placeholder="新しいメモを入力.."
          type="shadow"
          onSubmit={addMemo}
        />
      </div>
      {isLoaded && <MemoList memos={memos} setMemos={setMemos} />}
    </Layout>
  );
}
