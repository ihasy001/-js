let origin=[1,4,[9,0,6,[7,21,78,5,[7,9,10.45,23]]],16,18,90];

//方式一
function splitArr(origin,arr){
  for(k of origin){
    if(Array.isArray(k)){
      splitArr(k,arr);
    }else{
      arr.push(k);
    }

  }
}


//方式二
let res=origin.toString().split(',').map(item=>Number(item));

//方式三
let newArr=origin.flat(Infinity);



