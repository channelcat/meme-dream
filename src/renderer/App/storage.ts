import { useState } from 'react'
import { get, set } from '../../main/storage'

const states: Record<string, [any, (value: any) => Promise<void>]> = {}

export function useStorage<T>(
    key: string,
    defaultValue: T
): [T, (value: T) => Promise<void>] {
    if (!states.hasOwnProperty(key)) {
        const test = useState<number>(12345)
        const [storageItem, setStorageItem] = useState(get(key, defaultValue))
        states[key] = [
            storageItem,
            async (value: T) => {
                await set(key, value)
                setStorageItem(value)
            },
        ]
    }
    return states[key]
}
