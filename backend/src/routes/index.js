const express = require('express');
const router = express.Router();
const obscurer = require('../controllers/obscurer');

router.get("/test",(req, res)=>{
    try {
        res.status(200).json({
            success:true,
            message:'Server Working'
        })
    } catch (error) {
        res.status(500).json({
            success:false,
            message:error.message
        })
    }
})

router.post('/obscurer', obscurer)

module.exports = router;

