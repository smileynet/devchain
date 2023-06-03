from langchain.chat_models import ChatOpenAI
from langchain.schema import SystemMessage, HumanMessage

from python.dialogAgent import DialogueAgent


def customer_dialog_setup(customer_name: str, topic: str, sa_name: str,
                          word_limit: int = 200):
    discussion_description = f"""Here is the topic for an AWS architecture discussion: {topic}.
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
          This is an AWS employee and a technical expert.
          Their goal is to help the customer design a solution.
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
  You have very limited knowledge of AWS.
  You are concerned about cost and don't want to move your servers to the cloud.
  You're worried what will happen if your game isn't a success and you don't need the capacity.
  You will as questions about how to solve your problem and how my solution works.
  I will propose solutions to your problem and answer your questions about my proposal.
  You will only ask questions about AWS services that have already mentioned.
  You will ask questions about different parts of of the proposed architecture after it has been described.
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
  You will begin by by restating the customer problem and then provide a summary of the proposed solution.
  The solution should be described in general terms.
  Only mention AWS services as potential examples as parts of the solution.
  Only mention AWS services that are relevant to the solution.
  You will answer questions about the proposed solution as if explaining it to a teenager.
  You will only give detailed answers about AWS services when asked about them.
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
        The topic should be a business problem that is solvable using AWS services.
        The topic should include a solution that use to AWS services.
        Describe the topic by restating it to the customer as if they have just explained their problem to you.
        Speak directly to the customer {customer_name}.
        Do not add anything else."""
                     )
    ]
    specified_topic = ChatOpenAI(temperature=1.0)(
        topic_specifier_prompt).content
    print(f"Original topic:\n{topic}\n")
    # Main Loop
    customer = DialogueAgent(name=customer_name,
                             system_message=customer_system_message,
                             model=ChatOpenAI(modelName="gpt-3.5-turbo", temperature=0.2))
    solutions_architect = DialogueAgent(name=sa_name,
                                        system_message=sa_system_message,
                                        model=ChatOpenAI(modelName="gpt-3.5-turbo", temperature=0.2))
    return customer, specified_topic, solutions_architect
