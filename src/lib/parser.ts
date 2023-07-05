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

import type { RubyToken } from "./types.js";

const rubyPattern = [
    // 区切り文字（｜）
    /^｜([^｜]*?)《/u,
    // 漢字
    /^(\p{Ideographic}[ヵヶゕ\p{Ideographic}]*?)《/u,
    // 全角英数
    /^([Ａ-Ｚａ-ｚ０-９\p{sc=Greek}\p{sc=Cyrillic}―＆’，．－]*?)《/u,
    // 半角英数
    /^([A-Za-z0-9@$#=/\-&'"][A-Za-z0-9@\$#=/\-&'"_*!?.,:;-~…]*?)《/u,
    // カタカナ(イコールっぽく見える記号はダブルハイフンと言う別物)
    /^(\p{sc=Katakana}[ﾞﾟ゛゜゠-ー・ヽヾ\p{sc=Katakana}]*?)《/u,
    // ひらがな
    /^(\p{sc=Hiragana}[ﾞﾟ゛゜・ーゝゞ\p{sc=Hiragana}]*?)《/u,
];

/**
 * @param src Markdown covered by this extension
 * @returns Index that hints for this extension to check, or `undefined`
 */
export function rubyDetector(src: string): number | undefined {
    return src.match(
        /^[｜\p{Ideographic}Ａ-Ｚａ-ｚ０-９\p{sc=Greek}\p{sc=Cyrillic}＆’，．－A-Za-z0-9@$#=\-_*~&'\p{sc=Katakana}\p{sc=Hiragana}]/u
    )?.index;
}

/**
 * @param src Markdown covered by this extension
 * @returns Object for <ruby> and <rt> tags, or `null`
 */
export function rubyTokenizser(src: string): RubyToken | null {
    for (const pattern of rubyPattern) {
        const ruby = pattern.exec(src);

        if (ruby === null) {
            continue;
        }

        const rt = src.slice(ruby[0].length).match(/^(.+)》/u);

        const isMatch =
            ruby[1] !== undefined && rt !== null && rt[1] !== undefined;

        if (!isMatch) {
            continue;
        }

        return {
            raw: ruby[0] + rt[0],
            parent: ruby[1] ?? "",
            rt: rt[1] ?? "",
        };
    }

    return null;
}
