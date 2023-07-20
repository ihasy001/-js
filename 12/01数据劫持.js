/* 
Object.definedProperty(新对象,属性名,{
  配置项;
  value: 属性值
  writeable: 读写属性, 默认为false只读
  enumerable: 是否可以被遍历,默认false不能参与遍历
  getter: 获取器,返回属性的值
        注意:getter和value,writeable不能联用
  setter: 设置器,修改属性值


})

*/

const person={
  name:"rose",
  age:17
}

//进行数据劫持
const result={};
for(let k in person){
  Object.defineProperty(result,k,{
    get (){
      //如果返回的值和person[k]的值不一样,就会先更改person[k]的值,然后返回
      return person[k];
    },
    set (value){
      person[k]=value;
      //值发生改变时,需要做的事情
    }
  });
}


//劫持升级
/* 
  不再创建空对象对数据进行劫持
  直接在原对象上,对数据进行劫持
  Object.defineProperties(对象,{属性: { 配置项 }})
*/
for(let k in person){
  Object.defineProperties(person,{
    ['_'+k]:{
      value: person[k],
      writable: true, //可读写,不可被遍历
    },

    //开始劫持
    [k]:{
      get(){
        return this['_'+k]
      },
      set(val){
        this['_'+k]=val;
        //数据改变时做的操作
      }
    }
  })
}



/* 
  数据代理
  上述对于后期动态添加的新属性无法渲染

  代理可以解决这个问题

  语法: const 变量=new Proxy(劫持对象,{配置项});

  返回值: Proxy的实例对象,劫持的结果

*/

let res=new Proxy(person,{
  get(target,property){
    return target[property]
  },

  set(target,property,val){
    target[property]=val;
    //值被修改后的操作
    return true;
  } 

})