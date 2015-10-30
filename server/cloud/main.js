var config = {
    firebaseAppName: 'flashcashmoney',
    firebaseAppSecret: 'bVdqhMf0aLoIhVTalf8uhNKxkwrZdmX8To6L8r2X',
    
    stripeTestSecretKey: 'sk_test_W8438ywJgGRb4WcHvu3zTcEc',
    stripeLiveSecretKey: 'sk_live_qEaKjM1OQc9n9c71wK1FMe6c',
    
    isLive: false
};

var firebaseApiBaseUrl = "https://" + config.firebaseAppName + ".firebaseio.com/";

var stripeSecretKey = (
  config.isLive? config.stripeLiveSecretKey : config.stripeTestSecretKey
);
var stripeApiBaseUrl = "https://" + stripeSecretKey + ":@api.stripe.com/v1/";

Parse.Cloud.define("flash", function(request, response) {
  var amount = request.params.amount;
  var uid = request.params.uid;
  var trash = request.params.trash;
  
  if (amount !== parseInt(amount)) {
    response.error("Invalid amount: " + amount);
    return;
  }
  
  if (trash != null) {
    if (!(typeof trash == 'string') || trash.length == 0 || trash.length > 140) {
      response.error("Invalid trash talk: " + trash);
      return;
    }
  }
  
  Parse.Cloud.httpRequest({
    method: 'POST',
    url: stripeApiBaseUrl + 'charges',
    params: {
      amount: 100 * amount,
      currency: 'usd',
      source: request.params.stripeToken,
      statement_descriptor: "FlashCash.money"
    }
  }).then(function(resp) {
    // Stripe request success
    return Parse.Cloud.httpRequest({
      method: 'POST',
      url: firebaseApiBaseUrl + "flashes.json",
      headers: {
        'Content-Type': 'application/json'
      },
      params: {
        auth: config.firebaseAppSecret
      },
      body: JSON.stringify({
        amount: amount,
        timestamp: {'.sv': 'timestamp'},
        uid: uid,
        trash: trash
      })
    });
      
  }, function(resp) {
    // Stripe request error
    response.error(resp.data.error.message);      
    
  }).then(function(resp) {
    // Firebase request success
    response.success({flashId: resp.data.name});
    
  }, function(resp) {
    // Firebase request error
    response.error(resp.data.error.message);
  });
});
