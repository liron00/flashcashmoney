view SocialButtons {
  on('mount', () => {
    if (window.FB) {
      FB.XFBML.parse()
    }
    if (window.twttr) {
      twttr.widgets.load()
    }
  })
  
  <facebook>
    <div class="fb-share-button"
      data-layout="button_count" />
  </facebook>
  <twitter>
    <a class="twitter-share-button"
      href="https://twitter.com/share"
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
