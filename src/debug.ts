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

import { marked } from "marked";
import aozoraRuby from "./index.js";

marked.use({
    mangle: false,
    headerIds: false,
    extensions: [aozoraRuby()],
});

const markdown =
    "このエクステンションは\\｜素晴らしい\\《さいこうの》出来栄えだ";
const env = process.env;

if (env.MARKED_AOZORA_DEBUG_VERBOSE === "1") {
    console.dir(marked.lexer(markdown), { depth: null });
    console.log("");
}
console.log(marked.parse(markdown));
