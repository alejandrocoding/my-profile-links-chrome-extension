export class ClipboardHelper {
    public static copy(text: string) {
        const element = document.createElement('textarea');
        document.body.appendChild(element);
        element.value = text;
        element.select();
        document.execCommand('copy');
        document.body.removeChild(element);
    }
}
