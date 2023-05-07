import chalk from "chalk";
import { PerformanceEntry } from "perf_hooks";

export default function logPerformanceMeasures(
  measures: PerformanceEntry[]
): void {
  console.log(chalk.magenta("Performance results:"));
  for (const measure of measures) {
    const seconds = (measure.duration / 1000).toFixed(2);
    console.log(chalk.cyan(`${measure.name}:`) + `${seconds} seconds`);
  }
}
