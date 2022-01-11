export class DNS {
    constructor(
        public id = "",
        public domain = "",
        public visited = 0,
        public subdomainCount = 0,
    ) {}
}