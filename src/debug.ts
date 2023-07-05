import { marked } from "marked";
import aozoraRuby from "./index.js";

marked.use({
    mangle: false,
    headerIds: false,
    extensions: [aozoraRuby],
});

const markdown = "これは実に｜素敵《すてき》で完璧《**かんぺき**》だ";
const env = process.env;

if (env.MARKED_AOZORA_DEBUG_VERBOSE === "1") {
    console.dir(marked.lexer(markdown), { depth: null });
    console.log("");
}
console.log(marked.parse(markdown));
