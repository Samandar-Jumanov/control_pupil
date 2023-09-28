

const authPage = async (permissions)  =>{
    return (request , response , next ) =>{
        const {role} = request.body 
        if(permissions.includes(role)){
            next()
        }else {
            return response.status(401).json({
                message :'You have no acces'
            })
        }
    }
}


module.exports = {authPage}