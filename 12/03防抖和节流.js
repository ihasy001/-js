/* 
  防抖和节流的作用:
    降低触发频率
  
  节流: 在执行时间里,不接受新的事件

  防抖: 在一段时间里,只执行最后一次触发
*/
//防抖 核心代码
/*
let time=null;
btn.onclick=()=>{
  clearTimeout(time);

  time=setTimeout(()=>{
    console.log(123);
  },2000)
}
*/

/* 
节流核心代码:
let flag=true;
btn.onclick= e=>{
  if(flag){
    flag=false;
    setTimeout(()=>{
      console.log(112233);
      flag=true;
    },2000);
  }

}


*/
