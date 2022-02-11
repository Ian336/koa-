const fs = require('fs').promises
const path = require('path')
//第一种异步方法
// function recursionDirs(from,to){
//     fs.access(to,err=>{
//       if(err){
//         fs.mkdirSync(to)
//         copyDir(to,from)
//       }else{
//         fs.rmdirSync(to)
//         fs.mkdirSync(to)
//         copyDir(to,from)
//       }
//     })
//     function copyDir(to,from){
//       const dirs=fs.readdirSync(from)
//      dirs.forEach(item=>{
//       const temp=path.join(to,item)
//       const temp1=path.join(from,item)
//       fs.stat(temp1,(err,st)=>{
//         if(st.isFile()){
//           fs.copyFileSync(temp1,temp)
//         }
//         if(st.isDirectory()){
//           recursionDirs(temp1,temp)
//         }
//       })
//      })
//     }
//   }
// recursionDirs('./template','./abc')
//第二种promise方法
async function recursionDirs(from, to) {
  try {
    await fs.access(to)
  } catch {
    // 有错误,说明文件不存在,创建后结束
    await fs.mkdir(to)
    await copyDir(from, to)
    return
  }
  // 没有错误,说明文件存在,直接移除再创建即可
  await fs.rmdir(to)
  await fs.mkdir(to)
  await copyDir(from, to)
}
async function copyDir(from, to) {
  const dirs = await fs.readdir(from)
  for (let item of dirs) {
    const _from = path.join(from, item)
    const _to = path.join(to, item)
    const isFile = (await fs.stat(_from)).isFile()
    if (isFile) {
      await fs.copyFile(_from, _to)
    } else {
      recursionDirs(_from, _to)
    }
  }
}
recursionDirs('./template', './abc')
