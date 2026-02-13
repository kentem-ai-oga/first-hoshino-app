import { Pencil, Trash2 } from "lucide-react";
import { Memo, Reply } from "../types";

type ContentBodyProps = {
  content: Memo | Reply;
  type: "memo" | "reply";
  onDelete: (id: number) => void;
  startEdit: (contentId: number, type: "memo" | "reply") => void;
};

function getRelativeTime(timestamp: string): string | null {
  try {
    // Parse ja-JP locale timestamp like "2026/2/13 14:30:00"
    const date = new Date(timestamp);
    if (isNaN(date.getTime())) return null;
    const diff = Date.now() - date.getTime();
    const min = Math.floor(diff / 60000);
    if (min < 1) return "たったいま";
    if (min < 60) return `${min}分前`;
    const hours = Math.floor(min / 60);
    if (hours < 24) return `${hours}時間前`;
    return null; // fallback to absolute time
  } catch {
    return null;
  }
}

const ContentBody = (props: ContentBodyProps) => {
  const isMemo = props.type === "memo";
  const relative = getRelativeTime(props.content.timestamp);

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <time className="text-xs text-neutral-400" suppressHydrationWarning>
            {props.content.timestamp}
          </time>
          {relative && (
            <span
              className="text-[11px] text-teal-600 font-medium badge-pop"
              suppressHydrationWarning
            >
              {relative}
            </span>
          )}
        </div>
        {/* Actions revealed on hover */}
        <div className="flex items-center gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={() => props.startEdit(props.content.id, props.type)}
            className="p-1 text-neutral-400 hover:text-blue-700 hover:bg-blue-50 rounded transition-colors"
            aria-label="編集"
          >
            <Pencil className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => props.onDelete(props.content.id)}
            className="p-1 text-neutral-400 hover:text-red-600 hover:bg-red-50 rounded transition-colors"
            aria-label="削除"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
      <p
        className={`whitespace-pre-wrap ${
          isMemo
            ? "text-[15px] leading-relaxed text-neutral-800"
            : "text-[13px] leading-relaxed text-neutral-600"
        }`}
      >
        {props.content.text}
      </p>
    </div>
  );
};

export default ContentBody;
