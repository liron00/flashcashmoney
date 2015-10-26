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
  if (amount !== parseInt(amount)) {
    response.error("Invalid amount: " + amount);
    return;
  }
  
  Parse.Cloud.httpRequest({
    url: stripeApiBaseUrl + 'charges',
    method: 'POST',
    params: {
      amount: 100 * amount,
      currency: 'usd',
      source: request.params.stripeToken,
      statement_descriptor: "FlashCash.money"
    }
  }).then(function(resp) {
    /*
      admin REST request to Firebase
      to write the flash entry.
    */
      
  }, function(resp) {
    response.error(resp.data.error.message);      
    
  }).then(function(resp) {
      response.success("woo");
  });
});
