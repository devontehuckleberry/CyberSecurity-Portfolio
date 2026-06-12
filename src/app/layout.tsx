import type { Metadata } from "next";
import { IBM_Plex_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-mono",
  display: "swap",
});

export const viewport = {
  width: 'device-width',
  initialScale: 1,
}

const SITE_URL = 'https://cyber-security-portfolio-ten.vercel.app'

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
    images: [{ url: '/og-image.png', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Devonte Huckleberry — Cybersecurity Portfolio',
    description: 'SOC-focused analyst building toward IAM — threat detection, log analysis, incident response.',
    images: ['/og-image.png'],
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
    <html lang="en" className={ibmPlexMono.variable}>
      <body>
        {children}
        <Script
          src="https://www.google.com/recaptcha/api.js?render=6LdlR_wsAAAAADqfJnLX3d0E65kv42C42Yg7rs9g"
          strategy="lazyOnload"
        />
      </body>
    </html>
  );
}
