export class StorageHelper {
    public static getStorageValueAsPromise() {
        return new Promise(resolve => {
            chrome.storage.sync.get('profile', (values) => {
                resolve(values);
            });
        });
    }

    public static setStorageValueAsPromise(value: string) {
        return new Promise(resolve => {
            chrome.storage.sync.set({ profile: value }, () => {
                resolve();
            });
        });
    }

    public static removeStorageValueAsPromise() {
        return new Promise(resolve => {
            chrome.storage.sync.remove('profile', () => {
                resolve();
            });
        });
    }
}
