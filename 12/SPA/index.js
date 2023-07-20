import router from './router/router.js';

hashChangeHandler();
window.onhashchange=hashChangeHandler;

async function hashChangeHandler(e){
  let hash=window.location.hash.slice(1)||"/";

  console.log(router[hash]);
  if(typeof(router[hash])!=="function"){
    return window.location.hash=router[hash];
  }
  let res=await router[hash]();

  res.default();



}









