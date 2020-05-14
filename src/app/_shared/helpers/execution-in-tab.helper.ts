export class ExecutionInTab {

    public static run(code: string) {
        chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
            chrome.tabs.executeScript(
                tabs[0].id,
                { code }
            );
        });
    }
}
