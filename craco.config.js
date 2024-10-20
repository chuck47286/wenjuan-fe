module.exports = {
  devServer: {
    proxy: {
      '/api':'http://localhost:3001' // 访问api的路径，都会访问到'http://localhost:3001'的访问地址
    }
  }
}