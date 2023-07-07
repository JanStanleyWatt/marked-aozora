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

interface RubyToken {
    raw: string;
    parent: string;
    rt: string;
}

function rubyPatternMatching(src: string): RegExpExecArray | null {
    const rubyPattern = [
        // 区切り文字（｜）
        /^\\?｜([^｜]*?)\\?《/u,
        // 漢字
        /^(\p{Ideographic}[ヵヶゕ\p{Ideographic}]*?)\\?《/u,
        // 全角英数
        /^([Ａ-Ｚａ-ｚ０-９\p{sc=Greek}\p{sc=Cyrillic}―＆’，．－]*?)\\?《/u,
        // 半角英数
        /^([A-Za-z0-9@$#=/\-&'"][A-Za-z0-9@$#=/\-&'"_*!?.,:;-~\\…]*?)\\?《/u,
        // カタカナ(イコールっぽく見える記号はダブルハイフンと言う別物)
        /^(\p{sc=Katakana}[ﾞﾟ゛゜゠-ー・ヽヾ\p{sc=Katakana}]*?)\\?《/u,
        // ひらがな
        /^(\p{sc=Hiragana}[ﾞﾟ゛゜・ーゝゞ\p{sc=Hiragana}]*?)\\?《/u,
    ];

    // Skip matching if the first character is a period, etc.
    if (/^[_*!?.,:;\-~…ﾞﾟ゛゜゠ー・ヽヾゝゞ、。]/u.test(src)) {
        return null;
    }

    for (const pattern of rubyPattern) {
        const ruby = pattern.exec(src);

        if (ruby === null || ruby[1] === undefined) {
            continue;
        } else {
            return ruby;
        }
    }
    return null;
}

/**
 * Function to use with `marked.TokenizerAndRendererExtension.start(src: string)`
 * @param src Markdown covered by this extension
 * @returns Index that hints for this extension to check, or `undefined`
 */
export function rubyDetector(src: string): number | undefined {
    return src.match(
        /^[｜\p{Ideographic}Ａ-Ｚａ-ｚ０-９\p{sc=Greek}\p{sc=Cyrillic}＆’，．－A-Za-z0-9@\$#=/\-&'"_*!?.,:;-~…ﾞﾟ゛゜゠-ー・ヽヾ\p{sc=Katakana}ﾞﾟ゛゜・ーゝゞ、。\p{sc=Hiragana}]/u
    )?.index;
}

/**
 * Function to use with `marked.TokenizerAndRendererExtension.tokenizer(src: string)`
 * @param src Markdown covered by this extension
 * @returns Object for \<ruby> and \<rt> tags, or `null`
 */
export function rubyTokenizer(src: string): RubyToken | null {
    const ruby = rubyPatternMatching(src);

    // Skip processing if rubyPatternMatching(src) is not successful
    if (ruby === null || ruby[1] === undefined) {
        return null;
    }

    const target = src.slice(ruby[0].length);
    let openerCount = 1;
    let raw = ruby[0];
    let rt = "";

    // Escape delimiter and bracket
    if (raw.slice(0, 2) === "\\｜") {
        return {
            raw: "\\｜",
            parent: "",
            rt: "｜",
        };
    } else if (raw.match(/\\《/u) !== null) {
        return {
            raw: raw,
            parent: "",
            rt: raw.slice(0, -2) + "《",
        };
    }

    for (let index = 0; index < target.length; index++) {
        raw += target[index];
        switch (target[index]) {
            case "《":
                ++openerCount;
                break;
            case "》":
                --openerCount;
                break;
        }

        if (openerCount === 0) {
            return {
                raw: raw,
                parent: ruby[1],
                rt: rt,
            };
        } else {
            rt += target[index];
        }
    }

    return null;
}

/**
 * Optional function to convert discarded kana to upper case
 * @param src Markdown covered by this extension
 * @returns Replaced markdown
 */
export function rubySuteganaReplacer(src: string): string {
    const fromArray = [
        "ぁ",
        "ぃ",
        "ぅ",
        "ぇ",
        "ぉ",
        "っ",
        "ゃ",
        "ゅ",
        "ょ",
        "ゎ",
        "ァ",
        "ィ",
        "ゥ",
        "ェ",
        "ォ",
        "ヵ",
        "ヶ",
        "ッ",
        "ャ",
        "ュ",
        "ョ",
        "ヮ",
    ];
    const toArray = [
        "あ",
        "い",
        "う",
        "え",
        "お",
        "つ",
        "や",
        "ゆ",
        "よ",
        "わ",
        "ア",
        "イ",
        "ウ",
        "エ",
        "オ",
        "カ",
        "ケ",
        "ツ",
        "ヤ",
        "ユ",
        "ヨ",
        "ワ",
    ];
    let answer = src;
    for (let index = 0; index < fromArray.length; index++) {
        const from = fromArray[index];
        const to = toArray[index];

        // Only type assertion
        if (from !== undefined && to !== undefined) {
            answer = answer.replaceAll(from, to);
        }
    }
    return answer;
}
