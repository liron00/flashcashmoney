view Bill {
  <img src={`/static/images/${^denomination}bill.jpg`} />
  
  $img = {
    width: CONFIG.billWidth - 2,
    height: CONFIG.billWidth / CONFIG.billAspectRatio - 2,
    border: '1px solid #ddd'
  }
}
