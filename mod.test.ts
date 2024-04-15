import { assertEquals } from "STD/assert/assert_equals.ts";
import { assertThrows } from "STD/assert/assert_throws.ts";
import { HTTPHeaderLink } from "./mod.ts";
Deno.test("From String Good 1", { permissions: "none" }, () => {
	const instance = new HTTPHeaderLink(`<https://example.com>; rel="preconnect"`);
	assertEquals(instance.hasParameter("rel", "preconnect"), true);
	assertEquals(instance.hasParameter("rel", "connect"), false);
	assertEquals(instance.hasParameter("rel", "postconnect"), false);
	assertEquals(instance.getByRel("preconnect")[0][0], "https://example.com");
});
Deno.test("From String Good 2", { permissions: "none" }, () => {
	const instance = new HTTPHeaderLink(`<https://example.com>; rel=preconnect`);
	assertEquals(instance.hasParameter("rel", "preconnect"), true);
	assertEquals(instance.hasParameter("rel", "connect"), false);
	assertEquals(instance.hasParameter("rel", "postconnect"), false);
	assertEquals(instance.getByRel("preconnect")[0][0], "https://example.com");
});
Deno.test("From String Good 3", { permissions: "none" }, () => {
	const instance = new HTTPHeaderLink(`<https://example.com/%E8%8B%97%E6%9D%A1>; rel="preconnect"`);
	assertEquals(instance.hasParameter("rel", "preconnect"), true);
	assertEquals(instance.hasParameter("rel", "connect"), false);
	assertEquals(instance.hasParameter("rel", "postconnect"), false);
	assertEquals(instance.getByRel("preconnect")[0][0], "https://example.com/苗条");
});
Deno.test("From String Good 4", { permissions: "none" }, () => {
	const instance = new HTTPHeaderLink(`<https://one.example.com>; rel="preconnect", <https://two.example.com>; rel="preconnect", <https://three.example.com>; rel="preconnect"`);
	assertEquals(instance.hasParameter("rel", "preconnect"), true);
	assertEquals(instance.hasParameter("rel", "connect"), false);
	assertEquals(instance.hasParameter("rel", "postconnect"), false);
	assertEquals(instance.getByRel("preconnect")[0][0], "https://one.example.com");
	assertEquals(instance.getByRel("preconnect")[1][0], "https://two.example.com");
	assertEquals(instance.getByRel("preconnect")[2][0], "https://three.example.com");
});
Deno.test("From String Good 5", { permissions: "none" }, () => {
	const instance = new HTTPHeaderLink(``);
	assertEquals(instance.hasParameter("rel", "preconnect"), false);
	assertEquals(instance.hasParameter("rel", "connect"), false);
	assertEquals(instance.hasParameter("rel", "postconnect"), false);
	assertEquals(instance.entries().length, 0);
});
Deno.test("From Entries Good 1", { permissions: "none" }, () => {
	const instance = new HTTPHeaderLink([["https://one.example.com", { rel: "preconnect" }]]);
	assertEquals(instance.hasParameter("rel", "preconnect"), true);
	assertEquals(instance.entries().length, 1);
	assertEquals(instance.toString(), `<https://one.example.com>; rel="preconnect"`);
});
Deno.test("From String Bad 1", { permissions: "none" }, () => {
	assertThrows(() => {
		new HTTPHeaderLink(`https://bad.example; rel="preconnect"`);
	});
});
