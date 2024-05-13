import { isStringSingleLine } from "https://raw.githubusercontent.com/hugoalh-studio/is-string-singleline-es/v1.0.2/mod.ts";
const parametersNeedLowerCase: Set<string> = new Set<string>([
	"rel",
	"type"
]);
/**
 * Validate URI.
 * @access private
 * @param {string} uri
 * @returns {void}
 */
function validateURI(uri: string): void {
	if (
		!isStringSingleLine(uri) ||
		/[\s\t]/.test(uri)
	) {
		throw new SyntaxError(`\`${uri}\` is not a valid URI!`);
	}
}
/**
 * Cursor whitespace skipper.
 * @access private
 * @param {string} value
 * @param {number} cursor
 * @returns {number} Number of moves.
 */
function cursorWhitespaceSkipper(value: string, cursor: number): number {
	const valueAfterCursor: string = value.slice(cursor);
	return (valueAfterCursor.length - valueAfterCursor.trimStart().length);
}
/**
 * HTTP header `Link` entry.
 */
export type HTTPHeaderLinkEntry = [
	uri: string,
	parameters: { [key: string]: string; }
];
/**
 * Handle the HTTP header `Link` according to the specification RFC 8288.
 */
export class HTTPHeaderLink {
	get [Symbol.toStringTag](): string {
		return "HTTPHeaderLink";
	}
	#entries: HTTPHeaderLinkEntry[] = [];
	/**
	 * @param {string | Headers | HTTPHeaderLink | HTTPHeaderLinkEntry[] | Response} [input] Input.
	 */
	constructor(input?: string | Headers | HTTPHeaderLink | HTTPHeaderLinkEntry[] | Response) {
		if (typeof input !== "undefined") {
			this.add(input);
		}
	}
	/**
	 * Parse from string.
	 * @access private
	 * @param {string} input Input.
	 * @returns {void}
	 */
	#parseFromString(input: string): void {
		if (input.length === 0) {
			return;
		}
		const inputResolve: string = input.replace(/[\uFEFF\u00A0]/gu, "");// Remove Unicode characters of BOM (Byte Order Mark) and no-break space.
		for (let cursor = 0; cursor < inputResolve.length; cursor += 1) {
			cursor += cursorWhitespaceSkipper(inputResolve, cursor);
			if (inputResolve.charAt(cursor) !== "<") {
				throw new SyntaxError(`Unexpected character \`${inputResolve.charAt(cursor)}\` at position ${cursor}; Expect character \`<\`!`);
			}
			cursor += 1;
			const cursorEndURI: number = inputResolve.indexOf(">", cursor);
			if (cursorEndURI === -1) {
				throw new SyntaxError(`Missing end of URI delimiter character \`>\` after position ${cursor}!`);
			}
			if (cursorEndURI === cursor) {
				throw new SyntaxError(`Missing URI at position ${cursor}!`);
			}
			const uriSlice: string = inputResolve.slice(cursor, cursorEndURI);
			validateURI(uriSlice);
			const uri: HTTPHeaderLinkEntry[0] = decodeURI(uriSlice);
			const parameters: HTTPHeaderLinkEntry[1] = {};
			cursor = cursorEndURI + 1;
			cursor += cursorWhitespaceSkipper(inputResolve, cursor);
			if (
				cursor === inputResolve.length ||
				inputResolve.charAt(cursor) === ","
			) {
				this.#entries.push([uri, parameters]);
				continue;
			}
			if (inputResolve.charAt(cursor) !== ";") {
				throw new SyntaxError(`Unexpected character \`${inputResolve.charAt(cursor)}\` at position ${cursor}; Expect character \`;\`!`);
			}
			cursor += 1;
			while (cursor < inputResolve.length) {
				cursor += cursorWhitespaceSkipper(inputResolve, cursor);
				const parameterKey: string | undefined = inputResolve.slice(cursor).match(/^[\w-]+\*?/)?.[0].toLowerCase();
				if (typeof parameterKey === "undefined") {
					throw new SyntaxError(`Unexpected character \`${inputResolve.charAt(cursor)}\` at position ${cursor}; Expect a valid parameter key!`);
				}
				cursor += parameterKey.length;
				cursor += cursorWhitespaceSkipper(inputResolve, cursor);
				if (
					cursor === inputResolve.length ||
					inputResolve.charAt(cursor) === ","
				) {
					parameters[parameterKey] = "";
					break;
				}
				if (inputResolve.charAt(cursor) === ";") {
					parameters[parameterKey] = "";
					cursor += 1;
					continue;
				}
				if (inputResolve.charAt(cursor) !== "=") {
					throw new SyntaxError(`Unexpected character \`${inputResolve.charAt(cursor)}\` at position ${cursor}; Expect character \`=\`!`);
				}
				cursor += 1;
				cursor += cursorWhitespaceSkipper(inputResolve, cursor);
				let parameterValue = "";
				if (inputResolve.charAt(cursor) === "\"") {
					cursor += 1;
					while (cursor < inputResolve.length) {
						if (inputResolve.charAt(cursor) === "\"") {
							cursor += 1;
							break;
						}
						if (inputResolve.charAt(cursor) === "\\") {
							cursor += 1;
						}
						parameterValue += inputResolve.charAt(cursor);
						cursor += 1;
					}
				} else {
					const cursorDiffParameterValue: number = inputResolve.slice(cursor).search(/[\s;,]/);
					if (cursorDiffParameterValue === -1) {
						parameterValue += inputResolve.slice(cursor);
						cursor += parameterValue.length;
					} else {
						parameterValue += inputResolve.slice(cursor, cursorDiffParameterValue);
						cursor += cursorDiffParameterValue;
					}
				}
				parameters[parameterKey] = parametersNeedLowerCase.has(parameterKey) ? parameterValue.toLowerCase() : parameterValue;
				cursor += cursorWhitespaceSkipper(inputResolve, cursor);
				if (
					cursor === inputResolve.length ||
					inputResolve.charAt(cursor) === ","
				) {
					break;
				}
				if (inputResolve.charAt(cursor) === ";") {
					cursor += 1;
					continue;
				}
				throw new SyntaxError(`Unexpected character \`${inputResolve.charAt(cursor)}\` at position ${cursor}; Expect character \`,\`, character \`;\`, or end of the string!`);
			}
			this.#entries.push([uri, parameters]);
		}
	}
	/**
	 * Add entries.
	 * @param {string | Headers | HTTPHeaderLink | HTTPHeaderLinkEntry[] | Response} input Input.
	 * @returns {this}
	 */
	add(input: string | Headers | HTTPHeaderLink | HTTPHeaderLinkEntry[] | Response): this {
		if (input instanceof HTTPHeaderLink) {
			this.#entries.push(...input.#entries);
		} else if (input instanceof Response) {
			this.#parseFromString(input.headers.get("Link") ?? "");
		} else if (input instanceof Headers) {
			this.#parseFromString(input.get("Link") ?? "");
		} else if (Array.isArray(input)) {
			this.#entries.push(...input.map(([uri, parameters]: HTTPHeaderLinkEntry): HTTPHeaderLinkEntry => {
				validateURI(uri);
				Object.entries(parameters).forEach(([key, value]: [string, string]): void => {
					if (
						key !== key.toLowerCase() ||
						!(/^[\w-]+\*?$/.test(key))
					) {
						throw new SyntaxError(`\`${key}\` is not a valid parameter key!`);
					}
					if (parametersNeedLowerCase.has(key) && value !== value.toLowerCase()) {
						throw new SyntaxError(`\`${value}\` is not a valid parameter value!`);
					}
				});
				return [uri, { ...parameters }];
			}));
		} else {
			this.#parseFromString(input);
		}
		return this;
	}
	/**
	 * Return all of the entries.
	 * @returns {HTTPHeaderLinkEntry[]} Entries.
	 */
	entries(): HTTPHeaderLinkEntry[] {
		return this.#entries;
	}
	/**
	 * Get entries by parameter.
	 * @param {string} key Key of the parameter.
	 * @param {string} value Value of the parameter.
	 * @returns {HTTPHeaderLinkEntry[]} Entries.
	 */
	getByParameter(key: string, value: string): HTTPHeaderLinkEntry[] {
		if (key !== key.toLowerCase()) {
			throw new SyntaxError(`\`${key}\` is not a valid parameter key!`);
		}
		if (key === "rel") {
			return this.getByRel(value);
		}
		return this.#entries.filter((entry: HTTPHeaderLinkEntry): boolean => {
			return (entry[1][key] === value);
		});
	}
	/**
	 * Get entries by parameter `rel`.
	 * @param {string} value Value of the parameter `rel`.
	 * @returns {HTTPHeaderLinkEntry[]} Entries.
	 */
	getByRel(value: string): HTTPHeaderLinkEntry[] {
		if (value !== value.toLowerCase()) {
			throw new SyntaxError(`\`${value}\` is not a valid parameter \`rel\` value!`);
		}
		return this.#entries.filter((entity: HTTPHeaderLinkEntry): boolean => {
			return (entity[1].rel?.toLowerCase() === value);
		});
	}
	/**
	 * Whether have entries that match parameter.
	 * @param {string} key Key of the parameter.
	 * @param {string} value Value of the parameter.
	 * @returns {boolean} Result.
	 */
	hasParameter(key: string, value: string): boolean {
		return (this.getByParameter(key, value).length > 0);
	}
	/**
	 * Stringify entries.
	 * @returns {string} Stringified entries.
	 */
	toString(): string {
		return this.#entries.map(([uri, parameters]: HTTPHeaderLinkEntry): string => {
			return [
				`<${encodeURI(uri)}>`,
				...Object.entries(parameters).map(([key, value]: [string, string]): string => {
					return ((value.length > 0) ? `${key}="${value.replaceAll("\"", "\\\"")}"` : key);
				})
			].join("; ");
		}).join(", ");
	}
	/**
	 * Parse the HTTP header `Link` according to the specification RFC 8288.
	 * @param {string | Headers | HTTPHeaderLink | Response} input Input.
	 * @returns {HTTPHeaderLink}
	 */
	static parse(input: string | Headers | HTTPHeaderLink | Response): HTTPHeaderLink {
		return new this(input);
	}
	/**
	 * Stringify as the HTTP header `Link` according to the specification RFC 8288.
	 * @param {HTTPHeaderLinkEntry[]} input Input.
	 * @returns {string}
	 */
	static stringify(input: HTTPHeaderLinkEntry[]): string {
		return new this(input).toString();
	}
}
export default HTTPHeaderLink;
