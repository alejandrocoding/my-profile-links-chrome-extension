export class AsyncHelper {
    public static async delay(ms: number) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}
