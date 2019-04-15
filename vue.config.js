const VuetifyLoaderPlugin = require('vuetify-loader/lib/plugin')
const webpack = require('webpack')
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

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

    configureWebpack: () => {
        return {
            plugins: [
                // new BundleAnalyzerPlugin(),
                new VuetifyLoaderPlugin(),
                new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/)
            ]
        }
    },

    chainWebpack: (config) => {
        config.plugins.delete('prefetch')
    }

}
