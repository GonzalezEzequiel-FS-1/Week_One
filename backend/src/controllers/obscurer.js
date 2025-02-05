const obscurer = (req, res)=>{
    const number = req.body.sentNumber
    if(!number){
        console.log("Number not received")
        res.status(400).json({
            success:false,
            message:"No Number received"
        })
    }
    try {
        console.log(number)
        res.status(200).json({
            success:true,
            message:`Number received ${number}`
        })
    } catch (error) {
        console.log(error.message)
        res.status(500).json({
            success:false,
            error:error.message
        })
    }
}
module.exports = obscurer;