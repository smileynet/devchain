export interface Task {
  description: string;
  instructionVariables?: string[];
  instructions?: string;
  taskVariables?: string[];
  task: string;
  maxTokens: number;
}

const tasks: Record<string, Task> = {
  objective: {
    description: "Objective",
    taskVariables: ["language", "uiFramework", "objective"],
    task: `Use your expertise to envision the app's purpose and functionality.
Users will interact with the web app built using {uiFramework} and {language}.
Create a concise description for the {language} app: {objective}`,
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
    instructions: `Referencing the app name, description and architecture
    previously discussed, complete the task below`,
    task: `Create a concise UX flow that you can use to build code flow.\\n
              Present the UX flow an ordered list.`,
    maxTokens: 700,
  },
  code_flow: {
    description: "Code Flow",
    instructions: `Referencing the app name, description, architecture
    and UX flow previously discussed, complete the task below.`,
    task: `Create a concise code flow you can use to write code.\\n
              Outline the code components and structure.\\n
              Present the code flow in an ordered list.`,
    maxTokens: 70,
  },
  app_code: {
    description: "App Code",
    instructions: `Referencing the app name, description, architecture, UX flow
    and code flow  previously discussed, complete the task below.`,
    task: `Write the code for the app in a single file`,
    maxTokens: 500,
  ,
};

export default tasks;

/**
 Write the Python code for the app in a single python file.\n
 Use SQLite for data storage .\n
 Exclude environment setup, testing, debugging, and deployment tasks.\n
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
