module.exports = {
  devServer: {
    disableHostCheck: true,
    historyApiFallback: true,
    port: 8000,
    noInfo: true,
    overlay: true
  },
  publicPath: "/",
  transpileDependencies: [
    'vuetify'
  ],
  
}
