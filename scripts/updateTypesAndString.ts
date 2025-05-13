import fs from "fs";
import path, { join, dirname } from "path";
import fetch from "node-fetch";
import unzipper from "unzipper";
import { fileURLToPath } from "url";

const remixUrl = "https://github.com/Remix-Design/RemixIcon/archive/refs/heads/master.zip";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const iconsOutputDir = join(__dirname, "../src/icons");
const typesOutputFile = join(__dirname, "../src/types.ts");

async function updateIconsAndGenerateTypes() {
  if (!fs.existsSync(iconsOutputDir)) {
    fs.mkdirSync(iconsOutputDir, { recursive: true });
  }

  const res = await fetch(remixUrl);
  const zipStream = res.body;
  if (!zipStream) throw new Error("Failed to fetch remix icon zip");

  const iconNames: string[] = [];

  await new Promise<void>((resolve, reject) => {
    zipStream
      .pipe(unzipper.Parse())
      .on("entry", async (entry) => {
        const fileName = entry.path;

        if (fileName.endsWith(".svg") && fileName.includes("/icons/")) {
          const rawName = path.basename(fileName, ".svg"); // e.g., 24-hours-fill
          const exportName = rawName.replace(/^[0-9]/, "_$&").replace(/-/g, "_");

          iconNames.push(rawName);

          const chunks: Buffer[] = [];
          entry.on("data", (chunk) => chunks.push(chunk));
          entry.on("end", () => {
            const content = Buffer.concat(chunks).toString("utf-8").replace(/`/g, "\\`");
            const outputPath = join(iconsOutputDir, `${exportName}.ts`);
            fs.writeFileSync(outputPath, `export default \`${content}\`;`, "utf-8");
          });
        } else {
          entry.autodrain();
        }
      })
      .on("close", resolve)
      .on("error", reject);
  });

  const typeContent = `export type IconName = ${iconNames
    .map((name) => `'${name}'`)
    .join(" | ")};

export type IconType = {
  iconName: IconName;
};`;

  fs.writeFileSync(typesOutputFile, typeContent, "utf-8");
  console.log(`✅ Successfully created ${iconNames.length} icons and generated types.`);
}

updateIconsAndGenerateTypes().catch(console.error);
