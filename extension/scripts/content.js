window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
    chrome.runtime.sendMessage({ topic: "updateTheme" });
});
