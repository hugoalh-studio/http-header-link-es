# HTTP Header Link (ES)

[**⚖️** MIT](./LICENSE.md)

[![GitHub: hugoalh/http-header-link-es](https://img.shields.io/github/v/release/hugoalh/http-header-link-es?label=hugoalh/http-header-link-es&labelColor=181717&logo=github&logoColor=ffffff&sort=semver&style=flat "GitHub: hugoalh/http-header-link-es")](https://github.com/hugoalh/http-header-link-es)
[![JSR: @hugoalh/http-header-link](https://img.shields.io/jsr/v/@hugoalh/http-header-link?label=@hugoalh/http-header-link&labelColor=F7DF1E&logo=jsr&logoColor=000000&style=flat "JSR: @hugoalh/http-header-link")](https://jsr.io/@hugoalh/http-header-link)
[![NPM: @hugoalh/http-header-link](https://img.shields.io/npm/v/@hugoalh/http-header-link?label=@hugoalh/http-header-link&labelColor=CB3837&logo=npm&logoColor=ffffff&style=flat "NPM: @hugoalh/http-header-link")](https://www.npmjs.com/package/@hugoalh/http-header-link)

An ES (JavaScript & TypeScript) module to handle the [HTTP header `Link`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Link) according to the specification [RFC 8288](https://httpwg.org/specs/rfc8288.html#header).

## 🔰 Begin

### 🎯 Targets

|  | **Remote** | **JSR** | **NPM** |
|:--|:--|:--|:--|
| **[Bun](https://bun.sh/)** >= v1.1.0 | ❌ | ❓ | ✔️ |
| **[Cloudflare Workers](https://workers.cloudflare.com/)** | ❌ | ❓ | ✔️ |
| **[Deno](https://deno.land/)** >= v1.42.0 | ✔️ | ✔️ | ✔️ |
| **[NodeJS](https://nodejs.org/)** >= v16.13.0 | ❌ | ❓ | ✔️ |

> [!NOTE]
> - It is possible to use this module in other methods/ways which not listed in here, however those methods/ways are not officially supported, and should beware maybe cause security issues.

### #️⃣ Resources Identifier

- **Remote - GitHub Raw:**
  ```
  https://raw.githubusercontent.com/hugoalh/http-header-link-es/{Tag}/mod.ts
  ```
- **JSR:**
  ```
  [jsr:]@hugoalh/http-header-link[@{Tag}]
  ```
- **NPM:**
  ```
  [npm:]@hugoalh/http-header-link[@{Tag}]
  ```

> [!NOTE]
> - For usage of remote resources, it is recommended to import the entire module with the main path `mod.ts`, however it is also able to import part of the module with sub path if available, but do not import if:
>
>   - it's path has an underscore prefix (e.g.: `_foo.ts`, `_util/bar.ts`), or
>   - it is a benchmark or test file (e.g.: `foo.bench.ts`, `foo.test.ts`), or
>   - it's symbol has an underscore prefix (e.g.: `_bar`, `_foo`).
>
>   These elements are not considered part of the public API, thus no stability is guaranteed for them.
> - For usage of JSR or NPM resources, it is recommended to import the entire module with the main entrypoint, however it is also able to import part of the module with sub entrypoint if available, please visit the [file `jsr.jsonc`](./jsr.jsonc) property `exports` for available sub entrypoints.
> - It is recommended to use this module with tag for immutability.

### 🛡️ Require Runtime Permissions

*This module does not require any runtime permission.*

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

> [!NOTE]
> - For the prettier documentation, can visit via:
>   - [Deno CLI `deno doc`](https://docs.deno.com/runtime/reference/cli/documentation_generator/)
>   - [JSR](https://jsr.io/@hugoalh/http-header-link)

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
