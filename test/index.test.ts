import aozoraRuby from "../src/index.js";
import { marked } from "marked";

test("delim_normal", () => {
    marked.use({
        mangle: false,
        headerIds: false,
        extensions: [aozoraRuby({ useRpTag: false, useSutegana: false })],
    });

    const html = marked.parseInline(
        "このエクステンションは｜素晴らしい《パーフェクトだ》な"
    );

    expect(html).toBe(
        "このエクステンションは<ruby>素晴らしい<rt>パーフェクトだ</rt></ruby>な"
    );
});

test("delim_multh", () => {
    marked.use({
        mangle: false,
        headerIds: false,
        extensions: [aozoraRuby({ useRpTag: false, useSutegana: false })],
    });

    const html = marked.parseInline(
        "この｜エクステンション｜は｜素晴らしい《パーフェクトだ》な"
    );

    expect(html).toBe(
        "この｜エクステンション｜は<ruby>素晴らしい<rt>パーフェクトだ</rt></ruby>な"
    );
});

test("kanji_normal", () => {
    marked.use({
        mangle: false,
        headerIds: false,
        extensions: [aozoraRuby({ useRpTag: false, useSutegana: false })],
    });

    const html = marked.parseInline("このエクステンションは素敵《すてき》だ");

    expect(html).toBe(
        "このエクステンションは<ruby>素敵<rt>すてき</rt></ruby>だ"
    );
});

test("kanji_xka1", () => {
    marked.use({
        mangle: false,
        headerIds: false,
        extensions: [aozoraRuby({ useRpTag: false, useSutegana: false })],
    });

    const html = marked.parseInline(
        "このエクステンションは一ヵ月《いっかげつ》もかからなかった"
    );

    expect(html).toBe(
        "このエクステンションは<ruby>一ヵ月<rt>いっかげつ</rt></ruby>もかからなかった"
    );
});

test("kanji_xka2", () => {
    marked.use({
        mangle: false,
        headerIds: false,
        extensions: [aozoraRuby({ useRpTag: false, useSutegana: false })],
    });

    const html = marked.parseInline(
        "このエクステンションは一ゕ月《いっかげつ》もかからなかった"
    );

    expect(html).toBe(
        "このエクステンションは<ruby>一ゕ月<rt>いっかげつ</rt></ruby>もかからなかった"
    );
});

test("kanji_xke", () => {
    marked.use({
        mangle: false,
        headerIds: false,
        extensions: [aozoraRuby({ useRpTag: false, useSutegana: false })],
    });

    const html = marked.parseInline(
        "このエクステンションは一ヶ月《いっかげつ》もかからなかった"
    );

    expect(html).toBe(
        "このエクステンションは<ruby>一ヶ月<rt>いっかげつ</rt></ruby>もかからなかった"
    );
});

test("zenkaku", () => {
    marked.use({
        mangle: false,
        headerIds: false,
        extensions: [aozoraRuby({ useRpTag: false, useSutegana: false })],
    });

    const html = marked.parseInline(
        "このＥｘｔｅｎｓｉｏｎ《エクステンション》は１ＢＡＮ《いちばん》素晴らしいな"
    );

    expect(html).toBe(
        "この<ruby>Ｅｘｔｅｎｓｉｏｎ<rt>エクステンション</rt></ruby>は<ruby>１ＢＡＮ<rt>いちばん</rt></ruby>素晴らしいな"
    );
});

test("hankaku", () => {
    marked.use({
        mangle: false,
        headerIds: false,
        extensions: [aozoraRuby({ useRpTag: false, useSutegana: false })],
    });

    const html = marked.parseInline(
        "このExtension《エクステンション》は1BAN《いちばん》素晴らしいな"
    );

    expect(html).toBe(
        "この<ruby>Extension<rt>エクステンション</rt></ruby>は<ruby>1BAN<rt>いちばん</rt></ruby>素晴らしいな"
    );
});

test("hankaku_backslash", () => {
    marked.use({
        mangle: false,
        headerIds: false,
        extensions: [aozoraRuby({ useRpTag: false, useSutegana: false })],
    });

    const html = marked.parseInline(
        "ここはC:\\home《ホームディレクトリ》に案内だ"
    );

    expect(html).toBe(
        "ここは<ruby>C:\\home<rt>ホームディレクトリ</rt></ruby>に案内だ"
    );
});

test("katakana", () => {
    marked.use({
        mangle: false,
        headerIds: false,
        extensions: [aozoraRuby({ useRpTag: false, useSutegana: false })],
    });

    const html = marked.parseInline(
        "このエクステンション《かくちょうきのう》はｲﾁﾊﾞﾝ《いちばん》素晴らしいな"
    );

    expect(html).toBe(
        "この<ruby>エクステンション<rt>かくちょうきのう</rt></ruby>は<ruby>ｲﾁﾊﾞﾝ<rt>いちばん</rt></ruby>素晴らしいな"
    );
});

test("hiragana", () => {
    marked.use({
        mangle: false,
        headerIds: false,
        extensions: [aozoraRuby({ useRpTag: false, useSutegana: false })],
    });

    const html = marked.parseInline(
        "Thatかくちょうきのう《エクステンション》は、いちばん《ｲﾁﾊﾞﾝ》素晴らしいな"
    );

    expect(html).toBe(
        "That<ruby>かくちょうきのう<rt>エクステンション</rt></ruby>は、<ruby>いちばん<rt>ｲﾁﾊﾞﾝ</rt></ruby>素晴らしいな"
    );
});

test("option_default", () => {
    marked.use({
        mangle: false,
        headerIds: false,
        extensions: [aozoraRuby()],
    });

    const html = marked.parseInline(
        "このエクステンションは超優秀《ちょうゆうしゅう》である"
    );

    expect(html).toBe(
        "このエクステンションは<ruby>超優秀<rt>ちょうゆうしゅう</rt></ruby>である"
    );
});

test("option_useRpTag", () => {
    marked.use({
        mangle: false,
        headerIds: false,
        extensions: [aozoraRuby({ useRpTag: true, useSutegana: false })],
    });

    const html = marked.parseInline(
        "このエクステンションは超優秀《ちょうゆうしゅう》である"
    );

    expect(html).toBe(
        "このエクステンションは<ruby>超優秀<rp>（</rp><rt>ちょうゆうしゅう</rt><rp>）</rp></ruby>である"
    );
});

test("option_useSutegana", () => {
    marked.use({
        mangle: false,
        headerIds: false,
        extensions: [aozoraRuby({ useRpTag: false, useSutegana: true })],
    });

    const html = marked.parseInline(
        "このエクステンションは超優秀《ちょうゆうしゅう》である"
    );

    expect(html).toBe(
        "このエクステンションは<ruby>超優秀<rt>ちようゆうしゆう</rt></ruby>である"
    );
});

test("option_both", () => {
    marked.use({
        mangle: false,
        headerIds: false,
        extensions: [aozoraRuby({ useRpTag: true, useSutegana: true })],
    });

    const html = marked.parseInline(
        "このエクステンションは超優秀《ちょうゆうしゅう》である"
    );

    expect(html).toBe(
        "このエクステンションは<ruby>超優秀<rp>（</rp><rt>ちようゆうしゆう</rt><rp>）</rp></ruby>である"
    );
});

test("em_in_rt", () => {
    marked.use({
        mangle: false,
        headerIds: false,
        extensions: [aozoraRuby({ useRpTag: false, useSutegana: false })],
    });

    const html = marked.parseInline(
        "このエクステンションは超優秀《*ちょうゆうしゅう*》である"
    );

    expect(html).toBe(
        "このエクステンションは<ruby>超優秀<rt><em>ちょうゆうしゅう</em></rt></ruby>である"
    );
});

test("em_in_ruby", () => {
    marked.use({
        mangle: false,
        headerIds: false,
        extensions: [aozoraRuby({ useRpTag: false, useSutegana: false })],
    });

    const html = marked.parseInline(
        "このエクステンションは｜*超優秀*《ちょうゆうしゅう》である"
    );

    expect(html).toBe(
        "このエクステンションは<ruby><em>超優秀</em><rt>ちょうゆうしゅう</rt></ruby>である"
    );
});

test("em_both", () => {
    marked.use({
        mangle: false,
        headerIds: false,
        extensions: [aozoraRuby({ useRpTag: false, useSutegana: false })],
    });

    const html = marked.parseInline(
        "このエクステンションは *超優秀《ちょうゆうしゅう》* である"
    );

    expect(html).toBe(
        "このエクステンションは <em><ruby>超優秀<rt>ちょうゆうしゅう</rt></ruby></em> である"
    );
});

test("ruby_nest", () => {
    marked.use({
        mangle: false,
        headerIds: false,
        extensions: [aozoraRuby({ useRpTag: false, useSutegana: false })],
    });

    const html = marked.parseInline(
        "このエクステンションは超優秀《ちょうゆうしゅう《パーフェクト》》である"
    );

    expect(html).toBe(
        "このエクステンションは<ruby>超優秀<rt><ruby>ちょうゆうしゅう<rt>パーフェクト</rt></ruby></rt></ruby>である"
    );
});

test("escape_delimiter", () => {
    marked.use({
        mangle: false,
        headerIds: false,
        extensions: [aozoraRuby({ useRpTag: false, useSutegana: false })],
    });

    const html = marked.parseInline(
        "このエクステンションは\\｜素晴らしい《さいこうの》出来栄えだ"
    );

    expect(html).toBe(
        "このエクステンションは｜素晴<ruby>らしい<rt>さいこうの</rt></ruby>出来栄えだ"
    );
});

test("escape_rt", () => {
    marked.use({
        mangle: false,
        headerIds: false,
        extensions: [aozoraRuby({ useRpTag: false, useSutegana: false })],
    });

    const html = marked.parseInline(
        "このエクステンションは最高\\《さいこう》の出来栄えだ"
    );

    expect(html).toBe("このエクステンションは最高《さいこう》の出来栄えだ");
});

test("escape_rt_delimiter", () => {
    marked.use({
        mangle: false,
        headerIds: false,
        extensions: [aozoraRuby({ useRpTag: false, useSutegana: false })],
    });

    const html = marked.parseInline(
        "このエクステンションは｜素晴らしい\\《さいこうの》出来栄えだ"
    );

    expect(html).toBe(
        "このエクステンションは｜素晴らしい《さいこうの》出来栄えだ"
    );
});

test("escape_both", () => {
    marked.use({
        mangle: false,
        headerIds: false,
        extensions: [aozoraRuby({ useRpTag: false, useSutegana: false })],
    });

    const html = marked.parseInline(
        "このエクステンションは\\｜素晴らしい\\《さいこうの》出来栄えだ"
    );

    expect(html).toBe(
        "このエクステンションは｜素晴らしい《さいこうの》出来栄えだ"
    );
});

test("error_bracket_start", () => {
    marked.use({
        mangle: false,
        headerIds: false,
        extensions: [aozoraRuby({ useRpTag: false, useSutegana: false })],
    });

    const html = marked.parseInline(
        "このエクステンションは｜素晴らしい《さいこうの出来栄えだ"
    );

    expect(html).toBe(
        "このエクステンションは｜素晴らしい《さいこうの出来栄えだ"
    );
});

test("error_bracket_end", () => {
    marked.use({
        mangle: false,
        headerIds: false,
        extensions: [aozoraRuby({ useRpTag: false, useSutegana: false })],
    });

    const html = marked.parseInline(
        "このエクステンションは｜素晴らしいさいこう》の出来栄えだ"
    );

    expect(html).toBe(
        "このエクステンションは｜素晴らしいさいこう》の出来栄えだ"
    );
});

test("empty_bracket", () => {
    marked.use({
        mangle: false,
        headerIds: false,
        extensions: [aozoraRuby({ useRpTag: false, useSutegana: false })],
    });

    const html = marked.parseInline(
        "このエクステンションは｜素晴らしい《》出来栄えだ"
    );

    expect(html).toBe(
        "このエクステンションは<ruby>素晴らしい<rt></rt></ruby>出来栄えだ"
    );
});

test("empty_parent", () => {
    marked.use({
        mangle: false,
        headerIds: false,
        extensions: [aozoraRuby({ useRpTag: false, useSutegana: false })],
    });

    const html = marked.parseInline(
        "《エクステンション》は素晴らしい出来栄えだ"
    );

    expect(html).toBe("《エクステンション》は素晴らしい出来栄えだ");
});
