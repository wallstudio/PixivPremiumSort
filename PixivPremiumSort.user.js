// ==UserScript==
// @name        PixivPremiumSort
// @namespace   WallStudio
// @description Pixivの人気順ソートができないのが不便なので
// @include     http://www.pixiv.net/search.php?word=%E3%82%86%E3%81%8B%E3%83%9E%E3%82%AD&order=date_d
// @version     1
// @grant       none
// ==/UserScript==
window.addEventListener("load",function(){
  //Button
  let pixivPremiumSortButton = document.createElement("li");
  pixivPremiumSortButton.innerHTML= "<a>PixivPremiumSort</a>";
  pixivPremiumSortButton.setAttribute("id","pixivPremiumSortButton");
  //Massage
  let pixivPremiumSortLoad = document.createElement("li");
  pixivPremiumSortLoad.innerHTML= "<img src='https://wallstudio.github.io/PixivPremiumSort/icon_loader_b_ww_05_s1.gif'>読み込み中";
  pixivPremiumSortLoad.setAttribute("id","pixivPremiumSortLoad");
  pixivPremiumSortLoad.style.display = "none";
  //Button list
  let buttonList = document.getElementsByClassName("column-order-menu")[0].getElementsByClassName("menu-items")[0];
  buttonList.appendChild(pixivPremiumSortButton);
  buttonList.appendChild(pixivPremiumSortLoad);
  //Clicked proccese
  pixivPremiumSortButton.addEventListener("click",function () {
    //Display
    document.getElementById("pixivPremiumSortButton").style.display = "none";
    document.getElementById("pixivPremiumSortLoad").style.display = "";
    //Get all pages
    let getPage = function (url) {
      let xhr = new XMLHttpRequest();
      xhr.open('GET', url, true);
      xhr.responseType = 'document';
      xhr.onload = function (e) {
        let newItems = xhr.responseXML.getElementsByClassName('image-item');
        if (newItems.length > 0) {
          for (let i = 0; i < newItems.length; ) {
            //Appenf got items
            let child = list.appendChild(newItems[i]);
            child.style.backgroundColor = '#F0F0F6';
            let thum = child.getElementsByClassName('_thumbnail') [0];
            thum.setAttribute('src', thum.getAttribute('data-src'));
          }
          counter++;
          if(counter > 99){
            console.log("Too many");
            return;
          }
          getPage(urlBase + counter);
        }else {
          console.log(document.getElementsByClassName("image-item").length);
          setTimeout( illustSort, 1000);
        }
      }
      xhr.send(null);
    }
    let illustSort = function (){
      let list = document.getElementsByClassName("_image-items")[0];
      let end = list.childElementCount;
      for(let i=end-1; i>=0; i--){
        let max = 0;
        let maxNo = 0;
        for(let j=0;j<=i;j++){
          let star = parseInt(list.childNodes[j].getElementsByClassName("bookmark-count")[0]
                              .innerHTML.match(/[0-9]+$/)[0]);
          if(star > max){
            max = star;
            maxNo = j;
          }  
        }
        list.appendChild(list.childNodes[maxNo]);
        //Massage
        document.getElementById("pixivPremiumSortLoad").innerHTML = "完了";
      }
    }
    //Main
    let counter = 2;
    //let urlBase = window.location.href.replace(/&p=[0-9]+/, '&p=');
    let urlBase = window.location.href + '&order=date_d&p=';
    let list = document.getElementsByClassName('_image-items') [0];
    getPage(urlBase + counter);
    
  });
});