"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import "./navbar.scss";

// Import your logo
import logo from "./logo.png";

const navigationItems = [
	{ href: "/", label: "الرئيسية", key: "home" },
	{ href: "/journalism", label: "صحافة", key: "journalism" },
	{ href: "/photography", label: "تصوير", key: "photography" },
	{ href: "/theatre", label: "مسرح", key: "theatre" },
	{ href: "/mawwal", label: "مواويل", key: "mawwal" },
	{ href: "/publications", label: "اصدارات", key: "publications" },
	{ href: "/interviews", label: "مقابلات", key: "interviews" },
];

export default function Navbar() {
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const pathname = usePathname();

	// Close menu when route changes
	useEffect(() => {
		setIsMenuOpen(false);
	}, [pathname]);

	// Prevent body scroll when mobile menu is open
	useEffect(() => {
		if (isMenuOpen) {
			document.body.style.overflow = "hidden";
		} else {
			document.body.style.overflow = "unset";
		}

		// Cleanup function
		return () => {
			document.body.style.overflow = "unset";
		};
	}, [isMenuOpen]);

	const handleMenuClose = () => setIsMenuOpen(false);
	const handleMenuToggle = () => setIsMenuOpen(!isMenuOpen);

	const isActiveLink = (href) => pathname === href;

	return (
		<nav className="navbar" role="navigation" aria-label="الرئيسية">
			<div className="navbar__container">
				<div className="navbar__brand">
					<Link
						href="/"
						onClick={handleMenuClose}
						className="navbar__brand-link"
						aria-label="العودة للصفحة الرئيسية"
					>
						<Image
							src={logo}
							alt="شعار عقيل آل سوار"
							width={200}
							height={60}
							priority
							className="navbar__logo"
							sizes="(max-width: 640px) 120px, (max-width: 1024px) 150px, 200px"
						/>
					</Link>
				</div>

				{/* Desktop Navigation - On the right */}
				<ul className="navbar__nav" role="menubar">
					{navigationItems.map(({ href, label, key }) => (
						<li key={key} className="navbar__nav-item" role="none">
							<Link
								href={href}
								className={`navbar__nav-link ${
									isActiveLink(href) ? "navbar__nav-link--active" : ""
								}`}
								role="menuitem"
								aria-current={isActiveLink(href) ? "page" : undefined}
							>
								{label}
							</Link>
						</li>
					))}
				</ul>

				{/* Mobile Menu Toggle - Between logo and nav on mobile */}
				<button
					className={`navbar__toggle ${
						isMenuOpen ? "navbar__toggle--open" : ""
					}`}
					onClick={handleMenuToggle}
					aria-label={isMenuOpen ? "إغلاق القائمة" : "فتح القائمة"}
					aria-expanded={isMenuOpen}
					aria-controls="mobile-menu"
					type="button"
				>
					<span className="navbar__toggle-bar"></span>
					<span className="navbar__toggle-bar"></span>
					<span className="navbar__toggle-bar"></span>
				</button>
			</div>

			{/* Mobile Navigation Overlay */}
			<div
				className={`navbar__overlay ${
					isMenuOpen ? "navbar__overlay--visible" : ""
				}`}
				onClick={handleMenuClose}
				aria-hidden="true"
			/>

			{/* Mobile Navigation Menu - Slides from right */}
			<div
				className={`navbar__mobile ${isMenuOpen ? "navbar__mobile--open" : ""}`}
				id="mobile-menu"
				role="menu"
				aria-hidden={!isMenuOpen}
			>
				<ul className="navbar__mobile-nav">
					{navigationItems.map(({ href, label, key }) => (
						<li key={key} className="navbar__mobile-item" role="none">
							<Link
								href={href}
								onClick={handleMenuClose}
								className={`navbar__mobile-link ${
									isActiveLink(href) ? "navbar__mobile-link--active" : ""
								}`}
								role="menuitem"
								aria-current={isActiveLink(href) ? "page" : undefined}
							>
								{label}
							</Link>
						</li>
					))}
				</ul>
			</div>
		</nav>
	);
}
