import Sidebar from "@/components/sidebar/Sidebar";
import { ThemeProvider } from "../components/ThemeProvider";
import "./globals.css";
import { Providers } from "../redux/Providers";
import { Suspense } from "react";
import Loading from "./loading";

export const metadata = {
  title: "ChitChat",
  description: "Welcome to the chitchat messaging platform",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="light" style={{ colorScheme: "light" }}>
      <body suppressHydrationWarning={true}>
        <Providers>
          <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
            <Suspense fallback={<Loading />}>
              <Sidebar>{children}</Sidebar>
            </Suspense>
          </ThemeProvider>
        </Providers>
      </body>
    </html>
  );
}
