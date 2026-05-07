<script>
	import Button from "$components/ui/Button.svelte";

	let { onSubmit, onSkip } = $props();

	let email = $state("");
	let error = $state("");

	const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

	function submit() {
		const trimmed = email.trim();
		if (!trimmed) {
			error = "Please enter an email or skip.";
			return;
		}
		if (!re.test(trimmed)) {
			error = "That doesn't look like an email.";
			return;
		}
		error = "";
		onSubmit(trimmed);
	}
</script>

<div class="c">
	<h2>Get notified when the story drops</h2>
	<p>We'll publish the analysis in 1-2 weeks. No other emails, ever.</p>

	<div class="row">
		<input
			type="email"
			placeholder="you@example.com"
			bind:value={email}
			onkeydown={(e) => e.key === "Enter" && submit()}
		/>
	</div>
	{#if error}<p class="error">{error}</p>{/if}

	<div class="actions">
		<Button variant="primary" onclick={submit}>Notify me</Button>
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
