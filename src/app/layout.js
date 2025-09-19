import { Geist, Geist_Mono } from "next/font/google";
import Navbar from "./components/Navbar/Component";
import Footer from "./components/Footer/Component";
import "./styles/main.scss";
import { Tajawal } from "next/font/google";

const tajawal = Tajawal({
	subsets: ["arabic"],
	weight: ["200", "300", "400", "500", "700", "800", "900"], // available weights
	variable: "--font-tajawal",
	display: "swap",
});

export const metadata = {
	title: "هواجس عقيل سوار",
	description:
		"أرشيف أعمال عقيل سوار، الصحفي والكاتب المسرحي والمؤلف البحريني، يشمل مقالاته الصحفية وكتبه للأطفال ونصوصه المسرحية.",
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
			<body className={`${tajawal.variable}`}>
				<Navbar />
				{children}
				<Footer />
			</body>
		</html>
	);
}
