import { Server, Socket } from "socket.io";

import http from "http";
import jwt from 'jsonwebtoken';
import axios from "axios";
import { Room } from "../Models/Room";
import { integer, MersenneTwister19937 } from 'random-js';

import STRoom from "./Room";
import { BaseID, CellType, IState, WalkwayPosition } from "../Types/Ludo";
import { initialState } from "../Constants";
import { mapByProperty } from "../utils";
import { Rolls } from "../Types/Dice";

const roomList: Map<string, STRoom> = new Map();
// setup websocket server
async function setupWebSocket(server: http.Server) {

    // setup socket handlers
    const io = new Server(server, {
        cors: {
            origin: '*',
        }
    });


    const getRandomInt = (max: any) => {
        return Math.floor(Math.random() * max);
    }


    io.on('connection', (socket: Socket) => {

        socket.on('join-room', async (payload, callback) => {

            const { room_code, name, address }: { room_code: string, name: string, address: string } = payload;
            const room = await Room.findOne({ roomCode: room_code }).exec();
            if (!room) {
                callback({ st: false, msg: 'room not exist' })
                return;
            }
            if (room.isClosed) {
                callback({ st: false, msg: 'room not exist' })
                return;
            }

            let roomState = roomList.get(room_code);
            let myBase: BaseID;
            if (roomState) {
                if (room.players?.BASE_1?.address && room.players?.BASE_1.address.toLocaleLowerCase() === address.toLocaleLowerCase()) {
                    roomState.enableBase(BaseID.BASE_1);
                    roomState.setActiveBase(BaseID.BASE_1);
                    await Room.updateOne({ roomCode: room_code }, {
                        $set: { 'players.BASE_1': roomState.state.bases[BaseID.BASE_1] }
                    });
                    myBase = BaseID.BASE_1
                } else if (room.players?.BASE_2?.address && room.players?.BASE_2.address.toLocaleLowerCase() === address.toLocaleLowerCase()) {
                    roomState.enableBase(BaseID.BASE_2);
                    roomState.setActiveBase(BaseID.BASE_2);
                    await Room.updateOne({ roomCode: room_code }, {
                        $set: { 'players.BASE_2': roomState.state.bases[BaseID.BASE_2] }
                    });
                    myBase = BaseID.BASE_2
                } else if (room.players?.BASE_3?.address && room.players?.BASE_3.address.toLocaleLowerCase() === address.toLocaleLowerCase()) {
                    roomState.enableBase(BaseID.BASE_3);
                    roomState.setActiveBase(BaseID.BASE_3);
                    await Room.updateOne({ roomCode: room_code }, {
                        $set: { 'players.BASE_3': roomState.state.bases[BaseID.BASE_3] }
                    });
                    myBase = BaseID.BASE_3;
                } else if (room.players?.BASE_4?.address && room.players?.BASE_4.address.toLocaleLowerCase() === address.toLocaleLowerCase()) {
                    roomState.enableBase(BaseID.BASE_4);
                    roomState.setActiveBase(BaseID.BASE_4);
                    await Room.updateOne({ roomCode: room_code }, {
                        $set: { 'players.BASE_4': roomState.state.bases[BaseID.BASE_4] }
                    });
                    myBase = BaseID.BASE_4
                } else {

                    if (room.isStarted) {
                        callback({ st: false, msg: 'game already started' })
                        return;
                    }

                    if (roomState.activeBase.length >= 4) {
                        callback({ st: false, msg: 'game room full' })
                        return;
                    }

                    if (!room.players?.BASE_1) {
                        const base = roomState.state.bases?.BASE_1;
                        base.address = address;
                        base.name = name;
                        base.enabled = true;
                        roomState.setActiveBase(BaseID.BASE_1);
                        roomState.updateBase(BaseID.BASE_1, base);
                        roomState.updateCount(roomState.state.count + 1);
                        await Room.updateOne({ roomCode: room_code }, {
                            $set: { 'players.BASE_1': base }
                        });
                        myBase = BaseID.BASE_1
                    } else if (!room.players?.BASE_2) {
                        const base = roomState.state.bases?.BASE_2;
                        base.address = address;
                        base.name = name;
                        base.enabled = true;
                        roomState.setActiveBase(BaseID.BASE_2);
                        roomState.updateBase(BaseID.BASE_2, base);
                        roomState.updateCount(roomState.state.count + 1);
                        await Room.updateOne({ roomCode: room_code }, {
                            $set: { 'players.BASE_2': base }
                        });
                        myBase = BaseID.BASE_2
                    } else {
                        const base = roomState.state.bases?.BASE_4;
                        base.address = address;
                        base.name = name;
                        base.enabled = true;
                        roomState.setActiveBase(BaseID.BASE_4);
                        roomState.updateBase(BaseID.BASE_4, base);
                        roomState.updateCount(roomState.state.count + 1);
                        await Room.updateOne({ roomCode: room_code }, {
                            $set: { 'players.BASE_4': base }
                        });
                        myBase = BaseID.BASE_4
                    }
                }
            } else {
                const basesArray = initialState.bases.map((base) => ({ ...base, spawnable: false }));
                const bases = mapByProperty(basesArray, 'ID');
                const coins = initialState.coins.map((coin) => ({ ...coin, color: bases[coin.baseID].color }));

                const gameData: IState = {
                    bases,
                    cells: initialState.cells,
                    coins: mapByProperty(coins, 'coinID'),
                    currentTurn: BaseID.BASE_3,
                    links: initialState.links,
                    relationships: initialState.relationships,
                    walkways: mapByProperty(initialState.walkways, 'ID'),
                    roomCode: room_code,
                    creator: room.creator,
                    count: 1
                };
                roomState = new STRoom(gameData, io);

                roomState.on('closeRoom', async ({ room_code, winnerInfo }) => {
                    await roomState?.delay(1000);
                    io.to(room_code).emit('closeRoom', winnerInfo)
                    roomList.delete(room_code);
                });
                const base = roomState.state.bases?.BASE_3;
                base.address = address;
                base.name = name;
                base.enabled = true;
                roomState.updateBase(BaseID.BASE_3, base);
                roomState.setActiveBase(BaseID.BASE_3);
                roomList.set(room_code, roomState);
                myBase = BaseID.BASE_3;
                await Room.updateOne({ roomCode: room_code }, {
                    $set: { 'players.BASE_3': base }
                });
            }
            socket.data.room_code = room_code;
            socket.data.myBase = myBase;
            socket.join(room_code);
            const roomInfo = await Room.findOne({ roomCode: room_code }).exec();
            socket.to(room_code).emit('newPlayer', { st: true, baseID: myBase, roomInfo: roomInfo, timeLeft: roomState.timeLeft, base: roomState.state.bases[myBase] })
            callback({ st: true, roomInfo: roomInfo, roomState: roomState.state, myBase: myBase, timeLeft: roomState.timeLeft });

            return;
        });

        socket.on('startGame', async (payload, callback) => {

            const room_code = socket.data.room_code;
            const roomInfo = await Room.findOne({ roomCode: room_code }).exec();
            const roomState = roomList.get(room_code);
            if (roomInfo && roomState) {
                await Room.updateOne({ roomCode: room_code }, {
                    $set: {
                        isStarted: true,
                    }
                });
                socket.to(room_code).emit('gameStarted', { isStarted: true })
                callback({ st: true });
                roomState.enableDie(BaseID.BASE_3);
                return;
            }
        })

        socket.on('dieRoll', async (myBase: string,) => {
            const room_code = socket.data.room_code;
            const roomInfo = await Room.findOne({ roomCode: room_code }).exec();
            const roomState = roomList.get(room_code);

            if (roomInfo && roomState) {
                let angleX = 0,
                    angleY = 0,
                    result = 1,
                    delay = 0

                const xTurn = 4 + getRandomInt(8);
                const yTurn = 4 + getRandomInt(8);
                delay = Math.max(xTurn, yTurn) * 50;
                let newX = angleX + 90 * xTurn;
                let newY = angleY + 90 * yTurn;

                // Balancing the results
                if (newX % 180) {
                    if (getRandomInt(3) > 1) {
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

                io.to(room_code).emit('dieRoll', { angleX: newX, angleY: newY, delay, dieRoll: result, myBase: myBase })


                // const mt = MersenneTwister19937.autoSeed();
                // const dieRoll = integer(1, 6)(mt);
                await roomState.delay(delay);
                await roomState.rollDie(result);
                // if (result !== 6) {
                //     await roomState.enableDie(roomState.state.currentTurn)
                // }
            }
        });

        socket.on('nextTurn', async (nextTurn: string) => {
            const room_code = socket.data.room_code;
            const roomInfo = await Room.findOne({ roomCode: room_code }).exec();
            if (roomInfo) {
                await Room.updateOne({ roomCode: room_code }, {
                    $set: {
                        currentTurn: nextTurn
                    }
                });
                socket.to(room_code).emit('nextTurn', nextTurn)
            }
        })

        socket.on('spawnCoin', async (payload, callback) => {
            try {
                let { coinID, baseID }: { coinID: string, cellID: string, baseID: string, position: WalkwayPosition } = payload;
                const room_code = socket.data.room_code;
                const roomState = roomList.get(room_code);

                if (roomState) {
                    const bases = roomState.state.bases;
                    const walkways = roomState.state.walkways;
                    const cells = roomState.state.cells;
                    const base = bases[baseID];
                    const walkway = Object.values(walkways).find((walkway) => walkway.baseID === baseID)!;
                    const walkwayCells = cells[walkway.position];
                    const spawnCellForCoin = Object.values(walkwayCells).find((cell) => cell.cellType === CellType.SPAWN)!;
                    const coinIDToSpawn = base.coinIDs.find((ID) => ID === coinID)!;

                    await roomState.spawnCoin(spawnCellForCoin.cellID, coinIDToSpawn, walkway.position);
                }
                callback(false);
            } catch (err) {
                console.log(err);
                callback(false);
            }
        });

        socket.on('moveCoin', async (payload, callback) => {
            try {
                let { coinID, cellID, position, currentDieRoll }: { coinID: string, cellID: string, position: WalkwayPosition, currentDieRoll: number } = payload
                const room_code = socket.data.room_code;
                const roomState = roomList.get(room_code);
                if (roomState) {
                    await roomState.moveCoin(coinID, cellID, position, currentDieRoll, room_code);
                }
                callback(false)
            } catch (err) {
                console.log(err);
                callback(false)
            }
        });

        socket.on('disconnect', async () => {
            const room_code = socket.data.room_code;
            const myBase = socket.data.myBase;

            const room = await Room.findOne({ roomCode: room_code }).exec();
            const roomState = roomList.get(room_code);

            if (room && roomState) {
                roomState.removeActiveBase(myBase)
                roomState.leavePlayer(myBase);

                await Room.updateOne({ roomCode: room_code }, {
                    $set: {
                        [`players.${myBase}`]: roomState.state.bases[myBase]
                    }
                });
            }
        })
    });
}

export default setupWebSocket;