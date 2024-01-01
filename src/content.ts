{
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', async (e) => {
        try {
            const theme = e.matches ? Theme.DarkMode : Theme.LightMode;
            await sendRuntimeMessage({ topic: MessageTopics.UpdateTheme, payload: theme });
        } catch (error) {
            console.error(`Error sending update-theme: ${error}`);
        }
    });
}