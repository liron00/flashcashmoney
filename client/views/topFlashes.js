view TopFlashes {
  var now = new Date().getTime()
  const flashesQuery = ref.child('flashes')
    .orderByChild("timestamp")
    .startAt(now - 1000 * CONFIG.flashPeriod)
    
  let flashes // [reverse chrono flashes]
  let flashesByUid // uid: [reverse chrono flashes]
  
  // A period flash object is like a flash, except its
  // amount is this uid's aggregate from this flashPeriod.
  // E.g. if a user flashed $5 and $6 in the last 24 hours,
  // they would have one periodFlash with an amount of 11.
  let periodFlashes
  let sortedPeriodFlashes
  
  flashesQuery.on('value', flashesSnapshot => {
    flashes = []
    flashesSnapshot.forEach(flashSnapshot => {
      const flash = flashSnapshot.val()
      flash.id = flashSnapshot.key()
      flashes.push(flash)
    })
    flashes.reverse()
    
    flashesByUid = {}
    flashes.forEach(flash => {
      if (!(flash.uid in flashesByUid)) {
        flashesByUid[flash.uid] = []
      }
      flashesByUid[flash.uid].push(flash)
    })
    
    sortedPeriodFlashes = undefined
    periodFlashes = []
    for (let uid in flashesByUid) {
      let periodAmount = 0
      let trash = null
      flashesByUid[uid].forEach(flash => {
        if (!trash) {
          trash = flash.trash
        }
        periodAmount += flash.amount
      })
      
      periodFlashes.push({
        uid: uid,
        amount: periodAmount,
        trash: trash,
        timestamp: flashesByUid[uid][0].timestamp
      })
    }
    periodFlashes.sort((a, b) => b.amount - a.amount)
    sortedPeriodFlashes = periodFlashes
  });
  

  <loadingFlashes if={flashes === undefined}>
    Loading flashes...
  </loadingFlashes>
  <flashesLoaded if={sortedPeriodFlashes}>
    <Flash repeat={sortedPeriodFlashes} flash={_} />
  </flashesLoaded>
}
