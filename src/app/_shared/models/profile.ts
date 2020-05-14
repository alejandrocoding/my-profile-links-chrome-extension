export class Profile {
    linkedIn: string;
    stackOverFlow: string;
    gitHub: string;
    web: string;
    isLinkedIn: boolean;
    isGitHub: boolean;
    isStackOverFlow: boolean;
    isWeb: boolean;

    constructor() {
        this.linkedIn = '';
        this.stackOverFlow = '';
        this.gitHub = '';
        this.web = '';
        this.isLinkedIn = true;
        this.isGitHub = true;
        this.isStackOverFlow = true;
        this.isWeb = true;
    }
}
