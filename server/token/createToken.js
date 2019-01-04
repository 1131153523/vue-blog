const jwt = require('jsonwebtoken')

module.exports = async user_id => {
    const token = await jwt.sign({
        user_id: user_id
    }, 'ffyyhh', {
        expiresIn: '3h'
    })
    return token
}