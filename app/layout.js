import Providers from "./components/Providers";
import Navbar from "./components/Navbar";
import "./globals.css";
import Footer from "./components/Footer";
import { Analytics } from "@vercel/analytics/next"
import { SpeedInsights } from "@vercel/speed-insights/next"



export const metadata = {
  metadataBase: new URL("https://e-com-malkiya.vercel.app"),
  title: {
    default: "GETCLOTH — Modern Clothing E-Commerce Platform",
    template: "%s | GETCLOTH",
  },
  description:
    "GETCLOTH empowers clothing brands, shop owners, and creators to sell online without high costs or commissions.",
  keywords: [
    "getcloth",
    "clothing store",
    "ecommerce",
    "fashion",
    "brand store",
    "sell clothes online",
    "nextjs ecommerce",
  ],
  authors: [{ name: "Hitesh Malkiya", url: "https://malkiya-hitesh.tech" }],
  creator: "Hitesh Malkiya",
  publisher: "GETCLOTH",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "GETCLOTH — Sell Clothes Online Easily",
    description:
      "The modern e-commerce solution for fashion brands, shop owners, and creators.",
    url: "https://e-com-malkiya.vercel.app",
    siteName: "GETCLOTH",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "/image/logo.png",
        width: 1200,
        height: 630,
        alt: "GETCLOTH Store Preview",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "GETCLOTH — Modern Online Store",
    description:
      "Sell stylish clothing online with ease. Powered by Next.js.",
    creator: "@hiteshmalkiya",
    images: ["/image/logo.png"],
  },
  verification: {
    google: "google-site-verification-code", 
  },
  category: "E-Commerce",
  themeColor: "#ffffff",
};


export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      
        <link rel="icon" href="/image/logo.png" />
     


      </head>
      <body className="min-h-screen max-w-[1500px]">
        <Providers>

          <Navbar />
            {children}
          <Footer />
        </Providers>

        <Analytics />
        <SpeedInsights />
         <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "GETCLOTH",
              url: "https://e-com-malkiya.vercel.app/",
              logo: "https://e-com-malkiya.vercel.app/image/logo.png",
              sameAs: [
                "https://linkedin.com/in/hiteshmalkiya",
                "https://github.com/hitesh-malkiya",
              ],
            }),
          }}
        />
      </body>
    </html >
  );
}
