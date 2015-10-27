const bigArray = []
for (let i = 0; i < 10000; i++) {
  bigArray.push({})
}

view Cash {
  <num>{"$" + ^amount}</num>
  <dollar-img src="/static/images/dollar.jpg" repeat={bigArray.slice(0, ^amount)} />
  
  $ = {
    flexDirection: 'row'
  }
  
  $dollar = {
    maxWidth: 100
  }
}