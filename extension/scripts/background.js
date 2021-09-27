chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (request.topic == "updateTheme") {
        updateBrowserActionIcons();
        sendResponse({ status: true });
    }
});
chrome.runtime.onInstalled.addListener(initialize);
chrome.runtime.onStartup.addListener(initialize);
function initialize() {
    updateBrowserActionIcons();
}
function updateBrowserActionIcons() {
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        console.log("Setting dark mode.");
        chrome.browserAction.setIcon({
            path: {
                "128": "images/dark/icon128.png",
                "48": "images/dark/icon48.png",
                "32": "images/dark/icon32.png",
                "16": "images/dark/icon16.png"
            }
        });
    }
    else {
        console.log("Setting light mode.");
        chrome.browserAction.setIcon({
            path: {
                "128": "images/icon128.png",
                "48": "images/icon48.png",
                "32": "images/icon32.png",
                "16": "images/icon16.png"
            }
        });
    }
}
