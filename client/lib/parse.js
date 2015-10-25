export const Parse = {
  Cloud: {
    run: (funcName, kwArgs, successCallback, errorCallback) => {
      jQuery.ajax('https://api.parse.com/1/functions/' + funcName, {
        method: 'POST',
        headers: {
          'X-Parse-Application-Id': CONFIG.parseApplicationId,
          'X-Parse-REST-API-Key': CONFIG.parseRestApiKey,
          'Content-Type': 'application/json'
        },
        data: {},
        success: (data, textStatus) => {
          if (successCallback) {
            successCallback(data.result)
          }
        },
        error: (jqXHR, textStatus, errorThrown) => {
          if (errorCallback) {
            errorCallback(errorThrown)
          }
        }
      })
    }
  }
}