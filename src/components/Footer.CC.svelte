<script lang="ts">
	import citizen from "$svg/logo-citizen.svg";
	import { page } from "$app/state";
	import type { EmblaCarouselType } from "embla-carousel";
	import emblaCarouselSvelte from "embla-carousel-svelte";

	const PUBLISHER_URL = "https://citizencodex.com";

	const socials = [
		{
			title: "Instagram",
			href: "https://www.instagram.com/citizen.codex",
			icon: "mdi:instagram"
		},
		{
			title: "LinkedIn",
			href: "https://www.linkedin.com/company/citizen-codex/",
			icon: "mdi:linkedin"
		},
		{
			title: "X",
			href: "https://x.com/citizencodex",
			icon: "fa6-brands:x-twitter"
		},
		{
			title: "GitHub",
			href: "https://github.com/Citizen-Codex",
			icon: "mdi:github"
		}
	];

	const links = [
		{ title: "Work", href: `${PUBLISHER_URL}/our-work` },
		{ title: "Services", href: `${PUBLISHER_URL}/services` },
		{ title: "Ventures", href: `${PUBLISHER_URL}/ventures` },
		{ title: "Research", href: `${PUBLISHER_URL}/research` },
		{ title: "About", href: `${PUBLISHER_URL}/about-us` },
		{
			title: "hello@citizencodex.com",
			href: "mailto:hello@citizencodex.com?subject=Website%20Enquiry"
		}
	];

	const relatedStories = $derived<RelatedStory[] | undefined>(
		page.data.relatedStories?.filter(
			(story: RelatedStory) => story.title !== page.data.title
		)
	);

	interface Props {
		theme: "dark" | "light" | "accent";
		disabled?: boolean;
	}

	let { theme = "dark", disabled = false, ...rest }: Props = $props();

	const options = {};

	let carousel = $state<EmblaCarouselType>();
	let activeIndex = $state(0);
	let canScrollNext = $state(false);
	let canScrollPrev = $state(false);

	const onInit = (event) => {
		carousel = event.detail;
		setCarouselState();

		carousel?.on("select", () => {
			setCarouselState();
		});
	};

	const setCarouselState = () => {
		if (!carousel) return;

		activeIndex = carousel.selectedScrollSnap();
		canScrollNext = carousel.canScrollNext();
		canScrollPrev = carousel.canScrollPrev();
	};
</script>

<footer class={theme}>
	<div class="c">
		{#if Array.isArray(relatedStories) && relatedStories.length > 0}
			<div class="further-reads">
				<p class="cc-detail-md uppercase">Further Reads</p>
				<div
					class="embla"
					use:emblaCarouselSvelte={{ options, plugins: [] }}
					onemblaInit={onInit}
				>
					<div class="embla__container">
						{#each relatedStories as story (story.title)}
							<div class="embla__slide">
								<a href={story.link} target="_blank" class="story">
									<img src={story.thumbnail} alt={story.title} />
									<div class="story-text">
										<p class="cc-display-xs">{story.title}</p>
										<p class="cc-detail-sm story-author">{story.author}</p>
									</div>
								</a>
							</div>
						{/each}
					</div>
				</div>

				{#if canScrollNext || canScrollPrev}
					<div class="carousel-nav">
						<button
							onclick={carousel?.scrollPrev}
							disabled={!canScrollPrev}
							aria-label="Previous"
						>
							<iconify-icon
								icon="material-symbols:arrow-back-ios-new-rounded"
								class="icon-prev"
							></iconify-icon>
						</button>
						<button
							onclick={carousel?.scrollNext}
							disabled={!canScrollNext}
							aria-label="Next"
						>
							<iconify-icon
								icon="material-symbols:arrow-forward-ios-rounded"
								class="icon-next"
							></iconify-icon>
						</button>
					</div>
				{/if}
			</div>
		{/if}

		<div class="info">
			<div class="wordmark">
				<a href={page.data.publisher_url} aria-current="page">{@html citizen}</a
				>
			</div>

			<div class="links cc-detail-sm">
				{#each links as { title, href } (title)}
					<a {href}>{title}</a>
				{/each}
			</div>

			<div class="meta">
				<div class="copyright cc-detail-xs">
					2025 Copyright, Citizen Codex LLC.
				</div>
				<div class="socials">
					{#each socials as { title, href, icon } (title)}
						<a {href} target="_blank" class="social" aria-label={title}>
							<iconify-icon {icon}></iconify-icon>
						</a>
					{/each}
				</div>
			</div>
		</div>
	</div>
</footer>

<style>
	footer {
		padding: 32px 16px;
	}

	footer.dark {
		background-color: var(--cc-night);
		color: var(--color-white);
	}

	footer.light {
		background-color: var(--color-white);
		color: var(--color-black);
	}

	footer.accent {
		background-color: var(--cc-cream);
		color: var(--color-black);
	}

	.c {
		max-width: 72rem;
		margin: 0 auto;
		display: flex;
		flex-direction: column;
		gap: 48px;
		overflow: hidden;
	}

	.uppercase {
		text-transform: uppercase;
	}

	.further-reads {
		display: flex;
		flex-direction: column;
		gap: 24px;
	}

	.embla {
		width: 100%;
		max-width: 64rem;
	}

	.embla__container {
		display: flex;
	}

	.embla__slide {
		margin-right: 24px;
		min-width: 0;
		flex: 0 0 auto;
	}

	.story {
		display: flex;
		width: fit-content;
		flex-direction: column;
		align-items: flex-start;
		gap: 8px;
		border-radius: 4px;
		transition: transform calc(var(--1s) * 0.3);
	}

	.story:hover {
		transform: translateY(-8px);
	}

	.story img {
		width: 16rem;
		object-fit: cover;
	}

	.story-text {
		max-width: 250px;
		display: flex;
		flex-direction: column;
		gap: 4px;
	}

	.story-author {
		font-weight: 500;
		text-transform: uppercase;
	}

	.carousel-nav {
		display: flex;
		align-items: center;
		gap: 8px;
	}

	.carousel-nav button {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 32px;
		height: 32px;
		border: 1px solid currentColor;
		border-radius: 50%;
		background: none;
		color: inherit;
		cursor: pointer;
	}

	.carousel-nav button:disabled {
		opacity: 0.4;
		cursor: default;
	}

	.icon-prev {
		margin-right: 2px;
	}

	.icon-next {
		margin-left: 2px;
	}

	.info {
		display: flex;
		width: 100%;
		flex-direction: column;
		gap: 24px;
		border-top: 1px solid currentColor;
		padding-top: 32px;
	}

	.wordmark {
		width: 175px;
	}

	.links {
		display: flex;
		flex-wrap: wrap;
		column-gap: 24px;
		row-gap: 8px;
		margin-bottom: 4px;
	}

	.links a:hover {
		text-decoration: underline;
	}

	.meta {
		display: flex;
		width: 100%;
		flex-wrap: wrap;
		align-items: flex-end;
		justify-content: space-between;
		gap: 12px;
	}

	.socials {
		display: flex;
		align-items: center;
		gap: 8px;
	}

	.social {
		height: fit-content;
		transition: transform calc(var(--1s) * 0.15);
	}

	.social:hover {
		transform: scale(1.1);
	}

	.social iconify-icon {
		height: 20px;
		font-size: var(--24px);
	}

	a {
		color: inherit;
		text-decoration: none;
	}

	p {
		margin: 0;
		color: inherit;
	}

	@media only screen and (min-width: 768px) {
		footer {
			padding-left: 24px;
			padding-right: 24px;
		}
	}
</style>
