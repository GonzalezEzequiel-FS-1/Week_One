
const creditCardNumber = ["1212121090999"]

const obfuscator = (number) => {
    const maskLength = number[0].length - 4;
    const mask = "○".repeat(maskLength)
    const cutNumber = number[0].slice(-4)
    if(number === undefined || number.length === 0){
       throw new Error("No Number Provided")
        return
    }

    if(!/^\d+$/.test(number[0])){
        throw new Error('Input must contain only numeric values')
       
    }
    if(number[0].length < 12 ||number[0].length > 16 || number[0] < 0){
        throw new Error("Invalid Credit Card")
        
    }
  
    try {
        const obfuscatedNumber = `${mask}${cutNumber}`
        console.log(obfuscatedNumber)
        return obfuscatedNumber
    } catch (error) {
        throw new Error(error)
    }



}

module.exports = obfuscator;
