const jwt = require('jsonwebtoken');
const {TokenSchema} = require('../models/token-model');

class TokenService {
    generateTokens(payload) {
        const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {expiresIn: '10m'})
        const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {expiresIn: '12h'})
        return {
            accessToken,
            refreshToken
        }
    }

    validateAccessToken(token) {
        try {
            const userData = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
            return userData;
        } catch (e) {
            return null;
        }
    }

    validateRefreshToken(token) {
        try {
            const userData = jwt.verify(token, process.env.JWT_REFRESH_SECRET);
            return userData;
        } catch (e) {
            return null;
        }
    }

    async saveToken(id, refreshToken) {
        const tokenData = await TokenSchema.findByPk(id)
        if (tokenData) {
            tokenData.refreshToken = refreshToken;
            return tokenData.save();
        }
        const token = await TokenSchema.create({user: id, refreshToken})
        return token;
    }

    async removeToken(refreshToken) {
        const tokenData = await TokenSchema.destroy({where: {refreshToken} })
        return tokenData;
    }

    async findToken(refreshToken) {
        const tokenData = await TokenSchema.findOne({refreshToken})
        return tokenData;
    }
}

module.exports = new TokenService();
