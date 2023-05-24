from langchain.chat_models import ChatOpenAI
from langchain.schema import SystemMessage, HumanMessage

from python.dialogAgent import DialogueAgent


def customer_dialog_setup(customer_name, topic, sa_name):
    word_limit = 50  # word limit for task brainstorming
    discussion_description = f"""Here is the topic for a AWS architecture discussion: {topic}.
        There is one learner in the discussion: the customer, {customer_name}.
        The conversation is led by a Solutions Architect, {sa_name}."""
    customer_descriptor_system_message = SystemMessage(
        content="You can add detail to the description of an AWS customer.")
    customer_specifier_prompt = [
        customer_descriptor_system_message,
        HumanMessage(content=
                     f"""{discussion_description}
          Please reply with a creative description of the AWS customer, {customer_name}, in {word_limit} words or less.
          This is a business customer of AWS.
          They work for a company that is trying to solve a problem using AWS.
          Speak directly to {customer_name}.
          Do not add anything else."""
                     )
    ]
    customer_description = ChatOpenAI(temperature=1.0)(
        customer_specifier_prompt).content
    sa_specifier_prompt = [
        customer_descriptor_system_message,
        HumanMessage(content=
                     f"""{discussion_description}
          Please reply with a creative description of the Solutions Architect, {sa_name}, in {word_limit} words or less.
          This is an AWS employee and a technical expert. Their goal is to help the customer design a solution.
          The solution should be an AWS architecture that solves the customer problem.
          Speak directly to {sa_name}.
          Do not add anything else."""
                     )
    ]
    sa_description = ChatOpenAI(temperature=1.0)(
        sa_specifier_prompt).content
    print('Customer Description:')
    print(customer_description)
    print('SA Description:')
    print(sa_description)
    customer_system_message = SystemMessage(content=(
        f"""{discussion_description}
  Never forget you are the customer, {customer_name}, and I am the Solutions Architect, {sa_name}.
  Your description is as follows: {customer_description}.
  You will as questions about how to solve your problem and how my solution works.
  I will propose solutions to your problem and answer your questions about my proposal.
  Speak in the first person from the perspective of {customer_name}.
  Do not change roles!
  Do not speak from the perspective of {sa_name}.
  Do not forget to finish speaking by saying, 'What do you think, {sa_name}?'
  Do not add anything else.
  Remember you are the customer, {customer_name}.
  Stop speaking the moment you finish speaking from your perspective.
  """
    ))
    sa_system_message = SystemMessage(content=(
        f"""{discussion_description}
  Never forget you are the Solutions Architect, {sa_name}, and I am the customer, {customer_name}.
  Your  description is as follows: {sa_description}.
  I will ask for help solving a problem and will ask questions about your solution.
  Speak in the first person from the perspective of {sa_name}.
  Do not change roles!
  Do not speak from the perspective of {customer_name}.
  Do not forget to finish speaking by saying, 'Any questions, {customer_name}?'
  Do not add anything else.
  Remember you are the storyteller, {sa_name}.
  Stop speaking the moment you finish speaking from your perspective.
  """
    ))
    topic_specifier_prompt = [
        SystemMessage(content="You can make a topic more specific."),
        HumanMessage(content=
                     f"""{discussion_description}

        You are the Solutions Architect, {sa_name}.
        Please make the topic more specific.
        The topic is based on the customer's problem that you are helping them solve.
        Please reply with the specified topic in {word_limit} words or less.
        The topic should related to AWS services.
        Describe the topic by restating it to the customer as if they were asking you about it.
        Speak directly to the customer {customer_name}.
        Do not add anything else."""
                     )
    ]
    specified_topic = ChatOpenAI(temperature=1.0)(
        topic_specifier_prompt).content
    print(f"Original quest:\n{topic}\n")
    print(f"Detailed quest:\n{specified_topic}\n")
    # Main Loop
    customer = DialogueAgent(name=customer_name,
                                system_message=customer_system_message,
                                model=ChatOpenAI(temperature=0.2))
    solutions_architect = DialogueAgent(name=sa_name,
                                system_message=sa_system_message,
                                model=ChatOpenAI(temperature=0.2))
    return customer, specified_topic, solutions_architect
