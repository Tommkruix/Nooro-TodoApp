export default function Body({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <main className="main-container">{children}</main>;
}
