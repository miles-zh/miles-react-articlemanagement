/* 
    * @file config-overrides.js
    * 基于customize和react-app-rewired的定制化配置文件

*/

// 引入一些相关的防范，从customize-cra库中
const {override,addLessLoader,fixBabelImports,addDecoratorsLegacy} =require('customize-cra')

const modifyVars=require('./lessVars')
// console.log(modifyVars)

module.exports=override(
    addLessLoader({
        javascriptEnabled:true,
        modifyVars
    }),
    fixBabelImports('import', {
        libraryName: 'antd',
        libraryDirectory: 'es',
        style: true
    }),
    addDecoratorsLegacy()
)