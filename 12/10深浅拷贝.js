let obj={
  name:'rose',
  age:19,
  hobby:['!@','XX','00'],
  one:{
    second:[1,5,6]
  }
}

//方式一
function deepCopy(obj){
  const regExp=/^null|undefined|number|string|boolean$/;

  if(regExp.test(typeof obj)){
    return obj;
  }

  let newObj=obj.constructor();

  for(k in obj){
    newObj[k]=deepCopy(obj[k]);
  }

  return newObj;
}

//方式二
let newObj=JSON.parse(JSON.stringify(obj));
