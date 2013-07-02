function onClickHandler(tab) {
    chrome.tabs.executeScript(null, {file:"visualEvent.js"});
}

chrome.browserAction.onClicked.addListener(onClickHandler);

chrome.contextMenus.onClicked.addListener(onClickHandler);

chrome.commands.onCommand.addListener(onClickHandler);

chrome.contextMenus.create({"title": "Visual Event"});
