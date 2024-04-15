# HTTP Header Link (ES)

[**⚖️** MIT](./LICENSE.md)

[![GitHub: hugoalh-studio/http-header-link-es](https://img.shields.io/github/v/release/hugoalh-studio/http-header-link-es?label=hugoalh-studio/http-header-link-es&labelColor=181717&logo=github&logoColor=ffffff&sort=semver&style=flat "GitHub: hugoalh-studio/http-header-link-es")](https://github.com/hugoalh-studio/http-header-link-es)
[![JSR: @hugoalh/http-header-link](https://img.shields.io/jsr/v/@hugoalh/http-header-link?label=JSR%20@hugoalh/http-header-link&labelColor=F7DF1E&logoColor=000000&style=flat "JSR: @hugoalh/http-header-link")](https://jsr.io/@hugoalh/http-header-link)
[![NPM: @hugoalh/http-header-link](https://img.shields.io/npm/v/@hugoalh/http-header-link?label=@hugoalh/http-header-link&labelColor=CB3837&logo=npm&logoColor=ffffff&style=flat "NPM: @hugoalh/http-header-link")](https://www.npmjs.com/package/@hugoalh/http-header-link)

An ES (JavaScript & TypeScript) module to handle [HTTP header `Link`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Link) according to [RFC 8288](https://httpwg.org/specs/rfc8288.html#header) standard.

## 🎯 Target

- Bun ^ v1.0.0
- Cloudflare Workers
- Deno >= v1.34.0 / >= v1.41.1 (For JSR Only)
  > **🛡️ Require Permission**
  >
  > *N/A*
- NodeJS >= v16.13.0

## 🔰 Usage

### Via JSR With `node_modules`

> **🎯 Supported Target**
>
> - Bun
> - Cloudflare Workers
> - NodeJS

1. Install via:
    - Bun
      ```sh
      bunx jsr add @hugoalh/http-header-link[@${Tag}]
      ```
    - NPM
      ```sh
      npx jsr add @hugoalh/http-header-link[@${Tag}]
      ```
    - PNPM
      ```sh
      pnpm dlx jsr add @hugoalh/http-header-link[@${Tag}]
      ```
    - Yarn
      ```sh
      yarn dlx jsr add @hugoalh/http-header-link[@${Tag}]
      ```
2. Import at the script:
    ```ts
    import ... from "@hugoalh/http-header-link";
    ```

> **ℹ️ Note**
>
> - Although it is recommended to import the entire module, it is also able to import part of the module with sub path if available, please visit [file `jsr.jsonc`](./jsr.jsonc) property `exports` for available sub paths.
> - It is recommended to import the module with tag for immutability.

### Via JSR With Specifier

> **🎯 Supported Target**
>
> - Deno

1. Import at the script:
    ```ts
    import ... from "jsr:@hugoalh/http-header-link[@${Tag}]";
    ```

> **ℹ️ Note**
>
> - Although it is recommended to import the entire module, it is also able to import part of the module with sub path if available, please visit [file `jsr.jsonc`](./jsr.jsonc) property `exports` for available sub paths.
> - It is recommended to import the module with tag for immutability.

### Via NPM With `node_modules`

> **🎯 Supported Target**
>
> - Cloudflare Workers
> - NodeJS

1. Install via:
    - NPM
      ```sh
      npm install @hugoalh/http-header-link[@${Tag}]
      ```
    - PNPM
      ```sh
      pnpm add @hugoalh/http-header-link[@${Tag}]
      ```
    - Yarn
      ```sh
      yarn add @hugoalh/http-header-link[@${Tag}]
      ```
2. Import at the script:
    ```ts
    import ... from "@hugoalh/http-header-link";
    ```

> **ℹ️ Note**
>
> - Although it is recommended to import the entire module, it is also able to import part of the module with sub path if available, please visit [file `jsr.jsonc`](./jsr.jsonc) property `exports` for available sub paths.
> - It is recommended to import the module with tag for immutability.

### Via NPM With Specifier

> **🎯 Supported Target**
>
> - Bun
> - Deno

1. Import at the script:
    ```ts
    import ... from "npm:@hugoalh/http-header-link[@${Tag}]";
    ```

> **ℹ️ Note**
>
> - Although it is recommended to import the entire module, it is also able to import part of the module with sub path if available, please visit [file `jsr.jsonc`](./jsr.jsonc) property `exports` for available sub paths.
> - It is recommended to import the module with tag for immutability.

### Via Remote Import

> **🎯 Supported Target**
>
> - Deno

1. Import at the script:
    ```ts
    /* Via GitHub Raw (Require Tag) */
    import ... from "https://raw.githubusercontent.com/hugoalh-studio/http-header-link-es/${Tag}/mod.ts";
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

## 🧩 API

- ```ts
  class HTTPHeaderLink {
    constructor(value?: string | Headers | HTTPHeaderLink | HTTPHeaderLinkEntry[] | Response): HTTPHeaderLink;
    add(value: string | Headers | HTTPHeaderLink | HTTPHeaderLinkEntry[] | Response): this;
    entries(): HTTPHeaderLinkEntry[];
    getByParameter(key: string, value: string): HTTPHeaderLinkEntry[];
    getByRel(value: string): HTTPHeaderLinkEntry[];
    hasParameter(key: string, value: string): boolean;
    toString(): string;
    static parse(value: string | Headers | HTTPHeaderLink | Response): HTTPHeaderLink;
    static stringify(value: HTTPHeaderLinkEntry[]): string;
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

## ✍️ Example

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
