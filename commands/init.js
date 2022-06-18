const inquirer = require("inquirer");
const initNnunit = require("../lib/init-nnunit");

const promptList = [
  {
    type: "list",
    name: "type",
    message: "选择项目的单元测试配置",
    choices: [
      "javascript + jest",
      "vue + vue-test-utils",
      "react + react testing library",
    ],
    filter: function (val) {
      console.log("val:", val);
      // 使用filter将回答变为小写
      if (val.indexOf("javascript") > -1) {
        return "javascript";
      } else if (val.indexOf("vue") > -1) {
        return "vue";
      } else if (val.indexOf("testing library") > -1) {
        return "react";
      }
      return "";
    },
  },
  {
    type: "input",
    name: "isShowDemo",
    message: "是否需要初始化相关测试代码(Y or N)",
    default: "Y",
  },
];

module.exports = () => {
  inquirer.prompt(promptList).then((answer) => {
    initNnunit(answer);
  });
};
