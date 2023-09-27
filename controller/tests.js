const {Users , Test} =  require('../models/relations')

const SolveTest = async (request , response , next ) =>{
    const {userId, testId , selectedAnswer } = request.body 

    try {
        const user = await Users.findByPk(userId)
        const userAllScores = await user.getScores()
        if(!user){
            return response.status(401).json({
                message :'Unauthorized'
            })
        }

        const test = await Test.findByPk(testId)
        if(!test){
            return response.json({
                message :'Test not found '
            })
        }
        let exactTest;
        for (let i = 0 ; i <=userAllScores.length -1 ; i++){
            
            if(userAllScores[i].testId === testId){
                console.log(userAllScores[i])
                exactTest = userAllScores[i]
            }
        }
        if(selectedAnswer !== test.trueAnswer){
          return;
        }else {
             exactTest.score++
             await exactTest.save()
        }
    } catch (error) {
        next(error)
        
    }
}


module.exports = SolveTest