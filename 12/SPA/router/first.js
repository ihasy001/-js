/* 
  正规组件化开发有html+css+js

*/

let template='<div>first</div>';

const routerView=document.querySelector('.router-view');

function render(){
  routerView.innerHTML=template;
}

export default render;


