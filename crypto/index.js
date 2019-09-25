var crypto=require('crypto')

function encryptMyPass (password){
    let result=crypto.createHmac('sha256', 'jc10').update(password).digest('hex')
    return result
}

console.log(encryptMyPass('sansan33'));
