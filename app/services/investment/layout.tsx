import Footer from "@/app/components/Footer";
import ServiceNavbar from "@/app/components/Services/ServiceNavbar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <main style={{display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <ServiceNavbar />
      {children}
      <Footer />
    </main>
  );
}
