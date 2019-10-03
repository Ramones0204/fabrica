module.exports = middlewares => {
    return(req,res,next) =>{
        if(req.user.admin){
            middlewares(req,res,next)
        } else{
            res.status(401).send('Usuário não e adminsitrador')
        }
    }
}