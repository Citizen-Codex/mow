<script>
	import Button from "$components/ui/Button.svelte";

	let { onSubmit, onSkip } = $props();

	let name = $state("");
	let error = $state("");

	function submit() {
		const trimmed = name.trim();
		if (!trimmed) {
			error = "Please enter a name or skip.";
			return;
		}
		error = "";
		onSubmit(trimmed);
	}
</script>

<div class="c">
	<h2>Add your name to the leaderboard</h2>
	<p>Your name will appear next to your score.</p>

	<div class="row">
		<input
			type="text"
			placeholder="Your name or initials"
			maxlength="15"
			bind:value={name}
			onkeydown={(e) => e.key === "Enter" && submit()}
		/>
	</div>
	{#if error}<p class="error">{error}</p>{/if}

	<div class="actions">
		<Button variant="primary" onclick={submit}>Add me</Button>
		<Button variant="ghost" onclick={onSkip}>Skip</Button>
	</div>
</div>

<style>
	.c {
		max-width: 28rem;
		margin: 0 auto;
		text-align: center;
	}

	.row {
		margin-top: 1rem;
	}

	input {
		width: 100%;
		padding: 0.5rem 0.75rem;
		font-size: var(--16px);
		border: 1px solid var(--color-gray-500);
	}

	.error {
		color: var(--color-red);
		font-size: var(--14px);
		margin-top: 0.5rem;
	}

	.actions {
		display: flex;
		gap: 0.75rem;
		justify-content: center;
		margin-top: 1rem;
	}
</style>
