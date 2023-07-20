//这里要考虑是否 标签的属性是否带单位
function move(ele,options,fn){
  //ele: 元素节点
  //options: 被改变的属性
  //fn: 当属性彻底修改完成之后,销毁函数之前,执行的回调函数
  count=0;
  for(let k in options){
    count++;
    if(k==='opacity'){
      options[k]=options[k]*100;

    }
    let time=setInterval(()=>{
      let start=null;
      if(k==='opacity'){
        start=window.getComputedStyle(ele)[k]*100;
      }else{
        start=parseInt(window.getComputedStyle(ele)[k]);
      }

      let moveDistance=(options[k]-start)/10;

      if(moveDistance>0){
        moveDistance=Math.ceil(moveDistance);
      }else{
        moveDistance=Math.floor(moveDistance);

      }

      if(start===options[k]){
        clearInterval(time);
        count--;
        fn&&fn();
        flag=true;
      }else{
        if(k==='opacity'){
          ele.style[k]=(start+moveDistance)/100;
        }else{
          ele.style[k]=start+moveDistance+'px';
        }
      }

    },20)
  }




}