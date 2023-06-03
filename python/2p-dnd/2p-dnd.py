from dotenv import load_dotenv

from python.dialogueSimulator import DialogueSimulator
from questDialogSetup import quest_dialog_setup
from python.selectNextSpeaker import select_next_speaker

load_dotenv()


def main():
    protagonist_name = "Harry Potter"
    storyteller_name = "Dungeon Master"
    quest = "Find all of Lord Voldemort's seven horcruxes."
    protagonist, specified_quest, storyteller = quest_dialog_setup(protagonist_name,
                                                                   quest,
                                                                   storyteller_name)

    max_iters = 6
    n = 0

    simulator = DialogueSimulator(
        agents=[storyteller, protagonist],
        selection_function=select_next_speaker
    )
    simulator.reset()
    simulator.inject(storyteller_name, specified_quest)
    print(f"({storyteller_name}): {specified_quest}")
    print('\n')

    while n < max_iters:
        name, message = simulator.step()
        print(f"({name}): {message}")
        print('\n')
        n += 1


main()
