export const EVENT_IDS = [
    'GAME_START',
    'GAME_FINISH',
    'GAREN_SPIN_START',
    'GAREN_SPIN_STOP',
    'PLAYER_ASSIST',
    'PLAYER_CREEP_SCORE',
    'PLAYER_DEATH',
    'PLAYER_KILL',
    'PLAYER_WARD_SCORE',
] as const

export type EventID = typeof EVENT_IDS[number]
