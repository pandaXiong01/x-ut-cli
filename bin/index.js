#!/usr/bin/env node
"use strict";
const fs = require("fs");
const init = require("../commands/init");

//这里用到了我们在准备阶段安装的commander
const program = require("commander");
//获取package.json中的version来作为项目的版本号,也可以写死,也可以让用户输入
program.version(require("../package").version);
//定义脚手架的用法,在program.help方法中会显示
program.usage("<command>");
program
  .command("init") //command 命令的名称
  .description("初始化一个诺诺单元测试脚手架") //description 命令的描述
  .alias("i") // 命令的缩写
  .action(() => {
    // 判断是否存在 package 文件，否的话提示用户。
    fs.access("package.json", fs.constants.F_OK, (err) => {
      if (!err) {
        init();
      } else {
        console.log("No such a package.json, please check the project!");
      }
    });
    // console.log(`目前是${program.args[0]}正在进行第${program.args[1]}次初始化`) //action 命令的实际操作
  });
//program.parse(arguments)会处理参数,没有被使用的选项会被存放在program.args数组中
program.parse(process.argv);
// console.log('program.args:',program.args)
