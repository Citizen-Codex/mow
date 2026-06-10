// Cache rendered pages at the edge (ISR), regenerating at most once an hour
export const config = { isr: { expiration: 3600 } };

export const load = async ({ fetch }) => {
	let stories = [];
	const res = await fetch("https://cc-content-stories.vercel.app/stories.json");

	if (res.ok) {
		stories = await res.json();
	}

	return {
		relatedStories: stories
	};
};

