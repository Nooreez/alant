import { Inter } from "next/font/google";
import Footer from "../footer";

const inter = Inter({ subsets: ["latin"] });

export default function LectureLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
    return (
        <div>
            {children}
            <Footer />
        </div>
    );
}
