//参数全部传入后执行的函数
function fn(a,b,c,d,e){ 
  let res=a+b+c+d+e;
  console.log(res);
  return res;
}

//收集全部参数的柯里化函数
function currying(fn,...arr){
  let _arr=arr||[];
  if(_arr.length<fn.length){
    //继续收集参数
    return function inner(...arr){
      _arr=[..._arr,...arr];
      if(_arr.length<fn.length){
        return currying(fn,_arr);
      }else{
        return fn(..._arr);
      }

    }


  }else{
    //参数已够,执行并返回结果
    return fn(..._arr);

  }


}