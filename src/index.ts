/*!
Copyright 2023 Jan Stanley Watt

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
import { rubyDetector, rubyTokenizer } from "./lib/parser.js";

const extensionName = "aozoraRuby";
interface extensionOption {
    useRpTag: boolean;
    useSutegana: boolean;
}

const aozoraRuby = (
    option: extensionOption = { useRpTag: false, useSutegana: false }
): marked.TokenizerAndRendererExtension => {
    return {
        name: extensionName,

    level: "inline",

    start(src: string): number | void {
        return rubyDetector(src);
    },

    tokenizer(src: string): marked.Tokens.Generic | void {
        const rubyObject = rubyTokenizer(src);

        if (rubyObject === null) {
            return;
        }

        return {
            type: extensionName,
            raw: rubyObject.raw,
            ruby: this.lexer.inlineTokens(rubyObject.parent),
            rt: this.lexer.inlineTokens(rubyObject.rt),
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
