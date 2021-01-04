import PollingScanner from '../poll'
import { getActivePlayer, getPlayerList, Scores } from './api'
import { EventID } from './events'

type StartStopAbility = {
    key: 'E' | 'Q' | 'R' | 'W'
    offId: string
    onId: string
    eventName: string
}
const startStopAbilities: Array<StartStopAbility> = [
    {
        key: 'E',
        offId: 'GarenE',
        onId: 'GarenECancel',
        eventName: 'GAREN_SPIN',
    },
]
const scoresToEvents: Record<keyof Scores, EventID> = {
    assists: 'PLAYER_ASSIST',
    creepScore: 'PLAYER_CREEP_SCORE',
    deaths: 'PLAYER_DEATH',
    kills: 'PLAYER_KILL',
    wardScore: 'PLAYER_WARD_SCORE',
}

class LoL extends PollingScanner {
    hasGame: boolean = false
    abilityStatus: Record<string, boolean> = {}
    scores: Record<string, number> = {}

    async execute() {
        const events: Array<EventID> = []

        try {
            const [players, activePlayer] = await Promise.all([getPlayerList(), getActivePlayer()])
            const currentPlayer = players.find((player) => player.summonerName === activePlayer.summonerName)

            // Game start?
            if (!this.hasGame) {
                this.hasGame = true
                this.abilityStatus = {}
                this.scores = {}

                events.push('GAME_START')
            }

            // Go through abilities that have start/stop states
            for (let startStopAbility of startStopAbilities) {
                const ability = activePlayer.abilities[startStopAbility.key]
                // Ability = ON
                if (ability.id === startStopAbility.onId) {
                    if (this.abilityStatus[startStopAbility.key] === false) {
                        events.push(`${startStopAbility.eventName}_START` as EventID)
                    }
                    this.abilityStatus[startStopAbility.key] = true
                }
                // Ability = OFF
                if (ability.id === startStopAbility.offId) {
                    if (this.abilityStatus[startStopAbility.key] === true) {
                        events.push(`${startStopAbility.eventName}_STOP` as EventID)
                    }
                    this.abilityStatus[startStopAbility.key] = false
                }
            }

            // Scores (CS/Kills/Deaths)
            if (currentPlayer) {
                Object.entries(scoresToEvents).forEach(([_scoreType, eventId]) => {
                    const scoreType = _scoreType as keyof Scores
                    if (this.scores[scoreType] != currentPlayer.scores[scoreType]) {
                        if (this.scores[scoreType] !== undefined) {
                            // TODO: push score info
                            events.push(eventId)
                        }
                        this.scores[scoreType] = currentPlayer.scores[scoreType]
                    }
                })
            }

            //console.log('RESULTS', abilities)
            for (let event of events) {
                console.log('EVENT', event)
            }
        } catch (e) {
            // API down
            if (e && e.type === 'system' && e.code === 'ECONNREFUSED') {
                // Game end?
                if (this.hasGame) {
                    this.hasGame = false
                    events.push('GAME_FINISH')
                }
            } else {
                console.error("IT'S FUCKED", e)
            }
        }
    }
}

export default LoL
