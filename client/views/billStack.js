view BillStack {
  const billHeight = CONFIG.billWidth / CONFIG.billAspectRatio
  let offset
  let width
  let height
  
  on('props', () => {
    offset = ^offset || 10
    
    if (^num > 0) {
      width = CONFIG.billWidth + offset * (^num - 1)
      height = billHeight + offset * (^num - 1)
    } else {
      width = null
      height = null
    }
  })
  
  <Bill repeat={^num} denomination={^denomination} />

  $ = {
    position: 'relative',
    width,
    height
  }

  $Bill = {
    position: 'absolute',
    marginLeft: offset * _index,
    marginTop: offset * _index
  }
}
