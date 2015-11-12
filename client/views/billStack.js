view BillStack {
  const billHeight = CONFIG.billWidth / CONFIG.billAspectRatio
  let offset
  let width
  let height
  
  on.props(() => {
    offset = view.props.offset || 10
    
    if (view.props.num > 0) {
      width = CONFIG.billWidth + offset * (view.props.num - 1)
      height = billHeight + offset * (view.props.num - 1)
    } else {
      width = null
      height = null
    }
  })
  
  <Bill repeat={view.props.num} denomination={view.props.denomination} />

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
