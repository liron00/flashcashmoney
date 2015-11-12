view SocialButtons {
  on.mount(() => {
    if (window.FB) {
      FB.XFBML.parse()
    }
    if (window.twttr) {
      twttr.widgets.load()
    }
  })
  
  <facebook>
    <div class="fb-share-button"
      data-layout="button_count"
      data-href={isStaticRoute()? "https://flashcash.money": null} />
  </facebook>
  <twitter>
    <a class="twitter-share-button"
      href="https://twitter.com/share"
      data-url={isStaticRoute()? "https://flashcash.money" : null}
      data-text={isStaticRoute()?
        "The #1 place to flash your cash":
        "I got some muthafuckin cash money"}
    >
      Tweet
    </a>
  </twitter>
  
  $ = {
    flexDirection: 'row'
  }
  
  $facebook = {
    position: 'relative',
    top: -2
  }
  
  $twitter = {
    position: 'relative',
    top: 3,
    left: 8
  }
  
  $a = {
    color: 'rgba(0, 0, 0, 0)'
  }
}
