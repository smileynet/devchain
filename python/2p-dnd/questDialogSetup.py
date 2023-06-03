from langchain.chat_models import ChatOpenAI
from langchain.schema import SystemMessage, HumanMessage

from python.dialogAgent import DialogueAgent


def quest_dialog_setup(protagonist_name, quest, storyteller_name):
    word_limit = 50  # word limit for task brainstorming
    game_description = f"""Here is the topic for a Dungeons & Dragons game: {quest}.
        There is one player in this game: the protagonist, {protagonist_name}.
        The story is narrated by the storyteller, {storyteller_name}."""
    player_descriptor_system_message = SystemMessage(
        content="You can add detail to the description of a Dungeons & Dragons player.")
    protagonist_specifier_prompt = [
        player_descriptor_system_message,
        HumanMessage(content=
                     f"""{game_description}
          Please reply with a creative description of the protagonist, {protagonist_name}, in {word_limit} words or less.
          Speak directly to {protagonist_name}.
          Do not add anything else."""
                     )
    ]
    protagonist_description = ChatOpenAI(temperature=1.0)(
        protagonist_specifier_prompt).content
    storyteller_specifier_prompt = [
        player_descriptor_system_message,
        HumanMessage(content=
                     f"""{game_description}
          Please reply with a creative description of the storyteller, {storyteller_name}, in {word_limit} words or less.
          Speak directly to {storyteller_name}.
          Do not add anything else."""
                     )
    ]
    storyteller_description = ChatOpenAI(temperature=1.0)(
        storyteller_specifier_prompt).content
    print('Protagonist Description:')
    print(protagonist_description)
    print('Storyteller Description:')
    print(storyteller_description)
    protagonist_system_message = SystemMessage(content=(
        f"""{game_description}
  Never forget you are the protagonist, {protagonist_name}, and I am the storyteller, {storyteller_name}.
  Your character description is as follows: {protagonist_description}.
  You will propose actions you plan to take and I will explain what happens when you take those actions.
  Speak in the first person from the perspective of {protagonist_name}.
  For describing your own body movements, wrap your description in '*'.
  Do not change roles!
  Do not speak from the perspective of {storyteller_name}.
  Do not forget to finish speaking by saying, 'It is your turn, {storyteller_name}.'
  Do not add anything else.
  Remember you are the protagonist, {protagonist_name}.
  Stop speaking the moment you finish speaking from your perspective.
  """
    ))
    storyteller_system_message = SystemMessage(content=(
        f"""{game_description}
  Never forget you are the storyteller, {storyteller_name}, and I am the protagonist, {protagonist_name}.
  Your character description is as follows: {storyteller_description}.
  I will propose actions I plan to take and you will explain what happens when I take those actions.
  Speak in the first person from the perspective of {storyteller_name}.
  For describing your own body movements, wrap your description in '*'.
  Do not change roles!
  Do not speak from the perspective of {protagonist_name}.
  Do not forget to finish speaking by saying, 'It is your turn, {protagonist_name}.'
  Do not add anything else.
  Remember you are the storyteller, {storyteller_name}.
  Stop speaking the moment you finish speaking from your perspective.
  """
    ))
    quest_specifier_prompt = [
        SystemMessage(content="You can make a task more specific."),
        HumanMessage(content=
                     f"""{game_description}

        You are the storyteller, {storyteller_name}.
        Please make the quest more specific. Be creative and imaginative.
        Please reply with the specified quest in {word_limit} words or less.
        Speak directly to the protagonist {protagonist_name}.
        Do not add anything else."""
                     )
    ]
    specified_quest = ChatOpenAI(temperature=1.0)(
        quest_specifier_prompt).content
    print(f"Original quest:\n{quest}\n")
    print(f"Detailed quest:\n{specified_quest}\n")
    # Main Loop
    protagonist = DialogueAgent(name=protagonist_name,
                                system_message=protagonist_system_message,
                                model=ChatOpenAI(temperature=0.2))
    storyteller = DialogueAgent(name=storyteller_name,
                                system_message=storyteller_system_message,
                                model=ChatOpenAI(temperature=0.2))
    return protagonist, specified_quest, storyteller
