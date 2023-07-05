import type { marked } from "marked";
export type TokenArray = marked.Token[] | marked.TokensList;
export interface RubyToken {
    raw: string;
    parent: string;
    rt: string;
}
