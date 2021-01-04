import { promises as fs } from 'fs'
const _storage: Record<string, unknown> = {}

export async function load() {
    const settingsFile = await fs.readFile('./settings.json')
    // Clear Storage
    for (var k in _storage) delete _storage[k]
    // Load from file
    Object.entries(settingsFile.toJSON().data).map(([key, value]) => {
        _storage[key] = value
    })
}

export async function save() {
    await fs.writeFile('./settings.json', JSON.stringify(_storage), 'w+')
}

export function get<T>(key: string, fallback: T): T
export function get<T = undefined>(
    key: string,
    fallback: T | undefined = undefined
): T | undefined {
    return _storage.hasOwnProperty(key) ? (_storage[key] as T) : fallback
}

export async function set<T>(key: string, value: T): Promise<void> {
    _storage[key] = value
    await save()
}
