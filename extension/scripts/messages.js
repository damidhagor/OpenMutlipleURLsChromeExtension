var MessageTopics;
(function (MessageTopics) {
    MessageTopics[MessageTopics["UpdateTheme"] = 0] = "UpdateTheme";
})(MessageTopics || (MessageTopics = {}));
var Theme;
(function (Theme) {
    Theme[Theme["LightMode"] = 0] = "LightMode";
    Theme[Theme["DarkMode"] = 1] = "DarkMode";
})(Theme || (Theme = {}));
function isMessage(obj) {
    return "topic" in obj
        && "payload" in obj;
}
function sendRuntimeMessage(message) {
    return new Promise((resolve, reject) => {
        chrome.runtime.sendMessage(message, response => {
            if (chrome.runtime.lastError) {
                console.error(`Error sending message to runtime: ${chrome.runtime.lastError.message}`);
            }
            response ? resolve(response) : reject();
        });
    });
}
