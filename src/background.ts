{
    importScripts("messages.js")

    chrome.runtime.onMessage.addListener(async (request, sender, sendResponse) => {
        let result: any = false;

        const message: Message = request;
        if (isMessage(message)) {
            const topic = message.topic;
            const payload = message.payload;

            if (topic === MessageTopics.UpdateTheme) {
                updateBrowserActionIcons(payload);
                result = true;
            }
        }

        sendResponse(result);
    });

    function updateBrowserActionIcons(theme: Theme) {
        if (theme === Theme.DarkMode) {
            console.log("Setting dark mode.");
            chrome.action.setIcon({
                path: {
                    "128": "/images/dark/icon128.png",
                    "48": "/images/dark/icon48.png",
                    "32": "/images/dark/icon32.png",
                    "16": "/images/dark/icon16.png"
                }
            });
        }
        else if (theme === Theme.LightMode) {
            console.log("Setting light mode.");
            chrome.action.setIcon({
                path: {
                    "128": "/images/icon128.png",
                    "48": "/images/icon48.png",
                    "32": "/images/icon32.png",
                    "16": "/images/icon16.png"
                }
            });
        }
    }
}