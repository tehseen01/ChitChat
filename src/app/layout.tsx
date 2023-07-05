import "./globals.css";
import { Providers } from "../redux/Providers";

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
    <html
      lang="en"
      className="light"
      style={{ colorScheme: "light" }}
      suppressHydrationWarning
    >
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
