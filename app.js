
const express= require("express")
var useragent = require('useragent')
var fs = require('fs')
const { fips } = require("crypto")

const app = express()

app.use(express.json())




/* GET users listing. */
// app.get('/', function(req, res, next) {
//     res.setHeader('content-Type', 'application/json')
//     var request = req.headers
//     console.log(typeof request["user-agent"])
//     res.send("value displayed successfully");
//   });



function middleware(req, res, next){
    var request = req.headers
    var requestagent = request["user-agent"]

    // console.log(requestAgent.toLowerCase())
    useragent.is(req.headers['user-agent']).firefox // true
    useragent.is(req.headers['user-agent']).safari // false
    var ua = useragent.is(req.headers['user-agent'])
    console.log(ua)
        var browser = findBrowser(ua)
        console.log(browser, typeof browser)

        if(browser !== "chrome"){
            return res.send("this browser is not allowed, please use chrome")
        }

     fs.readFile('data.json', (error, data)=>{
         if(error) throw error
         var parseData = JSON.parse(data)
         console.log(parseData)
        var findBrowser;
        for(let j =0; j<parseData.browsers.length; j++){
            if(parseData.browsers[j].browsername === browser){
                findBrowser =parseData.browsers[j]
                console.log(parseData.browsers[j])
            }
        }

        // var updateCount = findBrowser.count
        console.log(findBrowser)

        findBrowser = {
            ...findBrowser, userAgent: requestagent, count: findBrowser.count+1
        }

        for(let i=0; i<parseData.browsers.length; i++){
            if(parseData.browsers[i].browsername === findBrowser.browsername ){
                parseData.browsers[i] = findBrowser
            }
        }

        fs.writeFile('data.json', JSON.stringify(parseData, null, 2),(error)=>{
            if(error) throw error
            console.log("data write successfully")
        })

        //  console.log(JSON.parse(data))
        
     })


    // console.log(useragent)
    // console.log(requestAgent.toLowerCase().indexOf("firefox"))
    // console.log(requestAgent.toLowerCase().indexOf('chrome'))
    // console.log(requestAgent.toLowerCase().indexOf('safari'))
    next()
}
app.get('/',middleware, (req, res)=>{
    res.send('this is home route')
})



function findBr(ua){
    if(ua.chrome){
        return "chrome"
    }
    else if(ua.firefox){
        return "firefox"
    }
    else if(ua.ie){
        return "ie"
    }
   else if(ua.safari){
        return "safari"
    }
   else if(ua.opera){
        return "opera"
    }
   else if(ua.android){
        return "android"
    }
}

app.listen(4000)