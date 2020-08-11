var changeBlur = document.getElementById('changeBlur');

//on init update the UI checkbox based on storage
chrome.storage.sync.get('hide', function (data) {
    changeBlur.checked = data.hide;
});

changeBlur.onchange = function (element) {
    console.log("changeBlur button changed!");

    let value = this.checked;

    //update the extension storage value
    chrome.storage.sync.set({'hide': value}, function () {
        console.log('The value is ' + value);
    });

    //Pass init or remove message to content script
    if (value) {
        chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
            chrome.tabs.sendMessage(tabs[0].id, {command: "start", hide: value}, function (response) {
                console.log(response);
            });
        });
    } else {
        chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
            chrome.tabs.sendMessage(tabs[0].id, {command: "stop", hide: value}, function (response) {
                console.log(response);
            });
        });
    }
};

var adjustResponseTime = document.getElementById('responseTime');
//on init update the UI checkbox based on storage
chrome.storage.sync.get('storedResponseTime', function (data) {
    adjustResponseTime.value = data.storedResponseTime;
});

adjustResponseTime.onchange = function (element) {
    console.log("Adjusting response time to " + this.value);
    let newTime = this.value;
    chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {command: "adjust", responseTime: newTime}, function (response) {
            console.log(response);
        });
    });
};
