const express = require("express");
const bodyParser  =require("body-parser")
const request = require("request");
const https = require("https");

const app = express();
app.use(bodyParser.urlencoded({extended:true}))

app.use(express.static("public"))


app.get("/", function(req,res){

    res.sendFile( __dirname + "/signup.html")
})

app.post("/",function(req,res){

      const firstname = req.body.first1
      const secondname = req.body.second2
      const Email = req.body.gmail

      const data = {
          members:[
              {
              email_address : Email,
              status : "subscribed",
              merge_fields : {

                FNAME : firstname,
                LNAME : secondname

              }
            }
          ]
      }

      const jsondata =  JSON.stringify(data);
      const url =" https://us7.api.mailchimp.com/3.0/lists/32dc68f99d"

      const options = {
          method : "post",
          auth : "rahul:3d36af8f63b41c5f4f1edeb9ec583e6d-us7"
      }

     const request = https.request(url,options, function(response){

         if(response.statusCode === 200){

            res.sendFile( __dirname  + "/success.html")
            

        
         }else{

            res.sendFile(__dirname +  "/failure.html" )
         }
           
             
      })

    


      app.post("/failure" , function(req,res)
      {
          res.redirect("/")
      })

    
})




app.listen(process.env.PORT || 3000,function(){
    console.log("server starting at the port 3000")
})

















