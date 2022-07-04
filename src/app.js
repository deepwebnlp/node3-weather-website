const express = require('express')
const path = require('path')
const geocode = require('./utils/geo-code')
const weather = require('./utils/fetch-weather')



// to use handlebars partials first we need to add hbs.
const hbs = require('hbs')

// now the main purpose is to load directory content / file in express server 
// for this node provide us 2 variable
// console.log(__dirname) // show path of directory where file is stored that is running (user/apple/node-course/web-server/src)
// console.log(__filename) // show path of file we currently running (user/apple/node-course/web-server/src/app.js)

// console.log(path.join(__dirname , '../public')) // return us final path and we pass individual pieces of path and it does join the stirng /
// when we pass single path to path .jsin it return only single path bcz it join with nothing

//__dirname and __ filename came from wrapper function like wwhen we debug node app we see our code is wrapped into some 
// wrapper funcgtion that funcgtion provide us varius things like require we use in our app ,,, __filenaem and __dirname came also from this wrapper funciton 
// there is core node module path that provides us many facilities to work with paths.


//It is a single function that create express application. Top level finction provide by express library.
const app = express() // app is now a way to customize your server

const publicDirPath = path.join(__dirname , '../public')

// by doing this it load the file in that directory which is index.html (use as root of our app) and show/load its content to server
app.use(express.static(publicDirPath)) // express .static is a funciton and we use its return value in app.use // static take path to folder that we want to serve / load in express server
// so when we use this to load default / root file which shows file content we donot use 
//app.get('' , (req , res) => { which also use as root handler and its never going to run so we remove it
// express is work until it matchs a route for your request // in case of express.static its also find a match which is index.html 

//expres.static load static dir content that we use in web app
//express.static is also work as same as app.get but it use to load directory content to web app 
// work in same ways as if we define file with name about.html and in web we run localhost:3000/about.html it load about.html to web app
// file name use as route same in app.get.....
// if endpoint define in url localhost:3000 it loads index.html file
//localhost:3000/about.html loads html file
//localhost:3000/about trigget app.get about callback

// about.html load static file in browser that is alread loaded and handled like get request via express.static
// about is access via get request we already implemented.

// now we tell  express app what should it do
// e.g we have app.com domain.so when user visit here lets we have to show them home page
// we also have other pages which shows via different endpoints 
// app.com/help ..... app.com/about
// we have one domain app.com and this domain is run on single express server... we have setup multiple routes
// so to setup server to send response when user tries to get data at specific route. so fo this we user app.get.
//app.get()// this allow us to configure what server should do when user tries to get data at specific url may be we send html or we send json// takes 2 args first is route (partial url / endpoint 3nd args is function .. function is call when user visit this route )
// function also contain two args first is object that contain infomation about the incoming request to server // means user ne konsa data bheja jub ye req us ne hit ki.
// 2nd param is response what we send back to user... also provide some methods..

// app.get('' , (req , res) => {
//     res.send('<h1>Weather </h1>')// send something back to user/ requester. // sending html// wrinting hrml is response is handy task 
//     // so we create seperate html file and pass it to response
// })


// allows us to set  value for given express setting.
// kisi specific express setting ki vlaue set karna
// we have key and value..
// key is setting name ... and value is setting we set
// we set view engine of express handlebars... to see handle bars detail visit docs file

app.set('view engine','hbs')



// to load hbs files express look up in views folder so if we change name of views folder to templates program will fail
// so we change name from view to templates but program fails 
const pathViews = path.join(__dirname , '../templates/views')
// we define path views where hbs files are store but express look at views folder so to change path we use set function provided by express to change its setting configuration
app.set('views' , pathViews ) // we set custom directory for hbs views


// setting path for handle bars partials
const partialsPath = path.join(__dirname , '../templates/partials')
hbs.registerPartials(partialsPath) // registering handle bars partials path 


// app.get('/help' , (req , res) => {
//     res.send({// express detect we send an object it automatically stringify json and sent to user
//         name:'Awais' , 
//         age: 20
//     })// send something back to user/ requester. // to send json either we use object or array to send json
// })


app.get('' , (req , res) => {
    //allow to show view 
    //use to configure views and we already configured view engine hbs in express so with render we can render out handlebars templates
    // 'index'  name should match with the template we created in view folder
    // we should change name of our old index.html file and make new index.hbs file to load its content
    // so whenwe  call res.render express go to index.hbs view and convert it into html and return html 
    // first arg is name of file and 2nd arg is data that we want to access in that view. 
    res.render('index' , {
        title: "Weather App" , 
        name: "Me Awais"
    })
})


app.get('/about' , (req , res) => {
    res.render('about' , {
        title: 'About Me' , 
        name: 'Awais'
    })
})


app.get('/help' , (req , res) => {
    res.render('help' , {
        helpMessage: 'Help Me' ,
        title: 'Help Title' , 
        name: 'Me Awais'
     
    })
})



// app.get('/about' , (req , res) => {
//     res.send([{//sending json array
//         name: 'Data'
//     },{
//         name:'Data2'
//     }])// send something back to user/ requester.
// })

// app.get('/weather' , (req , res) => {
//     res.send('Weather Page')// send something back to user/ requester.
// })

app.get('/weather' , (req , res) => {
    if(!req.query.address){
        return res.send({
            error: 'Error Occue'
        })// send something back to user/ requester.
    }

    geocode('-71.058291' , '42.360253' , (error , {location})=> {
        // geocode('-71.058291' , '42.360253' , (error , LocationData)=> {
            // console.log(error)
            if(error){
                return res.send({
                    error: 'Error Occue'
                })// send something back to user/ requester.
            }
            // console.log(respnse)
            weather(location , (error , weatherData) => {
                if(error){
                    return res.send({
                        error: 'Error Occue'
                    })// send something back to user/ requester.
                }
                // console.log(location)
                // // console.log(error)
                // console.log(weatherData)

                res.send({
                        address: req.query.address,
                        location: location,
                        forecast: weatherData
                    })// send something back to user/ requester.
            })
        
            // weather('London' , (error , respnse) => {
            //     console.log(error)
            //     console.log(respnse)
            // })
        })

    // res.send({
    //     location: req.query.address,
    //     forecast: '50'
    // })// send something back to user/ requester.
})


app.get('/help/*' , (req,res) =>{
    res.render('error404' , {
        Data: 'Help Article Not Found' ,
        title: 'Help Title' , 
        name: 'Awais'
    })
})

app.get('/products' , (req , res) => {
    // if search query params is not given

    // we are trying to send response to two time
    if(!req.query.search){
        return res.send({
            'error': 'You must provide a search term'
        })
    }
    res.send(
        {
            'products' :[],
            'Query Params': req.query
        }
    )

})



// handling 404 page (when user search such a page that we didnot define any get request then we show general 404 page)
// this method should be define above app.listen..
// same approach like switch case in cpp.. we define cases and at last if not any case then default data would send or set.
// express also provide wild card character and we can use them in our urls and this(*) means match anything that has not matched so far
//  means hr wo url is ko hit kare ga ilawa un k jo hum ne define kar diye 
// why should we define this get request at last ... we need to know how express works in matching up request ..
// it start from starts of application so first it looks in puclic folder to match that request bcz we define app.use(express.static(publicpath))
// then it looks for root bcz we define app.get('') this route..
// up to so on then it comes to this wild card that says everytinh is a match and it calls this
app.get('*' , (req , res) =>{

    // res.send('My 404 Page')
    res.render('error404' , {
        Data: 'Error 404' ,
        title: 'Help Title' , 
        name: 'Awais'
    })

})





// to start server we use single method that only use one time in our app.
// job of server is to stay up and running unless we stop it.
// always listening and processing new upcoming project 
// we listen at localhost:port
app.listen(3000, () => {
    console.log('Server start at 3000')
})//it start the server and it listen to specific port. // we use 3000 common development port but 3000 is not default port
// when we visit webite we dont provide port bcz there are default ports  e.g for http based website we have port 80 
// we can also pass optional argument to listen which is callback which triggers when server is up and running 
// the process of starting a server isnot async process it happens instantly 

//// when we visit localhost:port it comes to our server then express server found the matching route and it process the request 
// and it process user request using handler and handler use res.send which send back response to user that made request 
// we have to restart our server for changes to take effect so we have to shut our server down and start again 
// so instead doing it again and again we use node-mon (allow us to restart server when we make changes and save it )
// if we donot setup endpoint and we access this endpoint browser shows cannot Get/endpoint name
