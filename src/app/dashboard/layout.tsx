export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <div>This is the sidebar</div>
      <div>{children}</div>
    </div>
  );
}
