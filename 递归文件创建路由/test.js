const fs = require('fs')
const path = require('path')
const ejs = require('ejs')
const arr = []
function recursionDir(dir) {
  const dirs = fs.readdirSync(dir)
  dirs.forEach(item => {
    const temp = path.join(dir, item)
    if (fs.statSync(temp).isFile()) {
      if (/^_\w+.vue/.test(item)) {
        arr.push(
          {
            path: temp.replace(/\\/g, '/'),
            component: () => import(temp.replace(/\\/g, '/')),
            name: temp.replace(/\\_?(.)/g, function(a, b) { return b.toUpperCase() })
          }
        )
      }
    }
    if (fs.statSync(temp).isDirectory()) {
      recursionDir(temp)
    }
  })
}
recursionDir('./src/views')
var code = ejs.render(fs.readFileSync('./template.ejs', { encoding: 'utf-8' }), { data: arr })
fs.writeFileSync('./test1.js', code)
console.log(code)
