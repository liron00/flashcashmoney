import _ from 'lodash'

const bigArray = []
const hack = `
  for (let i = 0; i < 10000; i++) {
    bigArray.push({})
  }
`
eval(hack)

view Cash {
  <dollar-img src="/static/images/dollar.jpg" repeat={bigArray.slice(0, ^amount)} />
  
  $ = {
    flexDirection: 'row'
  }
  
  $dollar = {
    maxWidth: 100
  }
}