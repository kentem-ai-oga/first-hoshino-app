"use client";

import { Reply } from "../types";
import ContentBody from "./ContentBody";
import Editor from "./Editor";

type ReplyListProps = {
  replies: Reply[];
  setReplies: React.Dispatch<React.SetStateAction<Reply[]>>;
  startEdit: (id: number, type: "memo" | "reply") => void;
  editingTo: { id: number; type: "memo" | "reply" } | null;
  setEditingTo: React.Dispatch<
    React.SetStateAction<{ id: number; type: "memo" | "reply" } | null>
  >;
};

const ReplyList = (props: ReplyListProps) => {
  const { replies, editingTo, setReplies, setEditingTo, startEdit } = props;

  const updateReply = (inputText: string) => {
    if (inputText.trim() && editingTo) {
      setReplies(
        replies.map((reply) =>
          reply.id === editingTo.id ? { ...reply, text: inputText } : reply
        )
      );
      setEditingTo(null);
    }
  };

  const deleteReply = (id: number) => {
    setReplies(replies.filter((reply) => reply.id !== id));
  };

  return (
    <>
      {replies.map((reply, idx) => (
        <div
          key={reply.id}
          className="group p-3 bg-neutral-100 rounded-md animate-in"
          style={{ animationDelay: `${idx * 0.05}s` }}
        >
          {editingTo?.id === reply.id && editingTo?.type === "reply" ? (
            <Editor
              initialValue={reply.text}
              onSubmit={updateReply}
              type="edit"
            />
          ) : (
            <ContentBody
              type="reply"
              content={reply}
              onDelete={deleteReply}
              startEdit={startEdit}
            />
          )}
        </div>
      ))}
    </>
  );
};

export default ReplyList;
