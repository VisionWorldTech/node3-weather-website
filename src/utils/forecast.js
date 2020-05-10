const request = require('request')

const forecast = (latitude,longitude,callback) => {
  const url = 'http://api.weatherstack.com/current?access_key=6498b6233d1ec0422217a342ab7a4f11&query='+latitude+','+longitude+'&units=f'

  request({url, json: true}, (error,response) => {
    if(error){
      callback('Internet Not Connected',undefined)
    }else if(response.body.error){
      callback('Destination NA',undefined);
    }else{
      // callback(undefined,{
      //   temp: response.body.current.temperature,
      //   feels: response.body.current.feelslike
        
      //   // console.log('Weather is: '+ w_description+'. It\'s currently '+temp+' degree out. It feels like '+feels +' degree out.');
      // })
      callback(undefined,'Currently '+response.body.current.temperature+' degree out. It feels like '+response.body.current.feelslike+' degree out.')
      
    }
  })

}



module.exports = forecast