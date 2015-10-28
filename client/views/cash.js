view Cash {
  <num>{"$" + ^amount}</num>
  <dollar-img src="/static/images/dollar.jpg" repeat={^amount} />
  
  $ = {
    flexDirection: 'row'
  }
  
  $dollar = {
    maxWidth: 120
  }
}
