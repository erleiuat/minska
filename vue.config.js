const VuetifyLoaderPlugin = require('vuetify-loader/lib/plugin')
const webpack = require('webpack')

module.exports = {

    pwa: {
        name: 'Minska',
        themeColor: '#381d56',
        msTileColor: '#603cba',
        appleMobileWebAppCapable: 'yes',
        appleMobileWebAppStatusBarStyle: 'black',
        workboxOptions: {
            skipWaiting: true
        }
    },
    configureWebpack: {
        plugins: [
            new VuetifyLoaderPlugin(),
            new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/)
        ]
    }

}
