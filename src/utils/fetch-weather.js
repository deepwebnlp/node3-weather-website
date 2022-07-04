// const request = require('request')

// const weather = (location , callback) => {
//     const url = 'http://api.weatherapi.com/v1/current.json?key=59d27a6771f4479f9d504617220706&q= '+ encodeURIComponent(location) +' &aqi=no'

//     request({url: url , json : true} , (error , response ) => {
//         if(error){
//             callback('Some issue occue while connecting to server like internet etc' , undefined)
//         }
//         else if(response.body.error != null)
//             {
//                 if(response.body.error.message === 'No matching location found.'){
//                     callback('No matching location found.' , undefined)
//                 }else if(response.body.error.message === 'Parameter q is missing.'){
//                     callback('Parameter q is missing.' , undefined)
//                 }
//             }
//         else
//             callback(undefined , response.body.current.condition.text)
//         })
// }

// module.exports = weather


const request = require('request')

const weather = (location , callback) => {
    const url = 'http://api.weatherapi.com/v1/current.json?key=59d27a6771f4479f9d504617220706&q= '+ encodeURIComponent(location) +' &aqi=no'

    request({url , json : true} , (error , {body} ) => {
        if(error){
            callback('Some issue occue while connecting to server like internet etc' , undefined)
        }
        else if(body.error != null)
            {
                if(body.error.message === 'No matching location found.'){
                    callback('No matching location found.' , undefined)
                }else if(body.error.message === 'Parameter q is missing.'){
                    callback('Parameter q is missing.' , undefined)
                }
            }
        else
            callback(undefined , body.current.condition.text)
        })
}

module.exports = weather