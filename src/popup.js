var input = null;
var output = null;
var openBtn = null;
var urls = null;

document.addEventListener("DOMContentLoaded", function () {
    input = document.getElementById("input");
    output = document.getElementById("output");
    openBtn = document.getElementById("openBtn");

    openBtn.addEventListener("click", openBtnClickHandler);
    input.addEventListener("input", inputInputHandler);
    input.focus();
});

function inputInputHandler() {
    urls = getUrlsFromText(input.value);

    if (urls === null)
        return;

    let out = "";
    for (i = 0; i < urls.length; i++)
        out += `\n${urls[i]}`

    output.innerHTML = out;
}

function openBtnClickHandler() {
    if (urls === null)
        return;

    urls.forEach(url => createTab(url));
	close();
}

function getUrlsFromText(text) {
    if (typeof text != "string")
        return null;

    let urlCleanRegExp = /[^A-Za-z0-9\-._~:\/?#,@!$&'()*+\s;=%]+/gm;
    let urlRegExp = /(https?|ftp):\/\/(-\.)?([^\s/?\.#-]+\.?)+(\/[^\s]*)?$/gm;

    text = text.replace(urlCleanRegExp, "\n");

    let matched = text.match(urlRegExp);

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