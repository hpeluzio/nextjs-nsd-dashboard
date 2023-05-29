export default function DashboardLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  return (
    <section>
      {/* Include shared UI here e.g. a header or sidebar */}
      <div style={{ backgroundColor: '#0000003c'}}>
      <nav></nav>
 
      {children}
      </div>
    </section>
  );
}