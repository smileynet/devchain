import chalk from "chalk";
import { performance } from "perf_hooks";

export default async function measurePerformance<T extends any[], R>(
  functionInstance: (...args: T) => Promise<R>,
  context: any,
  args: T,
  markName?: string
): Promise<R> {
  const marker = markName || functionInstance.name || "anonymous";
  console.log(chalk.yellow("Measuring: "), marker);
  performance.mark(marker + "-start");
  const result = await functionInstance.apply(context, args);
  performance.mark(marker + "-finish");
  const duration = performance.measure(
    marker + "-duration",
    marker + "-start",
    marker + "-finish"
  ).duration;
  const seconds = (duration / 1000).toFixed(2);
  console.log(chalk.yellow("Seconds taken: "), seconds);
  return result;
}
