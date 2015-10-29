view Cash {
  <num>{"$" + ^amount}</num>
  <dollar-img src="/static/images/1bill.jpg" repeat={^amount} />
  
  $ = {
    flexDirection: 'row'
  }
  
  $dollar = {
    maxWidth: 120
  }
}
