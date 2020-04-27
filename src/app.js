const path = require("path")
const hbs = require("hbs")
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');
const express = require("express"); // module express

const app = express() // star express
const port = process.env.PORT || 3000

// Define path for Express config
const publicDirectoryPath= path.join(__dirname,"../public") // point to the folder
const viewPath = path.join(__dirname,"../template/views")
const partialPath = path.join(__dirname,"../template/partials")

// Setup handlebars engine and views location
app.set("view engine","hbs") // utilise le dossier view par default grace au module hbs
app.set("views", viewPath); // custom the directory views
hbs.registerPartials(partialPath) // utilise le dossier partials dans template


// Setup static directory to serve
app.use(express.static(publicDirectoryPath)); // configure the serveur and target the public directory

app.get('',(req,res)=>{
    res.render('index',{
        title:"Weather",
        name:"Imrane Abdoul"
    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title:"About"
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        title:"Help",
        name:"Imrane Abdoul"
    })
})


app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
            error:"You must to provide an address"
        })
    }

    geocode(req.query.address,(error,{latitude,longitude,location}={})=>{
        if(error){
          return res.send({error})
        }
          forecast(latitude,longitude, (error,{temperature,feelslike,location:locationWeather}) => {
            if(error){
              return res.send({error})
            }
            res.send({
                locationWeather,
                temperature,
                feelslike
            })
           // console.log(locationWeather);
            //console.log(temperature,feelslike);
          })
       }
    )
})


app.get("/product",(req,res)=>{
    if(!req.query.search){
        return res.send({
            error:"you must provide a search term"
        })
    }
    console.log(req.query.search)
    res.send({
        products:[]
    })
})

app.get("/help/*",(req,res)=>{
    res.render("notFound",{
        title:"Article Not found",
        errorMessage:"Help article Not found"

    })
})

app.get('*',(req,res)=>{
    res.render("notFound",{
        title:"Page Not Found",
        errorMessage:"Page Not found"
    })
})

app.listen(port,()=>{ // port listen
    console.log("Serveur is up on port "+port)
})


