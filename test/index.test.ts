import aozoraRuby from "../src/index.js";
import { marked } from "marked";

marked.use({
    mangle: false,
    headerIds: false,
    extensions: [aozoraRuby({ useRpTag: false, useSutegana: false })],
});

test("delim_normal", () => {
    const html = marked.parseInline(
        "このエクステンションは｜素晴らしい《パーフェクトだ》な"
    );
    expect(html).toBe(
        "このエクステンションは<ruby>素晴らしい<rt>パーフェクトだ</rt></ruby>な"
    );
});

test("delim_multh", () => {
    const html = marked.parseInline(
        "この｜エクステンション｜は｜素晴らしい《パーフェクトだ》な"
    );
    expect(html).toBe(
        "この｜エクステンション｜は<ruby>素晴らしい<rt>パーフェクトだ</rt></ruby>な"
    );
});

test("kanji_normal", () => {
    const html = marked.parseInline("このエクステンションは素敵《すてき》だ");
    expect(html).toBe(
        "このエクステンションは<ruby>素敵<rt>すてき</rt></ruby>だ"
    );
});

test("kanji_xka1", () => {
    const html = marked.parseInline(
        "このエクステンションは一ヵ月《いっかげつ》もかからなかった"
    );
    expect(html).toBe(
        "このエクステンションは<ruby>一ヵ月<rt>いっかげつ</rt></ruby>もかからなかった"
    );
});

test("kanji_xka2", () => {
    const html = marked.parseInline(
        "このエクステンションは一ゕ月《いっかげつ》もかからなかった"
    );
    expect(html).toBe(
        "このエクステンションは<ruby>一ゕ月<rt>いっかげつ</rt></ruby>もかからなかった"
    );
});

test("kanji_xke", () => {
    const html = marked.parseInline(
        "このエクステンションは一ヶ月《いっかげつ》もかからなかった"
    );
    expect(html).toBe(
        "このエクステンションは<ruby>一ヶ月<rt>いっかげつ</rt></ruby>もかからなかった"
    );
});

test("zenkaku", () => {
    const html = marked.parseInline(
        "このＥｘｔｅｎｓｉｏｎ《エクステンション》は１ＢＡＮ《いちばん》素晴らしいな"
    );
    expect(html).toBe(
        "この<ruby>Ｅｘｔｅｎｓｉｏｎ<rt>エクステンション</rt></ruby>は<ruby>１ＢＡＮ<rt>いちばん</rt></ruby>素晴らしいな"
    );
});

test("hankaku", () => {
    const html = marked.parseInline(
        "このExtension《エクステンション》は1BAN《いちばん》素晴らしいな"
    );
    expect(html).toBe(
        "この<ruby>Extension<rt>エクステンション</rt></ruby>は<ruby>1BAN<rt>いちばん</rt></ruby>素晴らしいな"
    );
});

test("hankaku_backslash", () => {
    const html = marked.parseInline(
        "ここはC:\\home《ホームディレクトリ》に案内だ"
    );
    expect(html).toBe(
        "ここは<ruby>C:\\home<rt>ホームディレクトリ</rt></ruby>に案内だ"
    );
});

test("katakana", () => {
    const html = marked.parseInline(
        "このエクステンション《かくちょうきのう》はｲﾁﾊﾞﾝ《いちばん》素晴らしいな"
    );
    expect(html).toBe(
        "この<ruby>エクステンション<rt>かくちょうきのう</rt></ruby>は<ruby>ｲﾁﾊﾞﾝ<rt>いちばん</rt></ruby>素晴らしいな"
    );
});

test("hiragana", () => {
    const html = marked.parseInline(
        "Thatかくちょうきのう《エクステンション》は、いちばん《ｲﾁﾊﾞﾝ》素晴らしいな"
    );
    expect(html).toBe(
        "That<ruby>かくちょうきのう<rt>エクステンション</rt></ruby>は、<ruby>いちばん<rt>ｲﾁﾊﾞﾝ</rt></ruby>素晴らしいな"
    );
});
