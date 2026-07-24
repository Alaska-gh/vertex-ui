import "@vertex-ui/react/styles";
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Vertex UI",
  description: "Vertex UI Documentation Page",
  icons: {
    icon: "/Vertex-favicon.png",
  },
};

export default function RootLayout({
  children,
}: {children: React.ReactNode}) {
  return (
    <html
      lang="en"
    >
      <body>{children}</body>
    </html>
  );
}
