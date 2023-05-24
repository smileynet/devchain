from dotenv import load_dotenv

from python.dialogueSimulator import DialogueSimulator
from python.selectNextSpeaker import select_next_speaker
from customerDialogSetup import customer_dialog_setup

load_dotenv()


def main():
    customer_name = "Sam"
    solutions_architect_name = "David"
    topic = "How do I build an analytics pipeline for my online video games?"
    customer, specified_quest, solutions_architect = customer_dialog_setup(customer_name,
                                                                   topic,
                                                                   solutions_architect_name)

    max_iters = 6
    n = 0

    simulator = DialogueSimulator(
        agents=[solutions_architect, customer],
        selection_function=select_next_speaker
    )
    simulator.reset()
    simulator.inject(solutions_architect_name, specified_quest)
    print(f"({solutions_architect_name}): {specified_quest}")
    print('\n')

    while n < max_iters:
        name, message = simulator.step()
        print(f"({name}): {message}")
        print('\n')
        n += 1


main()
