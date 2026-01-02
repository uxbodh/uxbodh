import { Poppins } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  variable: "--font-poppins-sans",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"], // optional weights
  subsets: ["latin"],
});

export const metadata = {
  title: "UX Health | Landing",
  description: "Get essential customer insights with clean, modern website audits.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${poppins.variable} antialiased`}
      >
              {/* {children} */}
      </body>
    </html>
  );
}
