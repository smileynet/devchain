export interface WorkflowTask {
  description: string;
  taskVariables?: string[];
  task: string;
  maxTokens: number;
  temperature?: number;
}

export interface Workflow {
  systemTemplate: string;
  inheritedMemory?: string;
  tasks: Record<string, WorkflowTask>;
}
