//对原生ajax的一次封装

/* 
参数options格式:
method: 
  "GET","POST","DELETE","PUT","PATCH","HEAD","OPTION"
url: 
  "http/https请求地址"
headers:
  {
    'content-type':'application/x-www-form-urlencoded',---这是默认的格式
    'content-type':'application/json',
    'content-type':'multipart/form-data',
    
    
    'authorization':'token字符串'
    ...其他
  }
data:
  {
    "key1":"value1",
    "key2":"value2",
    ...根据content-type拼接字符串或者json格式
  }
async: true/false 是否同步,默认为false不同步
*/
function ajax(optionsCopy){
  var isMethod=/^GET|POST|DELETE|PUT|PATCH|HEAD|OPTION$/i;
  var isUrl=/^http(s)?/;
  
  var options={
    method:"GET",
    url: "",
    headers:{},
    data:{},
    async:false
  }
  var body='';
  var query='';
  var formData=new FormData();
  var response=null;//返回值
  /* 
  {
    code:
    前端错误码
    601: method或url参数格式错误,或未传参数
    602: headers参数格式错误
    603: data参数格式错误
    604: async参数格式错误

    
    message:


   
  } 
  */
  options={...options,...optionsCopy};

  //验证参数并补齐默认值
  if(!options.method||!isMethod.test(options.method)){
    return response={
      code:601,
      message: '参数错误'
    }
  }

  if(!options.url||!isUrl.test(options.url)){
    return response={
      code:601,
      message: '参数错误'
    }
  }

  if(!headers||Object.prototype.toString.call(headers)!=='[object Object]'){
    return response={
      code:602,
      message: 'headers参数错误'
    }

  }

  if(!headers['content-type']){
    headers['content-type']='application/x-www-form-urlencoded';
  }

  if(!data||Object.prototype.toString.call(data)!=='[object Object]'){
    return response={
      code:603,
      message: 'data参数错误'
    }

  }

  if(!async||typeof(async)!=="boolean"){
    return response={
      code:604,
      message: 'async参数错误'
    }

  }
  
  if(headers['content-type'].toLowerCase()=='application/x-www-form-urlencoded'){
    let keys=Object.keys(data);
    

    for(let i=0;i<keys.length;i++){
      query+=`${keys[i]}=${data[keys[i]]}`;
      if(i!==keys.length-1){
        query+=`&`;
      }
    }
    


  }

  if(headers['content-type'].toLowerCase()=='application/json'){
    body=JSON.stringify(data);

  }
  if(headers['content-type'].toLowerCase()=='multipart/form-data'){
    let keys=Object.keys(data);
    
    for(let i=0;i<keys.length;i++){
      formData.append(keys[i],data[keys[i]]);
    }
  }

  return new Promise(resolve=>{
    const xhr=new XMLHttpRequest();

    if(options.method.toUpperCase()==="GET"){
      xhr.open(options.method,options.url+`?`+query);
    }else{
      xhr.open(options.method,options.url);
    }

    for(let k in headers){
      xhr.setRequestHeader(k,headers[k]);
    }

    xhr.onload=()=>{
      let type = xhr.getResponseHeader('content-type');

      if(type.includes('json')) {
        response=JSON.parse(xhr.responseText);
      }else{
        response={
          code:0,
          message:"响应成功",
          info:xhr.responseText
        }
      }

      resolve(response);
    }

    if(headers['content-type'].toLowerCase()=='multipart/form-data'){
      xhr.send(fm);
    }else if(headers['content-type'].toLowerCase()=='application/json'){
      xhr.send(body);
    }else if(options.method.toUpperCase()!=="GET"&&query!==''&&headers['content-type'].toLowerCase()=='application/x-www-form-urlencoded'){
      xhr.send(query);
    }



  })

}


//导出ajax
//export default ajax;
//导入的语句: 
//import ajax form "/.js";


