
const fs = require('fs')
const path = require('path')
const ejs = require('ejs')
module.exports=(params)=>{
  //
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
            //如果是文件 直接复制过去
            fs.copyFileSync(_from, _to)
          }
          if (st.isDirectory()) {
            //如果是文件夹,就递归再走一遍逻辑,创建相应的文件夹
            copyDir(_from, _to)
          }
        })
      })
    })
  }
  function createDir(to, from) {
    fs.mkdir(to, function () {
      var package = ejs.render(
        fs.readFileSync(path.join(__dirname, '../template/package.ejs'), {
          encoding: 'utf-8',
        }),
        { name: params }
      )
      fs.writeFileSync(path.join(process.cwd(), params+'/package.json'), package)
      copy(from, to)
    })
  }
  function copyDir(from, to) {
    //判断文件是否有,有就删除再创建
    fs.access(to, (err) => {
      if (err) {
        //无
        createDir(to, from)
      } else {
        //有
        fs.rmdir(to, function () {
          createDir(to, from)
        })
      }
    })
  }
  copyDir(
    path.join(__dirname, '../template'),
    path.join(process.cwd(), params)
  )
}
