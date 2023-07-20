/* 
  懒加载
  异步导入模块,只有使用时,才会加载
  语法: import('文件路径');
  实质: 按照Promise语法封装


*/

let router={
  '/':'/first',//首页重定向到第一个模块
  '/first':()=>{return import('./first.js')},
  '/second':()=>{return import('./second.js')},
  '/third':()=>{return import('./third.js')},
  '/fourth':()=>{return import('./fourth.js')}


}

//导出总路由表
export default router;