import { marked } from "marked";
import aozoraRuby from "./index.js";

marked.use({
    mangle: false,
    headerIds: false,
    extensions: [aozoraRuby],
});

const markdown: string = "これは実に**素敵**《すてき》で完璧《**かんぺき**》だ";

console.dir(marked.lexer(markdown), { depth: null });
console.log("");
console.log(marked.parse(markdown));
