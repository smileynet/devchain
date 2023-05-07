import * as fs from "fs";
import * as yaml from "js-yaml";
import * as path from "path";

type FileType = "txt" | "md" | "yaml" | "json";

export async function writeOutputToFile(
  output: any,
  fileName: string,
  fileType: FileType,
  objective: string,
  outputPath?: string
): Promise<void> {
  let fileContent: string;

  switch (fileType) {
    case "txt":
    case "md":
      fileContent = output;
      break;
    case "yaml":
      fileContent = yaml.dump(output);
      break;
    case "json":
      fileContent = output;
      break;
    default:
      throw new Error(`Unsupported file type: ${fileType}`);
  }

  const subFolder = objective.split(" ").slice(0, 3).join("_");

  const basePath = outputPath || process.env.OUTPUT_PATH || "./output";

  const finalOutputPath = path.join(basePath, subFolder);
  const filePath = path.join(finalOutputPath, `${fileName}.${fileType}`);

  try {
    await fs.promises.mkdir(finalOutputPath, { recursive: true });
    await fs.promises.writeFile(filePath, fileContent, "utf-8");
    console.log(`Successfully wrote output to ${filePath}`);
  } catch (error) {
    console.error(`Error writing output to file: ${error}`);
  }
}
