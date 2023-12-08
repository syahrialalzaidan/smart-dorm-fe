/** @type {import('next').NextConfig} */
// webpack
const webpack = require('webpack')

const { parsed: myEnv } = require('dotenv').config({
    path:'./.env',
})

const nextConfig = {
    webpack(config) {
        config.plugins.push(new webpack.EnvironmentPlugin(myEnv))
        return config
    }
}

module.exports = nextConfig
