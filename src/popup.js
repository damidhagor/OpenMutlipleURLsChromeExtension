var input = null;
var openBtn = null;

document.addEventListener("DOMContentLoaded", function () {
    input = document.getElementById("input");
    openBtn = document.getElementById("openBtn");

    openBtn.addEventListener("click", openBtnClickHandler);
    input.focus();
});

document.addEventListener('keydown', (event) => {
    console.log(event.altKey + " - " + event.key);

    if (!event.shiftKey && event.key == "Enter") {
        openTabs();
    }
}, false);

function openBtnClickHandler() {
    openTabs();
}

function getUrlsFromText(text) {
    if (typeof text != "string")
        return null;

    let urlCleanRegExp = /[^A-Za-z0-9\-._~:\/?#,@!$&'()*+\s;=%]+/gm;
    let urlRegExp = /(https?|ftp):\/\/(-\.)?([^\s/?\.#-]+\.?)+(\/[^\s]*)?$/gm;

    text = text.replace(urlCleanRegExp, "\n");

    let matched = text.match(urlRegExp);
    if (matched === null)
        return null;

    let result = [];
    for (i = 0; i < matched.length; i++) {
        let url = getUrlFromString(matched[i]);
        if (url !== null)
            result.push(url);
    }

    if (result.length == 0)
        result = null;

    return result;
}

function getUrlFromString(string) {
    try {
        let url = new URL(string);
        return url.href;
    } catch (e) {
        return null;
    }
}

function openTabs() {
    let urls = getUrlsFromText(input.value);
    if (urls === null)
        return;

    urls.forEach(url => createTab(url));
    close();
}

function createTab(url, active = false) {
    try {
        chrome.tabs.create({
            "url": url,
            "active": active
        });
    }
    catch (e) {
        alert(e);
    }
}