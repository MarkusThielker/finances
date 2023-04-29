export enum ScopeType {
    ThisMonth = "This month",
    LastMonth = "Last month",
    ThisYear = "This year",
    LastYear = "Last year",
}

export class Scope {

    public type: ScopeType
    public start: Date
    public end: Date

    private constructor(type: ScopeType, start: Date, end: Date) {
        this.type = type
        this.start = start
        this.end = end
    }

    static of(type: ScopeType): Scope {

        let start: Date
        let end: Date

        const today = new Date()

        switch (type) {
            case ScopeType.ThisMonth:
                start = new Date(today.getFullYear(), today.getMonth(), 1, 2, 0, 0, 0)
                end = new Date(today.getFullYear(), today.getMonth() + 1, 0, 26, 0, 0, -1)
                break
            case ScopeType.LastMonth:
                start = new Date(today.getFullYear(), today.getMonth() - 1, 1, 1, 0, 0, 0)
                end = new Date(today.getFullYear(), today.getMonth(), 0, 26, 0, 0, -1)
                break
            case ScopeType.ThisYear:
                start = new Date(today.getFullYear(), 0, 1, 1, 0, 0, 0)
                end = new Date(today.getFullYear(), 11, 31, 25, 0, 0, -1)
                break
            case ScopeType.LastYear:
                start = new Date(today.getFullYear() - 1, 0, 1, 1, 0, 0, 0)
                end = new Date(today.getFullYear() - 1, 11, 31, 25, 0, 0, -1)
                break
        }

        return new Scope(type, start, end)
    }
}
