import { BookOpen } from "lucide-react";

type LayoutProps = {
  children: React.ReactNode;
  memoCount?: number;
};

function formatDate(): string {
  const d = new Date();
  const weekdays = ["日", "月", "火", "水", "木", "金", "土"];
  return `${d.getFullYear()}年${d.getMonth() + 1}月${d.getDate()}日（${weekdays[d.getDay()]}）`;
}

const Layout = (props: LayoutProps) => {
  const count = props.memoCount ?? 0;

  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-10 bg-gradient-to-r from-blue-700 to-blue-800 text-white px-6 shadow-md">
        <div className="max-w-2xl mx-auto flex items-center justify-between py-3">
          <div className="flex items-center gap-2.5">
            <BookOpen className="w-5 h-5 opacity-90" />
            <h1
              className="text-lg tracking-tight leading-none"
              style={{ fontFamily: "var(--font-mincho)", fontWeight: 500 }}
            >
              手帖
            </h1>
          </div>
          {count > 0 && (
            <div className="flex items-center gap-2 text-xs text-blue-100">
              <span className="w-1.5 h-1.5 rounded-full bg-green-400 pulse-dot" />
              <span>{count}件</span>
            </div>
          )}
        </div>
      </header>

      <div className="max-w-2xl mx-auto px-6 pt-5 pb-2">
        <p
          className="text-[13px] text-neutral-400"
          suppressHydrationWarning
        >
          {formatDate()}
        </p>
      </div>

      <div className="max-w-2xl mx-auto px-6 py-4">
        <main className="space-y-4">{props.children}</main>
      </div>

      <footer className="max-w-2xl mx-auto px-6 pb-8 pt-4">
        <p className="text-xs text-neutral-300">&copy; 2026 Oga</p>
      </footer>
    </div>
  );
};

export default Layout;
