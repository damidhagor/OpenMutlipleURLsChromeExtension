interface Message {
    topic: MessageTopics,
    payload: any | null
}

enum MessageTopics {
    UpdateTheme
}

enum Theme {
    LightMode,
    DarkMode
}

function isMessage(obj: any): obj is Message {
    return "topic" in obj
        && "payload" in obj;
}

function sendRuntimeMessage<Type>(message: Message): Promise<Type | null> {
    return new Promise((resolve, reject) => {
        chrome.runtime.sendMessage(message, response => {
            if (chrome.runtime.lastError) {
                console.error(`Error sending message to runtime: ${chrome.runtime.lastError.message}`);
            }

            response ? resolve(response) : reject();
        });
    });
}