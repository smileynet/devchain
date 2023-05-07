import chalk from "chalk";
import stateOfTheUnionChroma from "./examples/stateOfTheUnionChroma.js";
import stateOfTheUnionHNSW from "./examples/stateOfTheUnionHNSW.js";
import logPerformanceMeasures from "./utils/logPerformanceMeasures.js";

export default async function test() {
  console.log(chalk.cyan("Running tests..."));
  //const model = davinci;
  //await gameProgrammingPatterns(model);

  await stateOfTheUnionChroma();
  await stateOfTheUnionHNSW();

  logPerformanceMeasures(performance.getEntriesByType("measure"));
}
