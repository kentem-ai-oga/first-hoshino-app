"use client";

import { Memo, Reply } from "../types";
import { useEffect, useRef, useState } from "react";
import { MessageCircle } from "lucide-react";
import Editor from "./Editor";
import ContentBody from "./ContentBody";
import ReplyList from "./ReplyList";

type MemoListProps = {
  memos: Memo[];
  setMemos: React.Dispatch<React.SetStateAction<Memo[]>>;
};

const REPLIES_STORAGE_KEY = "replies";

// Color accents per card - visual variety keeps attention (Von Restorff effect)
const leftAccents = [
  "bg-blue-600",
  "bg-purple-600",
  "bg-teal-600",
  "bg-green-600",
];

const MemoList = (props: MemoListProps) => {
  const [replies, setReplies] = useState<Reply[]>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem(REPLIES_STORAGE_KEY);
      if (saved) return JSON.parse(saved);
    }
    return [];
  });
  const hasMounted = useRef(false);

  useEffect(() => {
    if (!hasMounted.current) {
      hasMounted.current = true;
      return;
    }
    localStorage.setItem(REPLIES_STORAGE_KEY, JSON.stringify(replies));
  }, [replies]);

  const [replyingTo, setReplyingTo] = useState<number | null>(null);
  const [editingTo, setEditingTo] = useState<{
    id: number;
    type: "memo" | "reply";
  } | null>(null);

  const updateMemo = (inputText: string) => {
    if (inputText.trim() && editingTo) {
      props.setMemos(
        props.memos.map((memo) =>
          memo.id === editingTo.id ? { ...memo, text: inputText } : memo
        )
      );
      setEditingTo(null);
    }
  };

  const deleteMemo = (id: number) => {
    props.setMemos(props.memos.filter((memo) => memo.id !== id));
    setReplies(replies.filter((reply) => reply.parentId !== id));
  };

  const startEdit = (id: number, type: "memo" | "reply") => {
    setEditingTo({ id, type });
  };

  const getRepliesForMemo = (memoId: number) => {
    return replies.filter((reply) => reply.parentId === memoId);
  };

  const addReply = (inputText: string) => {
    if (inputText.trim() && replyingTo) {
      const reply: Reply = {
        id: Date.now(),
        text: inputText,
        timestamp: new Date().toLocaleString("ja-JP"),
        parentId: replyingTo,
      };
      setReplies([reply, ...replies]);
      setReplyingTo(null);
    }
  };

  return (
    <>
      {props.memos.map((memo, idx) => {
        const memoReplies = getRepliesForMemo(memo.id);
        const replyCount = memoReplies.length;
        const accent = leftAccents[idx % leftAccents.length];

        return (
          <div
            key={memo.id}
            className="group memo-card bg-neutral-0 border border-neutral-200 rounded-lg shadow-sm overflow-hidden animate-in"
            style={{ animationDelay: `${idx * 0.06}s` }}
          >
            <div className="flex">
              {/* Left accent bar - color coding creates visual rhythm */}
              <div className={`w-1 shrink-0 ${accent}`} />

              <div className="flex-1 min-w-0">
                {/* Memo body */}
                <div className="p-4">
                  {editingTo?.id === memo.id && editingTo?.type === "memo" ? (
                    <Editor
                      initialValue={memo.text}
                      onSubmit={updateMemo}
                      type="edit"
                    />
                  ) : (
                    <ContentBody
                      type="memo"
                      content={memo}
                      onDelete={deleteMemo}
                      startEdit={startEdit}
                    />
                  )}
                </div>

                {/* Thread toggle */}
                <div className="border-t border-neutral-100 px-4 py-2 flex items-center justify-between">
                  <button
                    onClick={() =>
                      setReplyingTo(replyingTo === memo.id ? null : memo.id)
                    }
                    className="flex items-center gap-1.5 text-xs text-neutral-400 hover:text-blue-700 transition-colors"
                  >
                    <MessageCircle className="w-3.5 h-3.5" />
                    <span>
                      {replyCount > 0 ? (
                        <>
                          <span className="font-medium text-blue-600">
                            {replyCount}
                          </span>
                          件の返信
                        </>
                      ) : (
                        "返信する"
                      )}
                    </span>
                  </button>
                </div>

                {/* Replies */}
                {(replyCount > 0 || replyingTo === memo.id) && (
                  <div className="border-t border-neutral-100 px-4 py-3 space-y-3 bg-neutral-100/50">
                    <ReplyList
                      replies={memoReplies}
                      setReplies={setReplies}
                      startEdit={startEdit}
                      editingTo={editingTo}
                      setEditingTo={setEditingTo}
                    />
                    {replyingTo === memo.id && (
                      <div className="animate-in">
                        <Editor
                          onSubmit={addReply}
                          placeholder="返信を入力..."
                          type="reply"
                        />
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default MemoList;
