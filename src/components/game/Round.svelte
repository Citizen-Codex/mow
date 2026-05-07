<script>
	import Game from "$components/Game.svelte";
	import db from "$utils/supabase.js";
	import { session } from "$runes/misc.svelte.js";
	import levels from "$data/levels.json";

	let { id, label, startMessage, nextPhase } = $props();

	const level = levels.find((l) => l.id === id);

	let saving = $state(false);

	async function onComplete(path) {
		saving = true;
		try {
			await db.insertAttempt({
				user: session.userId,
				level: id,
				platform: session.platform,
				result: path
			});
		} catch (error) {
			console.error("Error saving attempt:", error);
		} finally {
			saving = false;
			setTimeout(() => {
				session.phase = nextPhase;
			}, 1500);
		}
	}
</script>

<section class="c">
	<p class="label"><em>{label}</em></p>
	<p><strong>How efficiently can you mow this lawn?</strong></p>
	<Game
		size={level.size}
		obstacles={level.obstacles}
		{onComplete}
		{startMessage}
	/>
	{#if saving}
		<p class="saving"><small>Saving…</small></p>
	{/if}
</section>

<style>
	.c {
		max-width: var(--grid-max-width);
		margin: 2rem auto;
		padding: 1rem;
	}

	.label {
		color: var(--color-purple);
		margin-bottom: 0.25rem;
	}

	.saving {
		text-align: center;
		color: var(--color-fg-light);
	}
</style>
