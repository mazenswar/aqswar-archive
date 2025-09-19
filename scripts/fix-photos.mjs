import { readFile, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

function getCategoryFromPath(path) {
	if (!path || typeof path !== "string") return "";
	const match = path.match(/(?:^|\/)photography\/([^/]+)/i);
	return match ? match[1] : "";
}

async function run() {
	const inputPath = resolve(__dirname, "./photos.json"); // adjust if your file lives elsewhere
	const raw = await readFile(inputPath, "utf8");
	const json = JSON.parse(raw);

	if (!Array.isArray(json)) {
		throw new Error("photos.json is not an array");
	}

	const updated = json.map((it) => {
		const categoryFromPath = getCategoryFromPath(
			it.fullPath || it.s3_key || ""
		);
		return { ...it, category: categoryFromPath || it.category || "" };
	});

	const pretty = JSON.stringify(updated, null, 2);
	await writeFile(inputPath, pretty, "utf8");

	console.log(
		`Updated ${updated.length} items. Category corrected from path segment after "photography/".`
	);
}

run().catch((err) => {
	console.error(err);
	process.exit(1);
});
