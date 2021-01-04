import BaseScanner, { BaseScannerArgs } from './base'
import { sleep } from '../util'

export interface PollArgs extends BaseScannerArgs {
    pollRate: number
}

abstract class PollingScanner extends BaseScanner {
    pollRate: number

    constructor({ pollRate, ...settings }: PollArgs) {
        super(settings)

        this.pollRate = pollRate
        this.poll()
    }

    async poll() {
        const nextPollTime = +new Date() + this.pollRate

        try {
            await this.execute()
        } catch (e) {
            console.error('Poll executor error', e)
        }
        await sleep(nextPollTime - +new Date())

        if (this.stopped) return

        this.poll()
    }

    abstract execute(): Promise<void>
}

export default PollingScanner
