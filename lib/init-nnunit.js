const { resolve } = require("path");
const fs = require("fs");
var fse = require("fs-extra");
const { exec } = require("child_process");
const scripts = require("./scripts");
const setDep = require("./setDep");
const inquirer = require("inquirer");
const chalk = require("chalk");

module.exports = (answer) => {
  const package_path = resolve("./package.json");
  const { type, isShowConfig, isShowDemo } = answer;
  // // 显示单元测试配置文件 —— 目前都生成jest.config.js
  if (true) {
    const filePath = resolve("./jest.config.js");
    const fromFileName = resolve(
      __dirname,
      `../template/${type}/jest.config.js`
    );
    fse.copy(fromFileName, filePath, (err) => {
      if (err) {
        console.error(err);
      } else {
        // console.log('copy file succes')
      }
    });
  }

  // 显示单元测试demo
  if (isShowDemo) {
    const dirPath = resolve("./__tests__/demo");
    const fromDir = resolve(__dirname, `../template/${type}/demo`);
    fse.emptyDirSync(dirPath);
    fse.copy(fromDir, dirPath, (err) => {
      if (err) {
        console.error(err);
      } else {
        // console.log('copy dir sucess')
      }
    });
  }
  // 修改package文件
  fs.readFile(package_path, (err, data) => {
    if (err) {
      console.log(err);
      return;
    }
    var json = data ? JSON.parse(data) : {};
    // 原生js第三方库添加
    if (type === "javascript") {
      json["devDependencies"] = {
        ...json["devDependencies"],
        ...setDep(type, ["jest"]),
      };
    }
    // vue框架
    if (type === "vue") {
      json["devDependencies"] = {
        ...json["devDependencies"],
        ...setDep(type, [
          "jest",
          "babel-jest",
          "jest-serializer-vue",
          "jest-transform-stub",
          "vue-jest",
          "@vue/cli-plugin-unit-jest",
          "@vue/cli-plugin-babel",
          "@vue/test-utils",
          "babel-core",
          "identity-obj-proxy",
        ]),
      };
      console.log(
        chalk.yellow(
          `如果单元测试执行报错，可在.babelrc文件添加以下内容：
            {
                "presets": [["@babel/preset-env", { "targets": { "node": "current" } }]]
            }`
        )
      );
    }
    // react框架
    if (type === "react") {
      json["devDependencies"] = {
        ...json["devDependencies"],
        ...setDep(type, [
          "jest",
          "babel-jest",
          "@babel/preset-env",
          "@babel/preset-react",
          "@testing-library/react",
          "@testing-library/user-event",
          "@testing-library/jest-dom",
          "identity-obj-proxy",
        ]),
      };

      const dirJestPath = resolve("./jest");
      const fromDir = resolve(__dirname, `../template/${type}/jest`);
      fse.emptyDirSync(dirJestPath);
      fse.copy(fromDir, dirJestPath, (err) => {
        if (err) {
          console.error(err);
        } else {
          // console.log('copy jest dir sucess')
        }
      });
      console.log(
        chalk.yellow(
          `如果单元测试执行报错，可在.babelrc文件添加以下内容：
          {
            "presets": ["@babel/preset-env", "@babel/preset-react"],
            "plugins": [
              [
                "@babel/plugin-transform-runtime",
          
                {
                  "regenerator": true
                }
              ],
              [
                "import",
                {
                  "libraryName": "antd",
                  "style": "css"
                }
              ]
            ]
          }`
        )
      );
    }

    if (json["scripts"]) {
      json["scripts"]["test:x-ut-cli"] = scripts["test"];
      json["scripts"]["coverage:x-ut-cli"] = scripts["coverage"];
    } else {
      json["scripts"] = {};
      json["scripts"]["test:x-ut-cli"] = scripts["test"];
      json["scripts"]["coverage:x-ut-cli"] = scripts["coverage"];
    }

    fs.writeFile(package_path, JSON.stringify(json, "", "\t"), (err) => {
      if (err) {
        console.log(err);
        return;
      }
      // 是否自动安装依赖
      inquirer
        .prompt([
          {
            type: "input",
            name: "isRun",
            message: "use yarn or npm to install it?",
            default: "yarn",
          },
        ])
        .then((answer) => {
          const { isRun } = answer;
          console.log(chalk.green("依赖初始化中......"));
          if (isRun === "yarn") {
            exec(`yarn`, (err) => {
              if (err) {
                console.log(chalk.red("依赖初始化出错"));
                process.exit(); //退出当前操作
              } else {
                console.log(chalk.green("依赖初始化完成"));
                process.exit(); //退出当前操作
              }
            });
          } else if (isRun === "npm") {
            exec(`npm install`, (err) => {
              if (err) {
                console.log(chalk.red("依赖初始化出错"));
                process.exit(); //退出当前操作
              } else {
                console.log(chalk.green("依赖初始化完成"));
                process.exit(); //退出当前操作
              }
            });
          } else {
            //
          }
        });
    });
  });
};
