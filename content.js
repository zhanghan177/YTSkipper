
//find all the image in answer feed,thumbnail and ad feeds and add blurclasses
var blurImage = function(){
}

//find all the image in answer feed,thumbnail and ad feeds and remove blurclasses
var unblurImage=function(){
}

var addListeners=function(){
    setInterval(function () {
      var selection = document.querySelector('.videoAdUiSkipButton,.ytp-ad-skip-button');
      if (selection) {
        selection.click();
      }
    }, 500);
}

var removeListeners=function(){
}

//message listener for background
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse)    {
    if(request.command === 'init'){
        addListeners();
    }else{
        removeListeners();
    }
    sendResponse({result: "success"});
});

//on init perform based on chrome stroage value
window.onload=function(){
    chrome.storage.sync.get('hide', function(data) {
        if(data.hide){
            addListeners();
        }else{
            removeListeners();
        }
    });
}
