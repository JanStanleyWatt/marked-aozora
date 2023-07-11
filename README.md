# marked-aozora

Add Aozora Bunko style ruby support to [marked.js](https://github.com/markedjs/marked)

## Installation

```console
npm install marked-aozora
npm config set type module
```

## Usage

```javascript
import { marked } from "marked";
import aozoraRuby from "marked-aozora";

marked.use({
    extensions: [aozoraRuby()], // Use default option
});

const markdown = "このExtension《エクステンション》は完璧《**かんぺき**》だ";

// この<ruby>Extension<rt>エクステンション</rt></ruby>は<ruby>完璧<rt><strong>かんぺき</strong></rt></ruby>だ
console.log(marked.parseInline(markdown));
```

## Option

### useRpTag

If define `true`, insert `<rp>（</rp>`, and `<rp>）</rp>` in before `<rt>` and after `</rt>`.

Default configure:

```javascript
marked.use({
    extensions: [aozoraRuby()],
});

const markdown = "このエクステンションは超優秀《ちょうゆうしゅう》である";

// このエクステンションは<ruby>超優秀<rt>ちょうゆうしゅう</rt></ruby>である
console.log(marked.parseInline(markdown));
```

**Changed** configure:

```javascript
marked.use({
    extensions: [aozoraRuby({ useRpTag: true })], // LOOK HERE
});

const markdown = "このエクステンションは超優秀《ちょうゆうしゅう》である";

// このエクステンションは<ruby>超優秀<rp>（</rp><rt>ちょうゆうしゅう</rt><rp>）</rp></ruby>である
console.log(marked.parseInline(markdown));
```

### useSutegana

If defined as "true", replace certain hiragana characters represented as lowercase letters (e.g. `ゃ`, `ゅ`, `ょ`, `ぇ`) with their regular counterparts.

Default configure:

```javascript
marked.use({
    extensions: [aozoraRuby()],
});

const markdown = "このエクステンションは超優秀《ちょうゆうしゅう》である";

// このエクステンションは<ruby>超優秀<rt>ちょうゆうしゅう</rt></ruby>である
console.log(marked.parseInline(markdown));
```

**Changed** configure:

```javascript
marked.use({
    extensions: [aozoraRuby({ useSutegana: true })], // LOOK HERE
});

const markdown = "このエクステンションは超優秀《ちょうゆうしゅう》である";

// このエクステンションは<ruby>超優秀<rt>ちようゆうしゆう</rt></ruby>である
console.log(marked.parseInline(markdown));
```

Of course you can define `true` in both configure:

```javascript
marked.use({
    extensions: [aozoraRuby({ useRpTag: true, useSutegana: true })], // LOOK HERE
});

const markdown = "このエクステンションは超優秀《ちょうゆうしゅう》である";

// このエクステンションは<ruby>超優秀<rp>（</rp><rt>ちようゆうしゆう</rt><rp>）</rp></ruby>である
console.log(marked.parseInline(markdown));
```

## Syntax

1. Basically, use the delimiter "｜" and the ruby brackets "《》" to express ruby.

    ```markdown
    この拡張機能は｜素晴らしい《かんぺきな》出来栄えだ
    ```

    convert to:

    ```html
    この拡張機能は<ruby>素晴らしい<rt>かんぺきな</rt></ruby>出来栄えだ
    ```

1. Delimiters must always be used to modify parent characters:

    ```markdown
    この拡張機能は｜**素敵**《すてき》な出来栄えだ
    ```

    convert to:

    ```html
    この拡張機能は<ruby><strong>素敵</strong><rt>すてき</rt></ruby>な出来栄えだ
    ```

3. The delimiter can be omitted if only one type of character is used:

    ```markdown
    <!-- Kanji -->
    この拡張機能《かくちょうきのう》は最高《さいこう》だ
    <!-- full-width alphanumeric -->
    このＥｘｔｅｎｓｉｏｎ《エクステンション》はＷｏｎｄｅｒｆｕｌ《すばらしい》だ
    <!-- half-width alphanumeric -->
    このExtension《エクステンション》はWonderful《すばらしい》だ
    <!-- katakana -->
    このエクステンション《かくちょうきのう》はワンダフル《すばらしい》だ
    <!-- hiragana -->
    これ《エクステンション》は、たいへん《ものすごく》すばらしいできばえだ
    ```

    convert to:

    ```html
    <!-- Kanji -->
    この<ruby>拡張機能<rt>かくちょうきのう</rt></ruby>は<ruby>最高<rt>さいこう</rt></ruby>だ
    <!-- full-width alphanumeric -->
    この<ruby>Ｅｘｔｅｎｓｉｏｎ<rt>エクステンション</rt></ruby>は<ruby>Ｗｏｎｄｅｒｆｕｌ<rt>すばらしい</rt></ruby>だ
    <!-- half-width alphanumeric -->
    この<ruby>Extension<rt>エクステンション</rt></ruby>は<ruby>Wonderful<rt>すばらしい</rt></ruby>だ
    <!-- katakana -->
    この<ruby>エクステンション<rt>かくちょうきのう</rt></ruby>は<ruby>ワンダフル<rt>すばらしい</rt></ruby>だ
    <!-- hiragana -->
    <ruby>これ<rt>エクステンション</rt></ruby>は、<ruby>たいへん<rt>ものすごく</rt></ruby>すばらしいできばえだ
    ```

4. You can nest Markdown symbols and ruby brackets inside ruby brackets:

    ```markdown
    この拡張機能《エクステンション《かくちょうきのう》》は最高《**さいこう**》だ
    ```

    convert to:

    ```html
    この<ruby>拡張機能<rt><ruby>エクステンション<rt>かくちょうきのう</rt></ruby></rt></ruby>は<ruby>最高<rt><strong>さいこう</strong></rt></ruby>だ
    ```

5. An empty ruby tag is generated if the ruby is empty, but no ruby itself is generated if the parent character is empty:

    ```markdown
    《このかくちょうきのう》は最高《》だ
    ```

    convert to:

    ```html
    このかくちょうきのうは<ruby>最高<rt></rt></ruby>だ
    ```

## License
[Apache License 2.0](https://www.apache.org/licenses/LICENSE-2.0)