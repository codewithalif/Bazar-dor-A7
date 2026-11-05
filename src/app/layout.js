import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import NavHadder from "./Components/Navbar/NavHadder";
import { ToastContainer } from "react-toastify";
import Footer from "./Components/Footer/Footer";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Bazar Dor",
  description: "Bazar Dor is a Bangladeshi online marketplace that connects buyers and sellers, offering a wide range of products and services. Our platform provides a convenient and secure way for users to buy and sell items, from electronics and fashion to home goods and vehicles. With a user-friendly interface and robust features, Bazar Dor aims to enhance the online shopping experience for everyone in Bangladesh.",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} light`}
    >
      <body className="max-w-[1400px] mx-auto bg-white text-black antialiased">
        <ToastContainer position="top-right" autoClose={3000} />
        <NavHadder/>
        {children}
        <Footer/>
      </body>
    </html>
  );
}