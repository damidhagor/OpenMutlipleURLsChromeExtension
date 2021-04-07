window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', ({ event }) => {
    chrome.runtime.sendMessage({ topic: "updateTheme" });
});