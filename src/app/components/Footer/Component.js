import Link from "next/link";
import "./Footer.scss";

// SVG Icon Components for better performance and styling control
const InstagramIcon = ({ className }) => (
	<svg
		className={className}
		viewBox="0 0 24 24"
		fill="currentColor"
		aria-hidden="true"
	>
		<path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
	</svg>
);

const XIcon = ({ className }) => (
	<svg
		className={className}
		viewBox="0 0 24 24"
		fill="currentColor"
		aria-hidden="true"
	>
		<path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z" />
	</svg>
);

const FacebookIcon = ({ className }) => (
	<svg
		className={className}
		viewBox="0 0 24 24"
		fill="currentColor"
		aria-hidden="true"
	>
		<path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
	</svg>
);

const MailIcon = ({ className }) => (
	<svg
		className={className}
		viewBox="0 0 24 24"
		fill="none"
		stroke="currentColor"
		strokeWidth="2"
		aria-hidden="true"
	>
		<path d="m4 4 7.07 17L20 12 4 4Z" />
		<path d="m21 3-6.5 18a.55.55 0 0 1-1 0L7 14l-4-4 18 6.5Z" />
		<path d="M11 19 4 12l-3 5h7v2Z" />
	</svg>
);

const ContactIcon = ({ className }) => (
	<svg
		className={className}
		viewBox="0 0 24 24"
		fill="none"
		stroke="currentColor"
		strokeWidth="2"
		aria-hidden="true"
	>
		<rect width="20" height="16" x="2" y="4" rx="2" />
		<path d="m22 7-10 5L2 7" />
	</svg>
);

export default function Footer() {
	const currentYear = new Date().getFullYear();

	const socialLinks = [
		{
			href: "https://www.instagram.com/binswar13/",
			label: "حساب عقيل آل سوار على إنستغرام",
			icon: InstagramIcon,
			platform: "instagram",
		},
		{
			href: "https://twitter.com/Binswar",
			label: "حساب عقيل آل سوار على تويتر",
			icon: XIcon,
			platform: "twitter",
		},
		{
			href: "https://www.facebook.com/aQeel.swar/",
			label: "حساب عقيل آل سوار على فيسبوك",
			icon: FacebookIcon,
			platform: "facebook",
		},
	];

	return (
		<footer className="footer" dir="rtl">
			<div className="footer__container">
				{/* Main Footer Content */}
				<div className="footer__content">
					{/* Contact Section */}
					<div className="footer__contact">
						<h3 className="footer__contact-title">تواصلوا معنا</h3>
						<span className="footer__contact-link">
							<ContactIcon className="footer__contact-icon" />
							hawajesaqswar@gmail.com
						</span>
					</div>

					{/* Social Media Section */}
					<div className="footer__social">
						<h3 className="footer__social-title">
							حسابات عقيل سوار على مواقع التواصل الاجتماعي
						</h3>

						<div className="footer__social-links">
							{socialLinks.map(({ href, label, icon: Icon, platform }) => (
								<a
									key={platform}
									href={href}
									target="_blank"
									rel="noopener noreferrer"
									className={`footer__social-link footer__social-link--${platform}`}
									aria-label={label}
								>
									<Icon className="footer__social-icon" />
									<span className="sr-only">{label}</span>
								</a>
							))}
						</div>
					</div>
				</div>

				{/* Copyright Section */}
				<div className="footer__copyright">
					<p className="footer__copyright-text">
						جميع الحقوق محفوظة © {currentYear}
					</p>
				</div>
			</div>
		</footer>
	);
}
