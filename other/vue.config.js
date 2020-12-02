module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? '/vxe-table/plugins/' : '/',
  outputDir: '../plugins',
  assetsDir: 'static',
  pages: {
    index: {
      entry: 'src/main.js',
      title: 'vxe-table 扩展支持'
    }
  }
}
