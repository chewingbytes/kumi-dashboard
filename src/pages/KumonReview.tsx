import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const articleSections = [
	{
		title: "The first week: fixing dismissal congestion",
		content:
			"Before using Kumi, dismissal time felt crowded and reactive. Parents often arrived in clusters, and staff had to manually check who was done. In our first week of implementation, we focused on one goal: make pickup timing predictable. The biggest win was not speed alone, it was visibility. Staff knew who was still studying, who had checked out, and which parent had already been notified.",
		image: "https://picsum.photos/seed/kumon-review-1/1000/760",
		imageAlt: "Kumon center dismissal flow mockup",
	},
	{
		title: "How students adapted to QR check-in and check-out",
		content:
			"Students adapted faster than expected. We placed the tablet station along their natural path and gave a short demo during class transitions. After two to three days, scanning became routine. The practical lesson for us was simple: if the station is visible and the instructions are clear, adoption follows naturally. We also prepared a quick fallback flow for students who forgot their code so classes would not be interrupted.",
		image: "https://picsum.photos/seed/kumon-review-2/1000/760",
		imageAlt: "Students scanning QR codes at a center",
	},
	{
		title: "Parent communication and trust outcomes",
		content:
			"The strongest feedback came from parents. Receiving timely departure updates reduced uncertainty and helped pickups happen in a calmer, more orderly way. From an operations standpoint, the center team spent less time handling repetitive status calls. From a trust standpoint, families appreciated clear communication and consistent timing. This article uses sample copy for now, but these are the kinds of implementation stories that matter most in real deployment.",
		image: "https://picsum.photos/seed/kumon-review-3/1000/760",
		imageAlt: "Parent notification experience mockup",
	},
];

export default function KumonReview() {
	return (
		<div className="min-h-screen bg-[#FFFDF5] text-[#1E293B] font-['DynaPuff'] overflow-x-hidden">
			<header className="sticky top-0 z-50 border-b-2 border-[#1E293B] bg-white/85 backdrop-blur-md">
				<div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
					<Link
						to="/"
						className="inline-flex items-center gap-2 text-sm text-[#475569] hover:text-[#1E293B]"
					>
						<ArrowLeft className="w-4 h-4" /> Back to Home
					</Link>
					<span className="text-sm text-[#64748B]">Kumon Center Review</span>
				</div>
			</header>

			<main className="max-w-5xl mx-auto px-6 py-12 md:py-16 space-y-14 md:space-y-16">
				<section className="space-y-6 text-left">
					<p className="inline-block text-sm px-4 py-1.5 rounded-full border-2 border-[#1E293B] bg-[#FDF2F8] shadow-[4px_4px_0px_#1E293B]">
						Center Implementation Article
					</p>
					<h1 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-[1.15]">
						Implementing Kumi at Kumon @ Punggol Plaza
					</h1>
					<p className="text-lg md:text-xl text-[#64748B] leading-relaxed max-w-3xl mx-auto md:mx-0">
						This page shares a sample long-form article layout with visuals and
						practical observations. The content is placeholder for now, but the
						structure is ready for real center stories, photos, and rollout
						outcomes.
					</p>
				</section>

				<section className="space-y-12 md:space-y-16">
					{articleSections.map((section, index) => {
						const isImageRight = index % 2 === 0;

						return (
							<article
								key={section.title}
								className={`grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-10 items-center ${
									isImageRight ? "" : "lg:[&>*:first-child]:order-2"
								}`}
							>
								<div className="space-y-4 md:space-y-5">
									<p className="text-sm text-[#64748B]">Section 0{index + 1}</p>
									<h2 className="text-3xl md:text-4xl font-bold leading-tight">
										{section.title}
									</h2>
									<p className="text-[#64748B] text-base md:text-lg leading-relaxed">
										{section.content}
									</p>
								</div>

								<div>
									<div className="relative">
										<div className="relative z-10 overflow-hidden rounded-tl-[80px] rounded-tr-[30px] rounded-br-[80px] rounded-bl-[30px] border-2 border-[#1E293B] bg-white shadow-[10px_10px_0px_#1E293B]">
											<img
												src={section.image}
												alt={section.imageAlt}
												className="w-full h-[280px] sm:h-[340px] object-cover mix-blend-multiply"
											/>
										</div>
										<div className="absolute -bottom-4 -left-4 z-0 h-full w-full rounded-tl-[80px] rounded-tr-[30px] rounded-br-[80px] rounded-bl-[30px] border-2 border-[#1E293B] bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI4IiBoZWlnaHQ9IjgiPgo8cmVjdCB3aWR0aD0iOCIgaGVpZ2h0PSI4IiBmaWxsPSIjRjFGNUY5Ii8+CjxjaXJjbGUgY3g9IjIiIGN5PSIyIiByPSIxIiBmaWxsPSIjQ0JENVExIi8+Cjwvc3ZnPg==')] opacity-50" />
									</div>
								</div>
							</article>
						);
					})}
				</section>

				<section className="rounded-3xl border-2 border-[#1E293B] bg-white p-8 md:p-10 shadow-[10px_10px_0px_#CBD5E1] text-center md:text-left">
					<h3 className="text-2xl md:text-3xl font-bold mb-3">What we would refine next</h3>
					<p className="text-[#64748B] text-base md:text-lg leading-relaxed">
						For the next version of this article, we can replace placeholder
						text with actual center anecdotes, include before/after metrics,
						and add real photos of check-in stations and parent pickup flow.
						The page is intentionally built to stay readable on mobile while
						still feeling visual and editorial on larger screens.
					</p>
				</section>
			</main>
		</div>
	);
}
