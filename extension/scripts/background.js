var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
{
    importScripts("messages.js");
    chrome.runtime.onMessage.addListener((request, sender, sendResponse) => __awaiter(this, void 0, void 0, function* () {
        let result = false;
        const message = request;
        if (isMessage(message)) {
            const topic = message.topic;
            const payload = message.payload;
            if (topic === MessageTopics.UpdateTheme) {
                updateBrowserActionIcons(payload);
                result = true;
            }
        }
        sendResponse(result);
    }));
    function updateBrowserActionIcons(theme) {
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
