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
import type { TokenArray } from "./lib/types.js";
import { rubyDetector, rubyTokenizser } from "./lib/parser.js";

const extensionName = "aozoraRuby";

const aozoraRuby: marked.TokenizerAndRendererExtension = {
    name: extensionName,

    level: "inline",

    start(src: string): number | void {
        return rubyDetector(src);
    },

    tokenizer(src: string, _tokens: TokenArray): marked.Tokens.Generic | void {
        const ruby = rubyTokenizser(src);

        if (ruby === null) {
            return;
        }

        return {
            type: extensionName,
            raw: ruby.raw,
            ruby: this.lexer.inlineTokens(ruby.parent),
            rt: this.lexer.inlineTokens(ruby.rt),
        };
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
