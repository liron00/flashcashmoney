view Cash {
  const BILL_OFFSET = 8
  const DENOM_OFFSET = 15
  const billHeight = CONFIG.billWidth / CONFIG.billAspectRatio
  let width
  let height
  
  const getBillStacks = () => {
    const denomMap = util.getDenominationMap(^amount, CONFIG.denominations)
    const billStacks = []
    
    width = 0
    height = 0
    let i = 0
    for (denom of CONFIG.denominations) {
      const numBills = denomMap[denom] || 0
      if (numBills > 0) {
        let left = width
        let top = height
        if (i > 0) {
          left = left - CONFIG.billWidth + DENOM_OFFSET
          top = top - billHeight + DENOM_OFFSET
        }
        billStacks.push({
          num: numBills,
          denomination: denom,
          left: left,
          top: top,
        })
        if (i == 0) {
          width = CONFIG.billWidth
          height = billHeight
        } else {
          width += DENOM_OFFSET
          height += DENOM_OFFSET
        }
        width += BILL_OFFSET * (numBills - 1)
        height += BILL_OFFSET * (numBills - 1)
        i += 1
      }
    }
    return billStacks
  }
    
  let billStacks = getBillStacks()
  
  on('props', () => {
    billStacks = getBillStacks()
  })
  
  <x>
    <billStackWrapper repeat={billStacks}>
      <BillStack
        num={_.num}
        denomination={_.denomination}
        offset={BILL_OFFSET} />
    </billStackWrapper>
  </x>
  
  $ = {
    position: 'relative',
    width,
    height
  }
  
  $billStackWrapper = {
    position: 'absolute',
    left: billStacks[_index].left,
    top: billStacks[_index].top
  }
}
