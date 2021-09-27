var input: HTMLTextAreaElement;
var openBtn: HTMLButtonElement;

document.addEventListener("DOMContentLoaded", function () {
    input = document.getElementById("input") as HTMLTextAreaElement;
    openBtn = document.getElementById("openBtn") as HTMLButtonElement;

    openBtn?.addEventListener("click", openBtnClickHandler);
    input.focus();
});

document.addEventListener('keydown', (event) => {
    if (!event.shiftKey && event.key == "Enter") {
        openTabs();
    }
}, false);

function openBtnClickHandler() {
    openTabs();
}

function getUrlsFromText(text: string): string[] {
    let urlCleanRegExp = /[^A-Za-z0-9\-._~:\/?#,@!$&'()*+\s;=%]+/gm;
    let urlRegExp = /(https?|ftp):\/\/(-\.)?([^\s/?\.#-]+\.?)+(\/[^\s]*)?$/gm;

    text = text.replace(urlCleanRegExp, "\n");

    let matched = text.match(urlRegExp);

    let result: string[] = [];
    if (matched !== null) {
        for (let i = 0; i < matched.length; i++) {
            let url = getUrlFromString(matched[i]);
            if (url !== null)
                result.push(url);
        }
    }

    return result;
}

function getUrlFromString(string: string): string | null {
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

function createTab(url: string, active: boolean = false) {
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