import { ICoin } from "./Coin";

type IPlayer = {
    address: String,
    name: String,
    color: String,
    nextTurn?: String,
    enabled?: Boolean,
    hasWon?: Boolean,
    spawnable?: Boolean,
    isLeave?: Boolean,
    life?: Number,
    coinIDs?: String[],
    COIN_1?: ICoin,
    COIN_2?: ICoin,
    COIN_3?: ICoin,
    COIN_4?: ICoin,
}

export { IPlayer }