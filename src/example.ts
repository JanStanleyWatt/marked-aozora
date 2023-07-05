import { marked } from "marked";
import aozoraRuby from "./index.js";

marked.use({
    mangle: false,
    headerIds: false,
    extensions: [aozoraRuby],
});

const markdown: string =
    "このExtension《エクステンション》はとても｜**素敵**《すてき》で完璧《**かんぺき**》だ";

console.log(marked.parse(markdown));
