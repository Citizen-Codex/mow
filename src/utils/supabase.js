import { createClient } from "@supabase/supabase-js";
import { dev } from "$app/environment";

// TODO migration — run in Supabase SQL editor:
//
// alter table mow_test
//   add column if not exists level text,
//   add column if not exists platform text;
//
// create table if not exists mow_users (
//   id text primary key,
//   email text,
//   age text,
//   mowing_style text,
//   gaming_frequency text,
//   handedness text,
//   optimization_frequency text,
//   created_at timestamptz default now(),
//   updated_at timestamptz default now()
// );

let supabase;

function init() {
	if (supabase) return;
	supabase = createClient(
		"https://dbmtysppmiwwjwaeneex.supabase.co",
		"sb_publishable_FI1g75Q3gDIw-HXVxx_hGA_p8mXjVkz"
	);
}

async function insertAttempt({ user, level, platform, result }) {
	if (dev) {
		console.log("[dev] skipping insertAttempt", {
			user,
			level,
			platform,
			moves: result.length
		});
		return;
	}
	init();
	const { error } = await supabase.from("mow_test").insert({
		user,
		level,
		platform,
		result: JSON.stringify(result)
	});
	if (error) {
		console.log(error);
		throw error;
	}
}

async function upsertUser({ id, email, demographics }) {
	if (dev) {
		console.log("[dev] skipping upsertUser", { id, email, demographics });
		return;
	}
	init();
	const row = {
		id,
		email: email ?? null,
		age: demographics?.age ?? null,
		mowing_style: demographics?.mowingStyle ?? null,
		gaming_frequency: demographics?.gaming ?? null,
		handedness: demographics?.handedness ?? null,
		optimization_frequency: demographics?.optimization ?? null,
		updated_at: new Date().toISOString()
	};
	const { error } = await supabase
		.from("mow_users")
		.upsert(row, { onConflict: "id" });
	if (error) {
		console.log(error);
		throw error;
	}
}

export default { init, insertAttempt, upsertUser };
