const userContext = require("./userContext.middlware");

function auth(req,res,next){

    userContext(req,res,()=>{

        if(req.user){
            next();
        }else{
            return res.status(401).json({msg:"unauthorized accsess"});
        }
    

    });



}






module.exports  = auth;
 