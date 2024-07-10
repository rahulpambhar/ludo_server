import EventEmitter from "events";
import { BaseID, CellType, IBase, ICell, IState, WalkwayPosition, IReverseCoin, IReverseCells } from "../Types/Ludo";
import { Rolls } from "../Types/Dice";
import { Room } from "../Models/Room";
import { Server } from "socket.io";
import { MersenneTwister19937, integer } from "random-js";

export const WINNING_MOVES = 56;

export default class STRoom extends EventEmitter {

    state: IState;
    io: Server;
    isDieRollAllowed: boolean = false;
    isTimerStarted: boolean | undefined = false;
    timer: any;
    timeLeft: number = 30;
    lastMove: any;
    roll: Rolls | undefined;
    markBase: boolean = false;
    activeBase: BaseID[] = [];
    sixDieRollCount: number = 0
    reverseCells: IReverseCells = { cells: {}, };
    reverseCoins: IReverseCoin = { coins: {}, };

    constructor(_initialState: IState, _io: Server,) {
        super();
        this.state = _initialState;
        this.io = _io;
    }

    delay(ms: number) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    getRandomInt = (max: any) => {
        return Math.floor(Math.random() * max);
    }

    private startTimer(baseID: BaseID) {
        this.timeLeft = 30;
        this.isTimerStarted = true;
        this.timer = setInterval(async () => {
            this.timeLeft--;
            if (this.timeLeft < 0) {
                if (this.isTimerStarted) {
                    if (this.roll && !this.isDieRollAllowed) {
                        this.isTimerStarted = await this.rollDie(this.roll, this.timeLeft);
                    } else {
                        const room_code = this.state.roomCode;
                        let angleX = 0,
                            angleY = 0,
                            result = 1,
                            delay = 0

                        const xTurn = 4 + this.getRandomInt(8);
                        const yTurn = 4 + this.getRandomInt(8);
                        delay = Math.max(xTurn, yTurn) * 50;
                        let newX = angleX + 90 * xTurn;
                        let newY = angleY + 90 * yTurn;

                        // Balancing the results
                        if (newX % 180) {
                            if (this.getRandomInt(3) > 1) {
                                newX += 90;
                            }
                        }

                        let x = newX % 360;
                        let y = newY % 360;

                        if (x === 0 || x === 180) {
                            switch ((x + y) % 360) {
                                case 0: result = 1; break;
                                case 90: result = 5; break;
                                case 180: result = 6; break;
                                case 270: result = 2; break;
                                default: console.error(123456);
                            }
                        } else if (x === 90) {
                            result = 4;
                        } else if (x === 270) {
                            result = 3;
                        }

                        this.io.to(room_code).emit('dieRoll', { angleX: newX, angleY: newY, delay, dieRoll: result, myBase: baseID })

                        this.delay(delay);
                        this.updateLife(baseID);
                        this.rollDie(result);
                        // if (result !== 6) {
                        //     this.enableDie(this.state.currentTurn)
                        // }
                        if (result === Rolls.SIX) {
                            this.isTimerStarted = true;
                        }
                    }
                }
            }
        }, 1000);
    }

    enableDie(nextTurn: BaseID) {
        this.io.to(this.state.roomCode).emit('enableDie', nextTurn);
        this.isDieRollAllowed = true;
        this.roll = undefined;
        this.isTimerStarted = true;
        clearInterval(this.timer);
        this.startTimer(nextTurn);
    }

    async rollDie(roll: Rolls, timeLeft = 30) {
        this.isDieRollAllowed = false;
        const movableCoins = this.getMovableCoins(roll);

        const currentTurn = this.state.currentTurn;
        const bases = this.state.bases;
        const coins = this.state.coins;
        const cells = this.state.cells;
        const walkways = this.state.walkways;
        const currentTurnBase = bases[currentTurn];
        const spawnedCoinIDs = currentTurnBase.coinIDs.filter((coinID) => coins[coinID].isSpawned && !coins[coinID].isRetired);
        const spawnableCoins = bases[currentTurn].coinIDs.filter((coinID) => !coins[coinID].isSpawned && !coins[coinID].isRetired);
        this.roll = roll;


        if (roll === Rolls.SIX && (spawnableCoins.length > 0 || movableCoins.length > 0)) {

            this.sixDieRollCount += 1

            if (this.sixDieRollCount >= 3) {
                this.sixDieRollCount = 0
                this.io.to(this.state.roomCode).emit('sixDieRollCount_treeTime', { reverseCells: this.reverseCells, reverseCoins: this.reverseCoins });
                this.reverseState(this.reverseCells, this.reverseCoins)
                this.reverseCells = {} as any
                this.reverseCoins = {} as unknown as IReverseCoin
                await this.nextTurn();
            } else {
                if (this.sixDieRollCount === 1) {
                    this.reverseCells = this.state.cells as any
                    this.reverseCoins = this.state.coins as unknown as IReverseCoin
                }

                if ((spawnedCoinIDs.length === 0 || movableCoins.length === 0) && spawnableCoins.length > 0) {
                    const walkway = Object.values(walkways).find((walkway) => walkway.baseID === currentTurnBase.ID)!;
                    const walkwayCells = cells[walkway.position];
                    const spawnCellForCoin = Object.values(walkwayCells).find((cell) => cell.cellType === CellType.SPAWN)!;
                    const coinIDToSpawn = currentTurnBase.coinIDs.find((ID) => ID === spawnableCoins[0])!;
                    this.spawnCoin(spawnCellForCoin.cellID, coinIDToSpawn, walkway.position);
                    return true;
                } else {
                    if (movableCoins.length === 1 && spawnableCoins.length === 0) {
                        const coinID = movableCoins[0];
                        const coin = coins[coinID];
                        this.moveCoin(coinID, coin.cellID, coin.position, roll, this.state.roomCode);
                        return false;
                    } else {
                        if (timeLeft < 0) {
                            this.updateLife(currentTurn);
                            this.moveCoin(this.lastMove[currentTurn].coinId, this.lastMove[currentTurn].cellId, this.lastMove[currentTurn].position, roll, this.state.roomCode);
                            return true;
                        } else {
                            this.markBase = true;
                            this.markCurrentBase(true);
                            return true;
                        }
                    }
                }
            }

        } else if (spawnedCoinIDs.length > 0) {
            this.sixDieRollCount = 0
            this.reverseCells = {} as any
            this.reverseCoins = {} as unknown as IReverseCoin
            // auto move if only one coin is spawned
            if (spawnedCoinIDs.length === 1) {
                const coinID = spawnedCoinIDs[0];
                const coin = coins[coinID];
                this.moveCoin(coinID, coin.cellID, coin.position, roll, this.state.roomCode);
                return false;
            } else if (movableCoins.length === 1) {
                const coinID = movableCoins[0];
                const coin = coins[coinID];
                this.moveCoin(coinID, coin.cellID, coin.position, roll, this.state.roomCode);
                return false;
            } else if (movableCoins.length === 0 && spawnableCoins.length === 0) {
                await this.nextTurn();
                return false;
            }
            if (timeLeft < 0) {
                this.updateLife(currentTurn);
                this.moveCoin(this.lastMove[currentTurn].coinId, this.lastMove[currentTurn].cellId, this.lastMove[currentTurn].position, roll, this.state.roomCode);
            }
            return false;
        } else {
            this.sixDieRollCount = 0
            this.reverseCells = {} as any
            this.reverseCoins = {} as unknown as IReverseCoin
            await this.nextTurn();
            return false;
        }
    }

    reverseState(cells: any, coins: any,) {
        this.state = {
            ...this.state,
            cells,
            coins
        }
        return this.state

    }

    async nextTurn() {
        const currentTurnBase = this.state.currentTurn
        const bases = this.state.bases;
        let nextTurn = bases[currentTurnBase].nextTurn;
        let nextBaseID = currentTurnBase;

        for (const key in bases) {
            if (bases[key]) {
                nextBaseID = bases[nextBaseID].nextTurn;
                const nextBase = bases[nextBaseID];

                if (nextBase.enabled && !nextBase.hasWon && nextBase.life > 0) {
                    // if (!nextBase.enabled && !nextBase.hasWon && nextBase.isLeave) {
                    nextTurn = nextBaseID;
                    break;
                }
            }
        }
        this.io.to(this.state.roomCode).emit('nextTurn', nextTurn)
        await Room.updateOne({ roomCode: this.state.roomCode }, {
            $set: {
                currentTurn: nextTurn
            }
        });
        this.passTurnTo(nextTurn);
        this.enableDie(nextTurn);
    }

    passTurnTo(baseID: any) {

        this.state = {
            ...this.state,
            currentTurn: baseID,
        }

        return this.state;
    }

    spawnCoin(cellID: any, coinID: any, position: any) {

        this.state = {
            ...this.state,
            cells: {
                ...this.state.cells,
                [position]: {
                    ...this.state.cells[position],
                    [cellID]: {
                        ...this.state.cells[position][cellID],
                        coinIDs: [
                            ...this.state.cells[position][cellID].coinIDs,
                            coinID,
                        ],
                    },
                },
            },
            coins: {
                ...this.state.coins,
                [coinID]: {
                    ...this.state.coins[coinID],
                    cellID,
                    isSpawned: true,
                    position,
                },
            },
        }

        this.lastMove = { ...this.lastMove, [this.state.currentTurn]: { coinId: coinID, cellId: cellID, position: position } }
        this.isDieRollAllowed = true;
        const coins = this.state.coins;
        const { baseID } = coins[coinID];
        this.io.emit('spawnCoin', { cellID, coinID, position })
        if (this.markBase) {
            this.markBase = false;
            this.markCurrentBase(false);
        }
        this.enableDie(baseID);
        return this.state;
    }

    async moveCoin(coinID: any, cellID: any, walkwayPosition: any, stepsToTake: Rolls, room_code: string) {

        const movableCoins = this.getMovableCoins(stepsToTake);
        const isCurrentMovePossible: boolean = this.isCurrentMoveValid(coinID, stepsToTake);

        if (movableCoins.length === 0) {
            await this.nextTurn();
            return false;
        } else if (!isCurrentMovePossible) {
            return false;
        }

        let bonusChanceForHomeCoin = false;
        this.io.to(room_code).emit('moveCoin', { coinID, cellID, position: walkwayPosition, currentDieRoll: stepsToTake });
        for (let i = 0; i < stepsToTake; i++) {
            const coins = this.state.coins;
            const cells = this.state.cells;
            const links = this.state.links;
            const nextCells = links?.[cellID];
            let nextCell;

            if (nextCells) {
                // Possibility of entering HOMEPATH
                nextCell = nextCells.length > 1
                    ? nextCells.find(
                        (cell) =>
                            cells[cell.position][cell.cellID].cellType === CellType.HOMEPATH
                            && coins[coinID].baseID === cells[cell.position][cell.cellID].baseID,
                    ) || nextCells[0]
                    : nextCells[0];

                this.liftCoin(cellID, coinID, walkwayPosition);
                if (nextCell.cellID === 'HOME') {
                    this.homeCoin(coinID, room_code);
                    bonusChanceForHomeCoin = true;
                } else {
                    this.placeCoin(nextCell.cellID, coinID, nextCell.position);
                }
                cellID = nextCell.cellID;
                walkwayPosition = nextCell.position;
            }
        }

        const bonusChance = bonusChanceForHomeCoin
            || this.performDisqualificationCheck(coinID, walkwayPosition, cellID)
            || (stepsToTake === Rolls.SIX);

        this.lastMove = { ...this.lastMove, [this.state.currentTurn]: { coinId: coinID, cellId: cellID, position: walkwayPosition } }
        this.moveCoinSuccess(stepsToTake, coinID);

        if (!bonusChance) {
            await this.nextTurn();
            return false;
        } else {
            const coins = this.state.coins;
            const { baseID } = coins[coinID];
            this.enableDie(baseID);
            return false;
        }
    }

    private liftCoin(cellID: any, coinID: any, walkwayPosition: any) {

        const coinIDsInCell = [...this.state.cells[walkwayPosition][cellID].coinIDs];
        const index = coinIDsInCell.findIndex((coinIDInCell) => coinIDInCell === coinID);
        coinIDsInCell.splice(index, 1);

        this.state = {
            ...this.state,
            cells: {
                ...this.state.cells,
                [walkwayPosition]: {
                    ...this.state.cells[walkwayPosition],
                    [cellID]: {
                        ...this.state.cells[walkwayPosition][cellID],
                        coinIDs: coinIDsInCell,
                    },
                },
            },
        }
        return this.state;
    }

    private placeCoin(cellID: any, coinID: any, walkwayPosition: any) {

        this.state = {
            ...this.state,
            cells: {
                ...this.state.cells,
                [walkwayPosition]: {
                    ...this.state.cells[walkwayPosition],
                    [cellID]: {
                        ...this.state.cells[walkwayPosition][cellID],
                        coinIDs: [
                            ...this.state.cells[walkwayPosition][cellID].coinIDs,
                            coinID,
                        ],
                    },
                },
            },
            coins: {
                ...this.state.coins,
                [coinID]: {
                    ...this.state.coins[coinID],
                    cellID,
                    position: walkwayPosition,
                },
            },
        }
        return this.state;
    }

    async homeCoin(coinID: any, room_code: string) {

        this.state = {
            ...this.state,
            coins: {
                ...this.state.coins,
                [coinID]: {
                    ...this.state.coins[coinID],
                    isRetired: true,
                    steps: WINNING_MOVES,
                },
            },
        };

        const coins = this.state.coins;
        const bases = this.state.bases;
        const { baseID } = coins[coinID];
        const base = bases[baseID];
        const retiredCoins = base.coinIDs.filter((coinID) => coins[coinID].isRetired);

        const hasWon = retiredCoins.length === base.coinIDs.length;
        if (hasWon) {
            this.markWinner(baseID);

            const winnerInfo = {
                name: base.name,
                address: base.address,
                baseID: base.ID,
            }


            if (this.activeBase.length === 2) {
                await Room.updateOne({ roomCode: this.state.roomCode }, {
                    $set: {
                        isClosed: true,
                        winnersList: [winnerInfo]
                    }
                })
                this.emit('closeRoom', { winnerInfo: [winnerInfo], room_code });
            } else if (this.activeBase.length === 3) {
                const roomInfo = await Room.findOne({ roomCode: room_code }).exec();
                if (roomInfo) {
                    const winnersList = roomInfo.winnersList;
                    winnersList.push(winnerInfo);
                    if (winnersList.length === 2) {
                        await Room.updateOne({ roomCode: this.state.roomCode }, {
                            $set: {
                                isClosed: true,
                                winnersList: winnersList
                            }
                        })
                        this.emit('closeRoom', { winnerInfo: roomInfo.winnersList, room_code });
                    } else {
                        await Room.updateOne({ roomCode: this.state.roomCode }, {
                            $set: {
                                winnersList: winnersList
                            }
                        })
                    }
                }
            } else {
                const roomInfo = await Room.findOne({ roomCode: room_code }).exec();
                if (roomInfo) {
                    const winnersList = roomInfo.winnersList;
                    winnersList.push(winnerInfo);
                    if (winnersList.length === 3) {
                        await Room.updateOne({ roomCode: this.state.roomCode }, {
                            $set: {
                                isClosed: true,
                                winnersList: winnersList
                            }
                        });
                        this.emit('closeRoom', { winnerInfo: roomInfo.winnersList, room_code });
                    } else {
                        await Room.updateOne({ roomCode: this.state.roomCode }, {
                            $set: {
                                winnersList: winnersList
                            }
                        })
                    }
                }
            }
        }

        return this.state;
    }

    markCurrentBase(spawnable: boolean) {
        this.io.to(this.state.roomCode).emit('markBase', spawnable);
        this.state = {
            ...this.state,
            bases: {
                ...this.state.bases,
                [this.state.currentTurn]: {
                    ...this.state.bases[this.state.currentTurn],
                    spawnable: spawnable,
                },
            },
        }
        return this.state;
    }

    disqualifyCoin(cellID: any, coinID: any, walkwayPosition: any) {

        const coinIDsInCell = [...this.state.cells[walkwayPosition][cellID].coinIDs];
        const coinIndexToDelete = coinIDsInCell.findIndex((coinIDInCell) => coinIDInCell === coinID);
        coinIDsInCell.splice(coinIndexToDelete, 1);
        this.state = {
            ...this.state,
            cells: {
                ...this.state.cells,
                [walkwayPosition]: {
                    ...this.state.cells[walkwayPosition],
                    [cellID]: {
                        ...this.state.cells[walkwayPosition][cellID],
                        coinIDs: coinIDsInCell,
                    },
                },
            },
            coins: {
                ...this.state.coins,
                [coinID]: {
                    ...this.state.coins[coinID],
                    isSpawned: false,
                    steps: 0,
                },
            },
        };

        return this.state;
    }

    moveCoinSuccess(currentDieRoll: Rolls, coinID: any) {

        this.state = {
            ...this.state,
            coins: {
                ...this.state.coins,
                [coinID]: {
                    ...this.state.coins[coinID],
                    steps: this.state.coins[coinID].steps + currentDieRoll,
                },
            },
        };

        if (this.markBase) {
            this.markBase = false;
            this.markCurrentBase(false);
        }

        return this.state;
    }

    enableBase(baseID: any) {
        this.state = {
            ...this.state,
            bases: {
                ...this.state.bases,
                [baseID]: {
                    ...this.state.bases[baseID],
                    enabled: true,
                    isLeave: false
                },
            },
        };
        return this.state;
    }

    updateCount(count: number) {
        this.state = {
            ...this.state,
            count: count
        };
        return this.state;
    }

    updateBase(baseID: any, base: any) {
        this.state = {
            ...this.state,
            bases: {
                ...this.state.bases,
                [baseID]: base,
            },
        }
        return this.state;
    }

    leavePlayer(baseID: any) {

        this.state = {
            ...this.state,
            bases: {
                ...this.state.bases,
                [baseID]: {
                    ...this.state.bases[baseID],
                    isLeave: true
                },
            },
        };
        this.io.to(this.state.roomCode).emit('leavePlayer', baseID);
        return this.state;
    }

    async updateLife(baseID: BaseID) {
        const life = this.state.bases[baseID].life - 1;
        this.io.to(this.state.roomCode).emit('life', { baseID: baseID, life: life });

        this.state = {
            ...this.state,
            bases: {
                ...this.state.bases,
                [baseID]: {
                    ...this.state.bases[baseID],
                    life: life,
                },
            },
        };

        if (life === 0) {
            this.removeActiveBase(baseID);
            this.setWinnerForLastPlayer()
        }
    }

    async setWinnerForLastPlayer() {
        if (this.activeBase.length === 1) {
            const winnerInfo = {
                name: this.state.bases[this.activeBase[0]].name,
                address: this.state.bases[this.activeBase[0]].address,
                baseID: this.state.bases[this.activeBase[0]].ID,
            }

            await Room.updateOne({ roomCode: this.state.roomCode }, {
                $set: {
                    isClosed: true,
                    winnersList: winnerInfo
                }
            })
            this.emit('closeRoom', { winnerInfo: [winnerInfo], room_code: this.state.roomCode });
        }
    }

    removeActiveBase(baseID: BaseID) {
        const filter = this.activeBase.filter((id) => id !== baseID);
        this.activeBase = filter;
        return filter;
    }

    setActiveBase(baseID: BaseID) {
        const activeBase = this.activeBase;
        activeBase.push(baseID)
        this.activeBase = activeBase;
    }

    winTimeDisable(baseID: any) {

        this.state = {
            ...this.state,
            bases: {
                ...this.state.bases,
                [baseID]: {
                    ...this.state.bases[baseID],
                    enabled: false,
                    hasWon: true
                },
            },
        }
        return this.state;

    }

    markWinner(baseID: any) {

        this.state = {
            ...this.state, bases: {
                ...this.state.bases, [baseID]: { ...this.state.bases[baseID], hasWon: true, },
            },
        }
        return this.state;
    }

    getMovableCoins(stepsToTake: Rolls) {

        const coins = this.state.coins;
        const currentTurnBase = this.state.currentTurn;
        const bases = this.state.bases;

        const movableCoins =
            bases[currentTurnBase].coinIDs.filter((coinID) =>
                coins[coinID].isSpawned
                && !coins[coinID].isRetired
                && coins[coinID].steps + stepsToTake <= WINNING_MOVES
            );
        return movableCoins;
    }

    isCurrentMoveValid(coinID: any, stepsToTake: Rolls) {
        const coins = this.state.coins;
        const coin = coins[coinID];
        return coin.steps + stepsToTake <= WINNING_MOVES;
    }

    performDisqualificationCheck(activeCoinID: any, walkwayPosition: WalkwayPosition, cellID: ICell['cellID']) {
        if (cellID === 'HOME') {
            return false;
        }
        const cells = this.state.cells;
        const coins = this.state.coins;

        const activeCoin = coins[activeCoinID];
        const cellInWhichCoinLanded = cells[walkwayPosition][cellID];
        if (cellInWhichCoinLanded.cellType === CellType.NORMAL) {
            // Check if the coin disqualifies another of a different base
            for (const coinID of cellInWhichCoinLanded.coinIDs) {
                const coin = coins[coinID];
                if (activeCoin.baseID !== coin.baseID) {
                    this.disqualifyCoin(cellID, coinID, walkwayPosition);
                    return true;
                }
            }
        }
        return false;
    }
}