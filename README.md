# HTTP Header Link (ES)

[**⚖️** MIT](./LICENSE.md)

[![GitHub: hugoalh-studio/http-header-link-es](https://img.shields.io/github/v/release/hugoalh-studio/http-header-link-es?label=hugoalh-studio/http-header-link-es&labelColor=181717&logo=github&logoColor=ffffff&sort=semver&style=flat "GitHub: hugoalh-studio/http-header-link-es")](https://github.com/hugoalh-studio/http-header-link-es)
[![JSR: @hugoalh/http-header-link](https://img.shields.io/jsr/v/@hugoalh/http-header-link?label=JSR%20@hugoalh/http-header-link&labelColor=F7DF1E&logoColor=000000&style=flat "JSR: @hugoalh/http-header-link")](https://jsr.io/@hugoalh/http-header-link)
[![NPM: @hugoalh/http-header-link](https://img.shields.io/npm/v/@hugoalh/http-header-link?label=@hugoalh/http-header-link&labelColor=CB3837&logo=npm&logoColor=ffffff&style=flat "NPM: @hugoalh/http-header-link")](https://www.npmjs.com/package/@hugoalh/http-header-link)

An ES (JavaScript & TypeScript) module to handle the [HTTP header `Link`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Link) according to the specification [RFC 8288](https://httpwg.org/specs/rfc8288.html#header).

## 🔰 Begin

### 🎯 Targets

|  | **Registry - JSR** | **Registry - NPM** | **Remote Import** |
|:--|:--|:--|:--|
| **Bun** >= v1.1.0 | [✔️ `node_modules`](https://jsr.io/docs/npm-compatibility) | [✔️ Specifier `npm:`](https://bun.sh/docs/runtime/autoimport) | ❌ |
| **Cloudflare Workers** | [✔️ `node_modules`](https://jsr.io/docs/with/cloudflare-workers) | [✔️ `node_modules`](https://docs.npmjs.com/using-npm-packages-in-your-projects) | ❌ |
| **Deno** >= v1.42.0 | [✔️ Specifier `jsr:`](https://jsr.io/docs/with/deno) | [✔️ Specifier `npm:`](https://docs.deno.com/runtime/manual/node/npm_specifiers) | [✔️](https://docs.deno.com/runtime/manual/basics/modules/#remote-import) |
| **NodeJS** >= v16.13.0 | [✔️ `node_modules`](https://jsr.io/docs/with/node) | [✔️ `node_modules`](https://docs.npmjs.com/using-npm-packages-in-your-projects) | ❌ |

> **ℹ️ Note**
>
> It is possible to use this module in other ways which not listed in here, however it is not officially supported.

### #️⃣ Registries Identifier

<table>
<tr>
<th>JSR</th>
<td width="100%">

```
@hugoalh/http-header-link
```

</td>
</tr>
<tr>
<th>NPM</th>
<td width="100%">

```
@hugoalh/http-header-link
```

</td>
</tr>
</table>

> **ℹ️ Note**
>
> - Although it is recommended to import the entire module, it is also able to import part of the module with sub path if available, please visit [file `jsr.jsonc`](./jsr.jsonc) property `exports` for available sub paths.
> - It is recommended to use this module with tag for immutability.

### #️⃣ Remote Import Paths

- Via GitHub Raw (Require Tag)
  ```
  https://raw.githubusercontent.com/hugoalh-studio/http-header-link-es/${Tag}/mod.ts
  ```

> **ℹ️ Note**
>
> - Although it is recommended to import the entire module with the main path `mod.ts`, it is also able to import part of the module with sub path if available, but do not import if:
>
>   - it's file path has an underscore prefix (e.g.: `_foo.ts`, `_util/bar.ts`), or
>   - it is a benchmark or test file (e.g.: `foo.bench.ts`, `foo.test.ts`), or
>   - it's symbol has an underscore prefix (e.g.: `export function _baz() {}`).
>
>   These elements are not considered part of the public API, thus no stability is guaranteed for them.
> - Although there have 3rd party services which provide enhanced, equal, or similar methods/ways to remote import the module, beware these services maybe inject unrelated elements and thus affect the security.

### 🛡️ Permissions

*This module does not require any permission.*

## 🧩 APIs

- ```ts
  class HTTPHeaderLink {
    constructor(input?: string | Headers | HTTPHeaderLink | HTTPHeaderLinkEntry[] | Response): this;
    add(input: string | Headers | HTTPHeaderLink | HTTPHeaderLinkEntry[] | Response): this;
    entries(): HTTPHeaderLinkEntry[];
    getByParameter(key: string, value: string): HTTPHeaderLinkEntry[];
    getByRel(value: string): HTTPHeaderLinkEntry[];
    hasParameter(key: string, value: string): boolean;
    toString(): string;
    static parse(input: string | Headers | HTTPHeaderLink | Response): HTTPHeaderLink;
    static stringify(input: HTTPHeaderLinkEntry[]): string;
  }
  ```
- ```ts
  type HTTPHeaderLinkEntry = [
    uri: string,
    parameters: { [key: string]: string; }
  ];
  ```

> **ℹ️ Note**
>
> For the prettier documentation, can visit via:
>
> - [Deno CLI `deno doc`](https://deno.land/manual/tools/documentation_generator)
> - [JSR](https://jsr.io/@hugoalh/http-header-link)

## ✍️ Examples

- ```ts
  new HTTPHeaderLink(`<https://example.com>; rel="preconnect"`);
  /*=>
  HTTPHeaderLink [
    ["https://example.com", { rel: "preconnect" }]
  ]
  */
  ```
- ```ts
  new HTTPHeaderLink(`<https://example.com/%E8%8B%97%E6%9D%A1>; rel="preconnect"`);
  /*=>
  HTTPHeaderLink [
    ["https://example.com/苗条", { rel: "preconnect" }]
  ]
  */
  ```
