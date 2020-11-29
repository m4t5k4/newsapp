export class Article {
    constructor(
        public articleID: number,
        public title: string,
        public subTitle: string,
        public shortSummary: string,
        public body: string,
        public tagID: number,
        public userID: number,
        public articleStatusID: number,
        public imageID: number
    ) {}
}