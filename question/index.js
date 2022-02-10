const  inquirer =require('inquirer')
module.exports=()=>{
  inquirer.prompt([{
    type: 'input',
    message: '设置一个用户名:',
    name: 'name',
    default: "test_user" // 默认值
  },{
    type: "checkbox",
      message: "select middleware",
      name: "middleware",
      choices: [
        {
          name: "1",
        },
        {
          name: "2",
        },
        {
          name: "3",
        },
        {
          name: "4",
        },
      ],
   
  }]).then(answer=>{
    console.log(answer);
    
  })
}