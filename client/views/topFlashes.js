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
    
    periodFlashes = []
    for (let uid in flashesByUid) {
      let periodAmount = 0
      flashesByUid[uid].forEach(flash => {
        periodAmount += flash.amount
      })
      
      periodFlashes.push({
        uid: uid,
        amount: periodAmount,
        timestamp: flashesByUid[uid][0].timestamp
      })
    }
  });
  

  <loadingFlashes if={flashes === undefined}>
    Loading flashes...
  </loadingFlashes>
  <flashesLoaded if={periodFlashes}>
    <Flash repeat={periodFlashes} flash={_} />
  </flashesLoaded>
}