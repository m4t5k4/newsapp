export class ArticleViewModel {
    constructor(
        public title: string,
        public subTitle: string,
        public shortSummary: string,
        public body: string,
        public articleStatusID: number,
        public tagID: number
        ) {

    }
}
