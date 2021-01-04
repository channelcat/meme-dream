export interface BaseScannerArgs {
    id: string
}
class BaseScanner {
    id: string
    stopped: boolean = false

    constructor({ id }: BaseScannerArgs) {
        this.id = id
    }
}

export default BaseScanner
