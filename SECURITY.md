# Security Policy

## Supported Versions

> ```mermaid
> ---
> title: Versions Status Flow
> ---
> flowchart LR
>   Unstable("Unstable")
>   Pre("Pre Release")
>   Release("Release")
>   LTS("Long Term Support")
>   Maintenance("Maintenance")
>   EOL("End Of Life")
>   Unstable --> Pre --> Release
>   subgraph Supported
>     Release -- Major = 0 --> Maintenance
>     Release -- Major > 0 --> LTS --> Maintenance
>   end
>   Maintenance --> EOL
> ```

| **Versions** | **Release Date** | **Long Term Support Date** | **End Of Life Date** |
|:-:|:-:|:-:|:-:|
| v1.X.X | 2024-04-15 | 2024-04-15 | *Unknown* |

> **ℹ️ Note**
>
> - The date format is according to the specification ISO 8601.
> - Values in italic format are subject to change.
> - Versions which not in the list are also end of life.

## Report Vulnerabilities

You can report security vulnerabilities by [create security vulnerability report](https://github.com/hugoalh/hugoalh/blob/main/universal-guide/contributing.md#create-a-security-vulnerability-report).
