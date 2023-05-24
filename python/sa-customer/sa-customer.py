from dotenv import load_dotenv

from customerDialogSetup import customer_dialog_setup
from python.dialogueSimulator import DialogueSimulator
from python.selectNextSpeaker import select_next_speaker

load_dotenv()


def main():
    customer_name = "Sam"
    solutions_architect_name = "David"
    topic = "How do I move my game servers to AWS Reserved Instances cost effectively?"
    customer, specified_quest, solutions_architect = customer_dialog_setup(
        customer_name,
        topic,
        solutions_architect_name)

    max_iters = 8
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
