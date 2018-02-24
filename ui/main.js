console.log('Loaded!');

//changing the Text of my site
var img=document.getElementById("img");
var marginLeft=0;
function moveRight()
{
    marginLeft=marginLeft+1;
    img.style.marginLeft=marginLeft+'px';
}
img.onclick=function()
{
    var interval=setInterval(moveRight,50);
};
