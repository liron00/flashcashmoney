view FaqPage {
  <Header authUser={view.props.authUser} />
  <question>
    What is flashcash.money?
  </question>
  <answer>
    flashcash.money is the #1 place to flash your cash.
  </answer>
  <question>
    Are you really going to charge my credit card when I flash cash?
  </question>
  <answer>
    Yes.
  </answer>
  <question>
    How long does the cash flash last for?
  </question>
  <answer>
    Flashes stay on the front page for 24 hours.
  </answer>
  <question>
    Wouldn't it be better to spend my cash on goods and services?
  </question>
  <answer>
    No, spending on goods and services is what someone who doesn't have a lot of
    cash would do. If you're a cool person, you probably have a lot of cash,
    so you should flash it.
  </answer>
  <question>
    Why are you encouraging me to trash talk?
  </question>
  <answer>
    You're brash to flash cash so let's see you splash trash.
  </answer>
  <question>
    How can I support flashcash.money?
  </question>
  <answer>
    Thanks for asking! A cash donation would definitely help us out.
    <DonateButton />
  </answer>
  
  $ = {
    fontFamily: 'Copperplate',
    marginBottom: 50
  }
  
  $Header = {
    marginBottom: 10
  }

  $question = {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#999',
    lineHeight: '100%'
  }

  $answer = {
    fontSize: 24,
    marginBottom: 40
  }
}
