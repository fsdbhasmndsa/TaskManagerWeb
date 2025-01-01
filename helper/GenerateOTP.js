
const GenerateOTP = (length)=>
{
    let OTP = "";
    let count = 0;
    while(count < length)
    {
        const randomNumber = Math.floor(Math.random()*9)
        OTP+=randomNumber
        count++
    }

    return OTP
}

module.exports = GenerateOTP 