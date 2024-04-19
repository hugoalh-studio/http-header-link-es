import { HTTPHeaderLink } from "./mod.ts";
Deno.bench("String 1", { permissions: "none" }, () => {
	new HTTPHeaderLink(`<https://one.example.com>; rel="preconnect", <https://two.example.com>; rel="preconnect", <https://three.example.com>; rel="preconnect"`);
});
Deno.bench("Entries 1", { permissions: "none" }, () => {
	new HTTPHeaderLink([
		["https://one.example.com", { rel: "preconnect" }],
		["https://two.example.com", { rel: "preconnect" }],
		["https://three.example.com", { rel: "preconnect" }]
	]);
});
