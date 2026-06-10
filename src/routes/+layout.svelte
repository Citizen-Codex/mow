<script>
	import "$styles/app.css";
	import Header from "$components/Header.svelte";
	import "iconify-icon";

	let { children } = $props();
</script>

<Header />
<main id="content">
	{@render children?.()}
</main>
