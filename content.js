var responseTime = 100;
var shouldHide = false;
var executable = null;

var addListeners = function () {
    executable = setInterval(function () {
        var selection = document.querySelector('.videoAdUiSkipButton,.ytp-ad-skip-button');
        if (selection) {
            selection.click();
        }
    }, responseTime);
};

var removeListeners = function () {
    clearInterval(executable);
    executable = null;
};

//message listener for background
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (request.command === 'start') {
        addListeners();
        shouldHide = true;
    } else if (request.command === 'stop') {
        removeListeners();
        shouldHide = false;
    } else if (request.command === 'adjust') {
        updateResponseTime(request.responseTime);
    } else {
        sendResponse({result: 'failed', error: 'unknown command'});
        return;
    }
    sendResponse({result: "success"});
    persistentConfig();
});

function persistentConfig() {
    chrome.storage.sync.set({hide: shouldHide, storedResponseTime: responseTime}, function() {
    });
}

function updateResponseTime(newTime) {
    responseTime = newTime;
    if (executable != null) {
        removeListeners();
        addListeners();
    }
}

//on init perform based on chrome stroage value
window.onload = function () {
    chrome.storage.sync.get('hide', function (data) {
        shouldHide = data.hide;
        if (data.hide) {
            addListeners();
        } else {
            removeListeners();
        }
    });

    chrome.storage.sync.get('storedResponseTime', function (data) {
        updateResponseTime(data.storedResponseTime);
    });
};
