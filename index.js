#!/usr/bin/env node
const question=require("./question")
const { program } = require('commander')
const chalk = require('chalk')
// question()
program.command('create [name]')
.description('项目名称')
.action((params) => {
  require('./command/create.js')(params)
})
program.parse(process.argv)