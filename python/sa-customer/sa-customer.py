from dotenv import load_dotenv

from customerDialogSetup import customer_dialog_setup
from python.dialogueSimulator import DialogueSimulator
from python.selectNextSpeaker import select_next_speaker

load_dotenv()


def main(customer_name: str, solutions_architect_name: str, topic: str,
         max_iterations: int):
    customer, specified_quest, solutions_architect = customer_dialog_setup(
        customer_name,
        topic,
        solutions_architect_name)

    iteration_count = 0

    simulator = DialogueSimulator(
        agents=[solutions_architect, customer],
        selection_function=select_next_speaker
    )
    simulator.reset()
    simulator.inject(solutions_architect_name, specified_quest)

    while iteration_count < max_iterations:
        name, message = simulator.step()
        iteration_count += 1


if __name__ == "__main__":
    customer_name = "Sam"
    solutions_architect_name = "David"
    topic = "How do I move my game servers to AWS Reserved Instances cost effectively?"
    max_iterations = 8

    main(customer_name, solutions_architect_name, topic, max_iterations)
