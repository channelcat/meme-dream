import { get, set } from './storage'
import BaseScanner from './scanners/base'
import LoL from './scanners/lol'

type ScannerSettings = {
    id: string
    pollRate: number
}
type ScannerConfig = {
    scanners: Array<ScannerSettings>
}

const scannerIdToClass: Record<string, typeof BaseScanner> = {
    lol: LoL,
}

const scanners: Array<BaseScanner> = []
export function start() {
    const settings = get<ScannerConfig>('scanners', {
        scanners: [
            {
                id: 'lol',
                pollRate: 100,
            },
        ],
    })

    for (let scannerSettings of settings.scanners) {
        console.log(`SCALLER ${scannerSettings.id}`)
        const scannerClass = scannerIdToClass[scannerSettings.id]
        const scanner = new scannerClass(scannerSettings)
        scanners.push(scanner)
    }
}
