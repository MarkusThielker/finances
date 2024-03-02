import adapter from "@sveltejs/adapter-node"
import {vitePreprocess} from "@sveltejs/vite-plugin-svelte"
import {readFileSync} from "fs"
import {fileURLToPath} from "url"

const file = fileURLToPath(new URL("package.json", import.meta.url))
const json = readFileSync(file, "utf8")
const pkg = JSON.parse(json);

/** @type {import("@sveltejs/kit").Config} */
const config = {
    kit: {
        adapter: adapter(),
        version: {
            name: pkg.version,
        }
    },
    preprocess: vitePreprocess(),
}

export default config
