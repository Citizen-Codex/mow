<script>
	import Button from "$components/ui/Button.svelte";
	import { session } from "$runes/misc.svelte.js";

	function done() {
		session.phase = "end";
	}
</script>

<section class="c">
	<h2>Coming soon</h2>
	<Button onclick={done}>Wrap it up</Button>
</section>

<style>
	.c {
		max-width: var(--grid-max-width);
		margin: 2rem auto;
		padding: 1rem;
		text-align: center;
	}

	button {
		margin-top: 1rem;
		padding: 0.5rem 1.25rem;
		cursor: pointer;
	}
</style>
