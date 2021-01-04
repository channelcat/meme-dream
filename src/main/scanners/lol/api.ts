import fetch from 'node-fetch'

export interface AllGameData {
    activePlayer: ActivePlayer
    allPlayers?: AllPlayersEntity[] | null
    events: Events
    gameData: GameData
}
export interface ActivePlayer {
    abilities: Abilities
    championStats: ChampionStats
    currentGold: number
    fullRunes: FullRunes
    level: number
    summonerName: string
}
export interface ChampionStats {
    abilityPower: number
    armor: number
    armorPenetrationFlat: number
    armorPenetrationPercent: number
    attackDamage: number
    attackRange: number
    attackSpeed: number
    bonusArmorPenetrationPercent: number
    bonusMagicPenetrationPercent: number
    cooldownReduction: number
    critChance: number
    critDamage: number
    currentHealth: number
    healthRegenRate: number
    lifeSteal: number
    magicLethality: number
    magicPenetrationFlat: number
    magicPenetrationPercent: number
    magicResist: number
    maxHealth: number
    moveSpeed: number
    physicalLethality: number
    resourceMax: number
    resourceRegenRate: number
    resourceType: string
    resourceValue: number
    spellVamp: number
    tenacity: number
}
export interface FullRunes {
    generalRunes?: GeneralRunesEntityOrKeystoneOrPrimaryRuneTreeOrSecondaryRuneTree[] | null
    keystone: GeneralRunesEntityOrKeystoneOrPrimaryRuneTreeOrSecondaryRuneTree
    primaryRuneTree: GeneralRunesEntityOrKeystoneOrPrimaryRuneTreeOrSecondaryRuneTree
    secondaryRuneTree: GeneralRunesEntityOrKeystoneOrPrimaryRuneTreeOrSecondaryRuneTree
    statRunes?: StatRunesEntity[] | null
}
export interface GeneralRunesEntityOrKeystoneOrPrimaryRuneTreeOrSecondaryRuneTree {
    displayName: string
    id: number
    rawDescription: string
    rawDisplayName: string
}
export interface StatRunesEntity {
    id: number
    rawDescription: string
}
export interface AllPlayersEntity {
    championName: string
    isBot: boolean
    isDead: boolean
    items?: ItemsEntity[] | null
    level: number
    position: string
    rawChampionName: string
    respawnTimer: number
    runes: Runes
    scores: Scores
    skinID: number
    summonerName: string
    summonerSpells: SummonerSpells
    team: string
}
export interface ItemsEntity {
    canUse: boolean
    consumable: boolean
    count: number
    displayName: string
    itemID: number
    price: number
    rawDescription: string
    rawDisplayName: string
    slot: number
}
export interface Runes {
    keystone: GeneralRunesEntityOrKeystoneOrPrimaryRuneTreeOrSecondaryRuneTree
    primaryRuneTree: GeneralRunesEntityOrKeystoneOrPrimaryRuneTreeOrSecondaryRuneTree
    secondaryRuneTree: GeneralRunesEntityOrKeystoneOrPrimaryRuneTreeOrSecondaryRuneTree
}
export interface Scores {
    assists: number
    creepScore: number
    deaths: number
    kills: number
    wardScore: number
}
export interface SummonerSpells {
    summonerSpellOne: SummonerSpellOneOrSummonerSpellTwo
    summonerSpellTwo: SummonerSpellOneOrSummonerSpellTwo
}
export interface SummonerSpellOneOrSummonerSpellTwo {
    displayName: string
    rawDescription: string
    rawDisplayName: string
}
export interface Events {
    Events?: EventsEntity[] | null
}
export interface EventsEntity {
    EventID: number
    EventName: string
    EventTime: number
    Assisters?: null[] | null
    KillerName?: string | null
    VictimName?: string | null
}
export interface GameData {
    gameMode: string
    gameTime: number
    mapName: string
    mapNumber: number
    mapTerrain: string
}

export interface Abilities {
    E: Ability
    Passive: BaseAbility
    Q: Ability
    R: Ability
    W: Ability
}
export interface Ability extends BaseAbility {
    abilityLevel: number
}
export interface BaseAbility {
    displayName: string
    id: string
    rawDescription: string
    rawDisplayName: string
}

export const baseURL = 'https://127.0.0.1:2999'

export async function getAllGameData(): Promise<AllGameData> {
    return await (await fetch(`${baseURL}/liveclientdata/allgamedata`)).json()
}

export async function getAbilities(): Promise<Abilities> {
    return await (await fetch(`${baseURL}/liveclientdata/activeplayerabilities`)).json()
}

export async function getActivePlayer(): Promise<ActivePlayer> {
    return await (await fetch(`${baseURL}/liveclientdata/activeplayer`)).json()
}

export async function getPlayerList(): Promise<AllPlayersEntity[]> {
    return await (await fetch(`${baseURL}/liveclientdata/playerlist`)).json()
}
