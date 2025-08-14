import { readdirSync, readFileSync, writeFileSync, statSync } from "fs";
import path from "path";
import { fileURLToPath } from "url";


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const baseDir = path.join(__dirname, "../public/images/devices");

function getRandomElement(array) {
  return array[Math.floor(Math.random() * array.length)];
}
function updateMetaJson(directory) {
  const entries = readdirSync(directory);

  for (const entry of entries) {
    const fullPath = path.join(directory, entry);

    if (statSync(fullPath).isDirectory()) {
      updateMetaJson(fullPath);
    } else if (entry === "meta.json") {
      const meta = JSON.parse(readFileSync(fullPath, "utf-8"));

      meta.overallScore = meta.overallScore || Math.floor(Math.random() * 5) + 1;
      meta.warranty = meta.warranty || `${Math.floor(Math.random() * 5) + 1} year`;
      meta.repairability = meta.repairability || getRandomElement(["Low", "Moderate", "High"]);
      meta.modularity = meta.modularity || getRandomElement(["No", "Partial", "Full"]);
      meta.lifespan = meta.lifespan || `${Math.floor(Math.random() * 9) + 2} years`;
      meta.buildQuality = meta.buildQuality || getRandomElement(["Low", "Medium", "High", "Very High"]);

      writeFileSync(fullPath, JSON.stringify(meta, null, 2));
      console.log(`Updated: ${fullPath}`);
    }
  }
}

updateMetaJson(baseDir);
console.log("✅ All meta.json files have been updated.");
