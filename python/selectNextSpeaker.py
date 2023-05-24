from typing import List

from python.dialogAgent import DialogueAgent


def select_next_speaker(step: int, agents: List[DialogueAgent]) -> int:
    idx = step % len(agents)
    return idx
