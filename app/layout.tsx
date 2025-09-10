import type { Metadata } from "next";
import "./globals.css";
import AuthProvider from "./providers/AuthProvider";

export const metadata: Metadata = {
  title: "Finzy",
  description: "Your gateway to a brighter financial future",
  icons: {
    icon: "/logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script
          src="https://upload-widget.cloudinary.com/global/all.js"
          type="text/javascript"
        ></script>
      </head>
      <body>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
