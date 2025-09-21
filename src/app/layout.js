import Navbar from "./components/Navbar/Component";
import Footer from "./components/Footer/Component";
import "./styles/main.scss";
import { Tajawal } from "next/font/google";
import Script from "next/script";

const tajawal = Tajawal({
	subsets: ["arabic"],
	weight: ["200", "300", "400", "500", "700", "800", "900"], // available weights
	variable: "--font-tajawal",
	display: "swap",
});

export const metadata = {
	title: "هواجس عقيل سوار",
	description: "أرشيف أعمال عقيل سوار، الصحفي والكاتب المسرحي والمؤلف البحريني",
	icons: {
		icon: "/favicon.ico",
		shortcut: "/favicon.ico",
		apple: "/apple-touch-icon.png",
	},
	manifest: "/site.webmanifest",
};

export default function RootLayout({ children }) {
	return (
		<html lang="en">
			<head>
				{/* Google Analytics */}
				<Script
					src={`https://www.googletagmanager.com/gtag/js?id=G-033B723TEJ`}
					strategy="afterInteractive"
				/>
				<Script id="ga-init" strategy="afterInteractive">
					{`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-033B723TEJ');
          `}
				</Script>
			</head>
			<body className={`${tajawal.variable}`}>
				<Navbar />
				{children}
				<Footer />
			</body>
		</html>
	);
}
