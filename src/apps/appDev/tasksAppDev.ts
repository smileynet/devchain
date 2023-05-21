export interface Task {
  description: string;
  instructionVariables?: string[];
  instructions?: string;
  taskVariables?: string[];
  task: string;
  maxTokens: number;
}

const tasksAppDev: Record<string, Task> = {
  objective: {
    description: "Objective",
    taskVariables: ["language", "uiFramework", "objective"],
    task: `Use your expertise to envision the app's purpose and functionality.
Users will interact with the web app built using {uiFramework} and {language}.
Create a concise description for the {language} app: {objective}.`,
    maxTokens: 200,
  },
  architecture: {
    description: "Architecture",
    task: `Reference the project name and description previously discussed, complete the task below:
Create a concise application architecture you can use to build a UX flow from.
Outline the components and structure of the code.
Present the application architecture in an ordered list.`,
    maxTokens: 35,
  },
  ux_flow: {
    description: "UX Flow",
    task: `Referencing the app name, description and architecture previously discussed, complete the task below
Create a concise UX flow that you can use to build code flow.
Present the UX flow an ordered list.`,
    maxTokens: 700,
  },
  code_flow: {
    description: "Code Flow",
    task: `Referencing the app name, description, architecture and UX flow previously discussed, complete the task below.
Create a concise code flow you can use to write code.
Outline the code components and structure.
Present the code flow in an ordered list.`,
    maxTokens: 700,
  },
  app_code: {
    description: "App Outline",
    task: `Referencing the app name, description, architecture, UX flow
and code flow  previously discussed, complete the task below.
Write a YAML outline that contains a list of files, classes, and methods to be completed later.
Provide comments for each item for use in future generations.`,
    maxTokens: 2000,
  },
};

export default tasksAppDev;

/**
 Write the Python code for the app in a single python file.\n
 Use SQLite for data storage .\n
 Exclude environment gameDesignSetup, testing, debugging, and deployment tasksAppDev.\n
 Build sample datasets with at least five items.\n
 Follow these coding guidelines:
 - Check and create database tables first in the main function.\n
 - Use pd.loc to append new rows to the DataFrame.\n
 ---Example: event_data.loc[len(event_data)] = sample_events.loc[0]\n
 - When building date sliders:\n
 ---First Convert dates using to_pydatetime()
 ---Then use their min and max values in st.slider
 - Use pd.to_datetime() on selected date ranges when filtering calendar events.
 - Save all data in a SQLite database.
 **/
