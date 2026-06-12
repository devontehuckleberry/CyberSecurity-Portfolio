import type { Metadata } from "next";
import { IBM_Plex_Mono, Playfair_Display } from "next/font/google";
import Script from "next/script";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import GlowTracker from "@/components/GlowTracker";
import "./globals.css";

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-mono",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["700"],
  variable: "--font-serif",
  display: "swap",
});

export const viewport = {
  width: 'device-width',
  initialScale: 1,
}

const SITE_URL = 'https://devonte-huckleberry.vercel.app'

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Devonte Huckleberry — Cybersecurity Portfolio',
    template: '%s — Devonte Huckleberry',
  },
  description: 'SOC-focused cybersecurity analyst in Chicago. Hands-on lab work in threat detection, log analysis, Active Directory, and incident response. Building toward Identity & Access Management.',
  authors: [{ name: 'Devonte Huckleberry' }],
  keywords: ['SOC analyst', 'cybersecurity', 'IAM', 'identity and access management', 'incident response', 'threat detection', 'Splunk', 'Wireshark', 'Chicago'],
  openGraph: {
    type: 'website',
    url: SITE_URL,
    title: 'Devonte Huckleberry — Cybersecurity Portfolio',
    description: 'SOC-focused analyst with hands-on lab experience in threat detection, log analysis, and incident response. Building toward IAM.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Devonte Huckleberry — Cybersecurity Portfolio',
    description: 'SOC-focused analyst building toward IAM — threat detection, log analysis, incident response.',
  },
  alternates: {
    canonical: SITE_URL,
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
    <html lang="en" className={`${ibmPlexMono.variable} ${playfair.variable}`} suppressHydrationWarning>
      <body>
        {children}
        <GlowTracker />
        <Script
          src="https://www.google.com/recaptcha/api.js?render=6LdlR_wsAAAAADqfJnLX3d0E65kv42C42Yg7rs9g"
          strategy="lazyOnload"
        />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
