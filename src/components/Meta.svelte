<script>
	import { dev } from "$app/environment";
	import { injectAnalytics } from "@vercel/analytics/sveltekit";

	if (import.meta.env.VITE_SITE == "citizencodex")
		injectAnalytics({ mode: dev ? "development" : "production" });

	let {
		title = "Lawn Mowing Experiment",
		description = "Mow a series of lawns as efficiently as you can. We will publish the analysis in a couple of weeks.",
		url = "https://mow.citizencodex.com/",
		author = "Citizen Codex",
		website = "https://www.citizencodex.com/",
		handle = "citizencodex",
		keywords = "",
		preloadFont = []
	} = $props();
</script>

<svelte:head>
	<title>{title}</title>
	<meta name="description" content={description} />
	<meta name="author" content={author} />
	<meta name="news_keywords" content={keywords} />

	<meta property="og:title" content={title} />
	<meta property="og:site_name" content={author} />
	<meta property="og:url" content={url} />
	<meta property="og:description" content={description} />
	<meta property="og:type" content="article" />
	<meta property="og:locale" content="en_US" />

	<meta property="og:image" content="{url}/assets/og.png" />
	<meta property="og:image:type" content="image/png" />
	<meta property="og:image:width" content="1200" />
	<meta property="og:image:height" content="630" />

	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:site" content={website} />
	<meta name="twitter:creator" content="@{handle}" />
	<meta name="twitter:title" content={title} />
	<meta name="twitter:description" content={description} />
	<meta name="twitter:image:src" content="{url}/assets/og.png" />

	<meta name="robots" content="max-image-preview:large" />

	<link rel="canonical" href="{url}/" />

	{#each preloadFont as href}
		<link rel="preload" {href} as="font" type="font/woff2" crossorigin />
	{/each}
</svelte:head>
