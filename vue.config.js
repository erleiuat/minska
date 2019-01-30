const VuetifyLoaderPlugin = require('vuetify-loader/lib/plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const webpack = require("webpack")

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
            new BundleAnalyzerPlugin(),
            new VuetifyLoaderPlugin(),
            new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/)
        ]
    }

}
