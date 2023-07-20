function getRandomColor(){
  let color="#";
  for(let i=0;i<3;i++){
    let randomNumber=Math.floor(Math.random()*256).toString(16);
    let a=randomNumber.length=2?randomNumber:"0"+randomNumber;
    color+=a;
  }
  return color;
}