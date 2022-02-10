
const fs = require('fs')
const path = require('path')
const ejs = require('ejs')
module.exports=(params)=>{
  function copy(from, to) {
    fs.readdir(from, (err, paths) => {
      if (err) {
        throw err
      }
      paths.forEach((item) => {
        var _from = path.join(from, item)
        var _to = path.join(to, item)
        fs.stat(_from, function (err, st) {
          if (err) {
            throw err
          }
          if (st.isFile()) {
            fs.copyFileSync(_from, _to)
          }
          if (st.isDirectory()) {
            copyDir(_from, _to)
          }
        })
      })
    })
  }
  function createDir(to, from) {
    //不存在,就创建
    fs.mkdir(to, function () {
      var package = ejs.render(
        fs.readFileSync(path.join(__dirname, '../template/package.ejs'), {
          encoding: 'utf-8',
        }),
        { name: params }
      )
      fs.writeFileSync(path.join(__dirname, '../'+params+'/package.json'), package)
      copy(from, to)
    })
  }
  function copyDir(from, to) {
    fs.access(to, (err) => {
      if (err) {
        createDir(to, from)
      } else {
        fs.rmdir(to, function () {
          createDir(to, from)
        })
      }
    })
  }
  copyDir(
    path.join(__dirname, '../template'),
    path.join(__dirname, '../'+params)
  )
}