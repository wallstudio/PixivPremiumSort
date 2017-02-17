(function () {
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
        isEnded = true;
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
          maxNo = star;
          maxNo = j;
        }  
      }
      list.appendChild(list.childNodes[maxNo]);
    }
  }
  //Main

  let isEnded = false;
  let counter = 2;
  //let urlBase = window.location.href.replace(/&p=[0-9]+/, '&p=');
  let urlBase = window.location.href + '&order=date_d&p=';
  let list = document.getElementsByClassName('_image-items') [0];
  getPage(urlBase + counter);
  
}());