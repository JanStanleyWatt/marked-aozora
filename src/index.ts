/*!
Copyright [2023] Jan Stanley Watt

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/

import type { marked } from "marked";
// import { rubyDetector, rubyTokenizser } from "./lib/parser.js";
import { rubyDetector, rubyTokenizser } from "./lib/parser.js";

type TokenArray = marked.Token[] | marked.TokensList;

const extensionName = "aozoraRuby";

const aozoraRuby: marked.TokenizerAndRendererExtension = {
    name: extensionName,

    level: "inline",

    start(src: string): number | void {
        console.log(rubyDetector(src) ?? -1);
        return rubyDetector(src);
    },

    tokenizer(src: string, tokens: TokenArray): marked.Tokens.Generic | void {
        const ruby = rubyTokenizser(src);

        if (ruby !== null) {
            // TODO: Remove before deploy `console.log(...)`
            console.log(tokens);
            console.log(ruby.raw);
            console.log(ruby.parent);
            console.log(ruby.rt);

            return {
                type: extensionName,
                raw: ruby.raw,
                ruby: this.lexer.inlineTokens(ruby.parent),
                rt: this.lexer.inlineTokens(ruby.rt),
            };
        }
    },

    // This code using `any` type
    renderer(token: marked.Tokens.Generic): string {
        /* eslint-disable @typescript-eslint/no-unsafe-argument */
        return `<ruby>${this.parser.parseInline(
            token.ruby
        )}<rt>${this.parser.parseInline(token.rt)}</rt></ruby>`;
        /* eslint-enable @typescript-eslint/no-unsafe-argument */
    },
};

export default aozoraRuby;
