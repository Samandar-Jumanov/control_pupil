const Admin = require("../models/admin")

const authPage = async (permission)  =>{
    return async  (request , response , next ) => {
        const {adminId} = request.body 
        const admin = await Admin.findByPk(adminId)
        const role  = admin.role 
        if(permission === role ){
            next()
        }else {
            return response.status(401).json({
                message :'You have no acces'
            })
        }
    }
}


module.exports = {authPage}