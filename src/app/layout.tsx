import "./globals.css";
import { Metadata } from "next";
import Providers from "@/components/Providers";

export const metadata: Metadata = {
  title: "AnonAsk - Anonymous Q&A Platform",
  description: "Ask and answer questions anonymously. Get honest feedback and suggestions powered by AI.",
  keywords: ["anonymous", "questions", "feedback", "Q&A", "AI suggestions"],
  authors: [{ name: "Yaseen" }],
  openGraph: {
    title: "AnonAsk - Anonymous Q&A Platform",
    description: "Ask and answer questions anonymously with AI-powered suggestions",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "AnonAsk - Anonymous Q&A Platform",
    description: "Ask and answer questions anonymously with AI-powered suggestions",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}