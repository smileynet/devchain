import { BufferMemory } from "langchain/memory";

class MemoryManager {
  private memories: Record<string, BufferMemory> = {};

  getBufferMemory(key: string): BufferMemory {
    if (!this.memories[key]) {
      this.memories[key] = new BufferMemory({ memoryKey: key });
    }
    return this.memories[key];
  }

  createBufferMemoryFrom(fromKey: string, toKey: string) {
    this.memories[toKey] = new BufferMemory(
      {
        chatHistory: this.memories[fromKey].chatHistory,
        memoryKey: toKey
      });
  }
}

export default new MemoryManager();
