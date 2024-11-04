 
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen flex-col md:flex-row">

      <div className="flex-grow md:overflow-y-auto">{children}</div>
    </div>
  );
}