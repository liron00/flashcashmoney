export const util = {}

Object.assign(util, {
  getDenominationMap: (amount, denominations) => {
    denominations = denominations.slice()
    denominations.sort((a, b) => b - a)
    
    const denominationMap = {}
    for (denomination of denominations) {
      const numBills = Math.floor(amount / denomination)
      if (numBills > 0) {
        denominationMap[denomination] = numBills
        amount -= numBills * denomination
      }
    }
    return denominationMap
  },
  
  makeSlug: str => {
    return str.toLowerCase().replace(/[^a-z]+/g, '-')
  }
})
