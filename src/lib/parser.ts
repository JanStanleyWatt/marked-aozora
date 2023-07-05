interface RubyToken {
    raw: string;
    parent: string;
    rt: string;
}

const rubyPattern: RegExp[] = [
    // 区切り文字（｜）
    /^｜(.*?)《/u,
    // 漢字
    /^(\p{Ideographic}[ヵヶゕ\p{Ideographic}]*?)《/u,
    // 全角英数
    /^([Ａ-Ｚａ-ｚ０-９\p{sc=Greek}\p{sc=Cyrillic}＆’，．－]*?)《/u,
    // 半角英数
    /^([A-Za-z0-9@$#=/\-_*&'"][A-Za-z0-9!-~]*?)《/u,
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
        /[｜\p{Ideographic}Ａ-Ｚａ-ｚ０-９\p{sc=Greek}\p{sc=Cyrillic}＆’，．－A-Za-z0-9@$#=\-_*&'\p{sc=Katakana}\p{sc=Hiragana}]/u
    )?.index;
}

/**
 * @param src Markdown covered by this extension
 * @returns Object for <ruby> and <rt> tags, or `null`
 */
export function rubyTokenizser(src: string): RubyToken | null {
    for (const pattern of rubyPattern) {
        const ruby = pattern.exec(src);

        if (ruby !== null) {
            const rt = src.slice(ruby[0].length).match(/^(.+?)》/u);

            const isMatch =
                ruby[1] !== undefined && rt !== null && rt[1] !== undefined;

            if (isMatch) {
                return {
                    raw: ruby[0] + rt[0],
                    parent: ruby[1] ?? "",
                    rt: rt[1] ?? "",
                };
            }
        }
    }

    return null;
}
