import fs from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const filePath = join(__dirname, "photos.json");
const data = JSON.parse(fs.readFileSync(filePath, "utf-8"));

const withIds = data.map((obj) => ({
	id: crypto.randomUUID(),
	...obj,
}));

fs.writeFileSync(filePath, JSON.stringify(withIds, null, 2), "utf-8");
console.log("Updated data.json with UUIDs!");
