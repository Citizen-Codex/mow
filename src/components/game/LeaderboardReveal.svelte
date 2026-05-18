<script>
	import { session } from "$runes/misc.svelte.js";

	const avgEfficiency = $derived(() => {
		const values = Object.values(session.levelEfficiencies);
		if (!values.length) return null;
		const a = values.reduce((a, b) => a + b, 0) / values.length;
		return +(a * 100).toFixed(1);
	});
</script>

<div class="c">
	<h2>Thanks for mowing!</h2>
	{#if avgEfficiency() !== null}
		<p class="big">
			You mowed <strong>{avgEfficiency()}% optimally</strong>. TODO X% behind
			the top player!
		</p>
	{/if}
</div>

<style>
	.c {
		text-align: center;
	}

	.big {
		font-size: var(--20px);
		margin: 1rem 0;
	}
</style>
