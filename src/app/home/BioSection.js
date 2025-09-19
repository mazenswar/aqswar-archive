import Link from "next/link";
import "./BioSection.scss";

const theatrePlays = [
	{
		href: "/theatre/baraha",
		title: "البراحة",
		year: "١٩٨٠",
	},
	{
		href: "/theatre/rajol",
		title: "رجل من عامة الناس",
		year: "١٩٨٤",
		note: "فازت بجائزة وزارة الإعلام البحرينية كأفضل نص مسرحي وشاركت في مهرجان بغداد المسرحي في ١٩٨٧",
	},
	{
		href: "/theatre/bint",
		title: "بنت النوخذة",
		year: "١٩٨٦",
	},
	{
		href: "/theatre/khamees",
		title: "خميس وجمعة",
		year: "١٩٨٩",
	},
	{
		href: "/theatre/afa",
		title: "أفا يا عبيد",
		year: "١٩٨٩",
	},
	{
		href: "/theatre/soug",
		title: "سوق المقاصيص",
		year: "١٩٩١",
	},
	{
		href: "/theatre/juwaira",
		title: "جويرة",
		year: "١٩٩٧",
		note: "الورشة المسرحية مع المخرج العراقي الراحل د.عوني كرومي",
	},
	{
		href: "/theatre/rab",
		title: "ربع المكدة",
		year: "٢٠١٠",
	},
	{
		href: "/theatre/tafateef",
		title: "الطفاطيف",
		year: "٢٠١٦",
	},
];

export default function BioSection() {
	return (
		<section className="bio-section content-section" dir="rtl">
			<div className="container">
				{/* Introduction */}
				<div className="bio-section__intro subs">
					<p className="bio-section__paragraph">
						عقيل خليل إبراهيم آل سوار ، مصورٌ، وكاتبٌ صحفي وأدبي من مواليد
						المنامة سنة ١٩٤٥، متزوج وله ابنتين وولد، وحفيدتان.
					</p>
					<p className="bio-section__paragraph">
						بدأ حياته العملية موظفًا في قسم التموين في شركة طيران الخليج، ولكنه
						باكتشافه شغفه بالتصوير الفوتوغرافي أنشأ مؤسسة {"بنسوار"} للتصوير،
						كما كان المصور الرسمي لشركة طيران الخليج وفندق الخليج في العام ١٩٧٠.
						قاده شغفه بالتصوير إلى عالم الصحافة، فبدأ مشواره صحفيًا في مجلة صدى
						الأسبوع (الأسبوعية) من العام ١٩٧٣ وحتى ١٩٧٧، ليعود إليها في ١٩٨٢
						مديرًا للتحرير.
					</p>
				</div>

				{/* Career Journey */}
				<div className="bio-section__career subs">
					<p className="bio-section__paragraph">
						في عام ١٩٨٣ ساهم في تأسيس وإدارة تحرير مجلة بانوراما الخليج
						(الشهرية) مع الأستاذ إبراهيم بشمي. وبين عامي ١٩٨٦ و١٩٩٦ بدأ بكتابة
						عمودٍ يومي في جريدة أخبار الخليج بعنوان {"هواجس"}، وانتقل بعموده
						اليومي في العام ١٩٩٧ إلى جريدة الأيام، واستمر في كتابته حتى العام
						٢٠٠٥. في العام ٢٠٠٥ باشر العمل في جريدة الوطن مقدمًا ورشًا تدريبية
						للصحفيين، قبل أن يعاود كتابة عموده اليومي {"هواجس"} حتى تقاعده في
						٢٠١٢.
					</p>
				</div>

				{/* Theatre Work */}
				<div className="bio-section__theatre subs">
					<p className="bio-section__paragraph">
						بعد التقاعد، واصل آل سوار نشر كتابات، ومواويل شعبية، وصور فوتوغرافية
						من أرشيفه على حساباته في مواقع التواصل الاجتماعي، والتي حظيت بتفاعل
						كبير ومميز من قبل قرائه ومتابعيه على تلك المواقع، كما كانت له تجربة
						ثرية في مجال الكتابة المسرحية بدأها منذ مطلع الثمانينات، حيث تولى
						مسرح أوال إنتاج أغلب مسرحياته وهي:
					</p>

					<ul className="bio-section__plays-list ul">
						{theatrePlays.map((play, index) => (
							<li key={index} className="bio-section__play-item">
								<Link
									href={play.href}
									className="bio-section__play-link"
									aria-label={`اقرأ عن مسرحية ${play.title}`}
								>
									<span className="bio-section__play-title">{play.title}</span>
									<span className="bio-section__play-year">({play.year})</span>
									{play.note && (
										<span className="bio-section__play-note">
											- {play.note}
										</span>
									)}
								</Link>
							</li>
						))}
					</ul>
				</div>

				{/* Publications */}
				<div className="bio-section__publications subs">
					<p className="bio-section__paragraph">
						لم تتوقف ابداعاته الأدبية عند المسرح، فله كتابان في مجال أدب الطفل
						هما {"حكاية قوس قزح"} و{"هولاكو والأسرى الأربعة"} الصادرة عن دائرة
						ثقافة الأطفال التابعة لوزارة الثقافة والإعلام العراقية؛ وله إصداران
						في مجال المواويل الشعبية: {"مواويل بحرينية"} الصادر عام 1994، و
						{"مكاكة عشق"} الصادر عام 2018 عن المؤسسة العربية للدراسات والنشر
						وهيئة البحرين للثقافة والآثار.
					</p>
				</div>
			</div>
		</section>
	);
}
