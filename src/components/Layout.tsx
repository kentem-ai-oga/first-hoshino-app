type LayoutProps = {
  children: React.ReactNode;
};

const Layout = (props: LayoutProps) => {
  return (
    <div className="px-24 py-12 w-full space-y-8 min-h-screen bg-gray-100">
      <h1 className="text-5xl font-bold">My Simple Memo</h1>
      <div className="grid grid-cols-3 gap-8 flex-1">
        <main className="space-y-4 col-span-2">{props.children}</main>
      </div>

      <footer>
        <p className="text-gray-700">
          Created by Oga &copy; 2026
        </p>
      </footer>
    </div>
  );
};

export default Layout;
