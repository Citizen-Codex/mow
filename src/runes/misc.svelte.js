export const game = $state({ active: true, completed: false, path: [] });

export const session = $state({
	phase: "intro",
	userId: null,
	platform: null,
	demographics: null,
	email: null
});

export function resetSession() {
	session.phase = "intro";
	session.userId = null;
	session.platform = null;
	session.demographics = null;
	session.email = null;
}
