export interface Task {
  description: string;
  instructions: string;
  tasks: string;
  maxTokens: number;
}

const tasks: Record<string, Task> = {
  objective: {
    description: "Objective",
    instructions:
      "Users will interact with the web app built using {uiFramework} and {language}.",
    tasks: `Create a concise description for the {language} app: {objective}\\n
          Use your expertise to envision the app's purpose and functionality.`,
    maxTokens: 200,
  },
  architecture: {
    description: "Architecture",
    instructions: `You are given the app name and description.\\n
          App Name:\\n
          {objective}\\n
          Description: \\n
          {description}`,
    tasks: `Create a concise app architecture you can use to build the UX flow.\\n
          Outline the components and structure of the code.\\n
          Present the app architecture in an ordered list.`,
    maxTokens: 350,
  },
  ux_flow: {
    description: "UX Flow",
    instructions: `You are given the app name, description and architecture.\\n
                  App Name:\\n
                  {objective}\\n
                  Description: \\n
                  {description}\\n
                  Architecture:\\n
                  {architecture}`,
    tasks: `Create a concise UX flow that you can use to build code flow.\\n
              Present the UX flow an ordered list.`,
    maxTokens: 700,
  },
  code_flow: {
    description: "Code Flow",
    instructions: `You are given the app name, description, architecture and UX flow.\\n
                      App Name:\\n
                      {objective}\\n
                      Description: \\n
                      {description}\\n
                      Architecture:\\n
                      {architecture}\\n
                      UX Flow:\\n
                      {ux_flow}`,
    tasks: `Create a concise code flow you can use to write code.\\n
              Outline the code components and structure.\\n
              Present the code flow in an ordered list.`,
    maxTokens: 700,
  },
  app_code: {
    description: "App Code",
    instructions: `You are given the app name, description, architecture, UX flow and code flow.\\n
      App Name:\\n
      {objective}\\n
      Description: \\n
      {description}\\n
      Architecture:\\n
      {architecture}\\n
      UX Flow:\\n
      {ux_flow}
      Code Flow:\\n
      {code_flow}`,
    tasks: `Write the Python code for the app in a single python file.\\n
      Use SQLite python module for data storage .\\n
      Exclude environment setup, testing, debugging, and deployment tasks.\\n
      Build sample datasets with at least five items.\\n
      Follow these coding guidelines:
      - Check and create database tables first in the main function.\\n
      - Use pd.loc to append new rows to the DataFrame.\\n
      ---Example: event_data.loc[len(event_data)] = sample_events.loc[0]\\n
      - When building date sliders:\\n
      ---First Convert dates using to_pydatetime()
      ---Then use their min and max values in st.slider
      - Use pd.to_datetime() on selected date ranges when filtering calendar events.
      - Save all data in a SQLite database.`,
    maxTokens: 5000,
  },
};

export default tasks;
