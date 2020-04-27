const request =  require('request');

const forecast = (lat,lon,callback) =>{
    const url="http://api.weatherstack.com/current?access_key=62fd36c66773a7c2d5df772d8a0ea4cf&query="+lat+","+lon+"";
    request({url,json:true},(error,{body})=>{
        if(error){
            callback("Problem with your connection",undefined);
        }else if(body.success == false){
            callback("Not found forecast",undefined);
        }else{
            const {temperature,feelslike} = body.current
            const {name} = body.location
            callback(undefined,{
                temperature,
                feelslike,
                location: name
            });
        }
    })
}



module.exports= forecast