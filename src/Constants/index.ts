import { IBase, ICell, ICoin, IRelationship, IServerGameData, IWalkway, WalkwayPosition } from "../Types/Ludo";

export const initialState: IServerGameData = {
    "bases": [
        {
            "ID": "BASE_1",
            "coinIDs": [
                "BASE_1_COIN_1",
                "BASE_1_COIN_2",
                "BASE_1_COIN_3",
                "BASE_1_COIN_4"
            ],
            "color": "BLUE",
            "nextTurn": "BASE_2",
            "enabled": false,
            "isLeave": false,
            "hasWon": false,
            "life": 3,
        } as IBase,
        {
            "ID": "BASE_2",
            "coinIDs": [
                "BASE_2_COIN_1",
                "BASE_2_COIN_2",
                "BASE_2_COIN_3",
                "BASE_2_COIN_4"
            ],
            "color": "GREEN",
            "nextTurn": "BASE_4",
            "enabled": false,
            "isLeave": false,
            "hasWon": false,
            "life": 3,
        } as IBase,
        {
            "ID": "BASE_3",
            "coinIDs": [
                "BASE_3_COIN_1",
                "BASE_3_COIN_2",
                "BASE_3_COIN_3",
                "BASE_3_COIN_4"
            ],
            "color": "RED",
            "nextTurn": "BASE_1",
            "enabled": false,
            "isLeave": false,
            "hasWon": false,
            "life": 3,
        } as IBase,
        {
            "ID": "BASE_4",
            "coinIDs": [
                "BASE_4_COIN_1",
                "BASE_4_COIN_2",
                "BASE_4_COIN_3",
                "BASE_4_COIN_4"
            ],
            "color": "YELLOW",
            "nextTurn": "BASE_3",
            "enabled": false,
            "isLeave": false,
            "hasWon": false,
            "life": 3,
        } as IBase
    ] as IBase[],
    "coins": [
        {
            "coinID": "BASE_1_COIN_1",
            "isRetired": false,
            "isSpawned": false,
            "baseID": "BASE_1",
            "steps": 0,
            "cellID": null,
            "position": null
        },
        {
            "coinID": "BASE_1_COIN_2",
            "isRetired": false,
            "isSpawned": false,
            "baseID": "BASE_1",
            "steps": 0,
            "cellID": null,
            "position": null
        },
        {
            "coinID": "BASE_1_COIN_3",
            "isRetired": false,
            "isSpawned": false,
            "baseID": "BASE_1",
            "steps": 0,
            "cellID": null,
            "position": null
        },
        {
            "coinID": "BASE_1_COIN_4",
            "isRetired": false,
            "isSpawned": false,
            "baseID": "BASE_1",
            "steps": 0,
            "cellID": null,
            "position": null
        },
        {
            "coinID": "BASE_2_COIN_1",
            "isRetired": false,
            "isSpawned": false,
            "baseID": "BASE_2",
            "steps": 0,
            "cellID": null,
            "position": null
        },
        {
            "coinID": "BASE_2_COIN_2",
            "isRetired": false,
            "isSpawned": false,
            "baseID": "BASE_2",
            "steps": 0,
            "cellID": null,
            "position": null
        },
        {
            "coinID": "BASE_2_COIN_3",
            "isRetired": false,
            "isSpawned": false,
            "baseID": "BASE_2",
            "steps": 0,
            "cellID": null,
            "position": null
        },
        {
            "coinID": "BASE_2_COIN_4",
            "isRetired": false,
            "isSpawned": false,
            "baseID": "BASE_2",
            "steps": 0,
            "cellID": null,
            "position": null
        },
        {
            "coinID": "BASE_3_COIN_1",
            "isRetired": false,
            "isSpawned": false,
            "baseID": "BASE_3",
            "steps": 0,
            "cellID": null,
            "position": null
        },
        {
            "coinID": "BASE_3_COIN_2",
            "isRetired": false,
            "isSpawned": false,
            "baseID": "BASE_3",
            "steps": 0,
            "cellID": null,
            "position": null
        },
        {
            "coinID": "BASE_3_COIN_3",
            "isRetired": false,
            "isSpawned": false,
            "baseID": "BASE_3",
            "steps": 0,
            "cellID": null,
            "position": null
        },
        {
            "coinID": "BASE_3_COIN_4",
            "isRetired": false,
            "isSpawned": false,
            "baseID": "BASE_3",
            "steps": 0,
            "cellID": null,
            "position": null
        },
        {
            "coinID": "BASE_4_COIN_1",
            "isRetired": false,
            "isSpawned": false,
            "baseID": "BASE_4",
            "steps": 0,
            "cellID": null,
            "position": null
        },
        {
            "coinID": "BASE_4_COIN_2",
            "isRetired": false,
            "isSpawned": false,
            "baseID": "BASE_4",
            "steps": 0,
            "cellID": null,
            "position": null
        },
        {
            "coinID": "BASE_4_COIN_3",
            "isRetired": false,
            "isSpawned": false,
            "baseID": "BASE_4",
            "steps": 0,
            "cellID": null,
            "position": null
        },
        {
            "coinID": "BASE_4_COIN_4",
            "isRetired": false,
            "isSpawned": false,
            "baseID": "BASE_4",
            "steps": 0,
            "cellID": null,
            "position": null
        }
    ] as ICoin[],
    "walkways": [
        {
            "ID": "WALKWAY_1",
            "position": "NORTH" as WalkwayPosition,
            "baseID": "BASE_2"
        },
        {
            "ID": "WALKWAY_2",
            "position": "EAST" as WalkwayPosition,
            "baseID": "BASE_4"
        },
        {
            "ID": "WALKWAY_3",
            "position": "WEST" as WalkwayPosition,
            "baseID": "BASE_1"
        },
        {
            "ID": "WALKWAY_4",
            "position": "SOUTH" as WalkwayPosition,
            "baseID": "BASE_3"
        }
    ] as IWalkway[],
    "relationships": [
        {
            "ID": "BASE_1",
            "type": "BASE"
        },
        {
            "ID": "WALKWAY_1",
            "type": "WALKWAY"
        },
        {
            "ID": "BASE_2",
            "type": "BASE"
        },
        {
            "ID": "WALKWAY_3",
            "type": "WALKWAY"
        },
        {
            "ID": "HOME",
            "type": "HOME",
            "baseIDs": [
                "BASE_2",
                "BASE_4",
                "BASE_3",
                "BASE_1"
            ]
        },
        {
            "ID": "WALKWAY_2",
            "type": "WALKWAY"
        },
        {
            "ID": "BASE_3",
            "type": "BASE"
        },
        {
            "ID": "WALKWAY_4",
            "type": "WALKWAY"
        },
        {
            "ID": "BASE_4",
            "type": "BASE"
        }
    ] as IRelationship[],
    "cells": {
        "SOUTH": {
            "SOUTH_5_0": {
                "baseID": "BASE_3",
                "cellID": "SOUTH_5_0",
                "column": 0,
                "position": "SOUTH" as WalkwayPosition,
                "row": 5,
                "cellType": "NORMAL",
                "coinIDs": []
            },
            "SOUTH_5_1": {
                "baseID": "BASE_3",
                "cellID": "SOUTH_5_1",
                "column": 1,
                "position": "SOUTH" as WalkwayPosition,
                "row": 5,
                "cellType": "NORMAL",
                "coinIDs": []
            },
            "SOUTH_5_2": {
                "baseID": "BASE_3",
                "cellID": "SOUTH_5_2",
                "column": 2,
                "position": "SOUTH" as WalkwayPosition,
                "row": 5,
                "cellType": "NORMAL",
                "coinIDs": []
            },
            "SOUTH_4_0": {
                "baseID": "BASE_3",
                "cellID": "SOUTH_4_0",
                "column": 0,
                "position": "SOUTH" as WalkwayPosition,
                "row": 4,
                "cellType": "SPAWN",
                "coinIDs": []
            },
            "SOUTH_4_1": {
                "baseID": "BASE_3",
                "cellID": "SOUTH_4_1",
                "column": 1,
                "position": "SOUTH" as WalkwayPosition,
                "row": 4,
                "cellType": "HOMEPATH",
                "coinIDs": []
            },
            "SOUTH_4_2": {
                "baseID": "BASE_3",
                "cellID": "SOUTH_4_2",
                "column": 2,
                "position": "SOUTH" as WalkwayPosition,
                "row": 4,
                "cellType": "NORMAL",
                "coinIDs": []
            },
            "SOUTH_3_0": {
                "baseID": "BASE_3",
                "cellID": "SOUTH_3_0",
                "column": 0,
                "position": "SOUTH" as WalkwayPosition,
                "row": 3,
                "cellType": "NORMAL",
                "coinIDs": []
            },
            "SOUTH_3_1": {
                "baseID": "BASE_3",
                "cellID": "SOUTH_3_1",
                "column": 1,
                "position": "SOUTH" as WalkwayPosition,
                "row": 3,
                "cellType": "HOMEPATH",
                "coinIDs": []
            },
            "SOUTH_3_2": {
                "baseID": "BASE_3",
                "cellID": "SOUTH_3_2",
                "column": 2,
                "position": "SOUTH" as WalkwayPosition,
                "row": 3,
                "cellType": "STAR",
                "coinIDs": []
            },
            "SOUTH_2_0": {
                "baseID": "BASE_3",
                "cellID": "SOUTH_2_0",
                "column": 0,
                "position": "SOUTH" as WalkwayPosition,
                "row": 2,
                "cellType": "NORMAL",
                "coinIDs": []
            },
            "SOUTH_2_1": {
                "baseID": "BASE_3",
                "cellID": "SOUTH_2_1",
                "column": 1,
                "position": "SOUTH" as WalkwayPosition,
                "row": 2,
                "cellType": "HOMEPATH",
                "coinIDs": []
            },
            "SOUTH_2_2": {
                "baseID": "BASE_3",
                "cellID": "SOUTH_2_2",
                "column": 2,
                "position": "SOUTH" as WalkwayPosition,
                "row": 2,
                "cellType": "NORMAL",
                "coinIDs": []
            },
            "SOUTH_1_0": {
                "baseID": "BASE_3",
                "cellID": "SOUTH_1_0",
                "column": 0,
                "position": "SOUTH" as WalkwayPosition,
                "row": 1,
                "cellType": "NORMAL",
                "coinIDs": []
            },
            "SOUTH_1_1": {
                "baseID": "BASE_3",
                "cellID": "SOUTH_1_1",
                "column": 1,
                "position": "SOUTH" as WalkwayPosition,
                "row": 1,
                "cellType": "HOMEPATH",
                "coinIDs": []
            },
            "SOUTH_1_2": {
                "baseID": "BASE_3",
                "cellID": "SOUTH_1_2",
                "column": 2,
                "position": "SOUTH" as WalkwayPosition,
                "row": 1,
                "cellType": "NORMAL",
                "coinIDs": []
            },
            "SOUTH_0_0": {
                "baseID": "BASE_3",
                "cellID": "SOUTH_0_0",
                "column": 0,
                "position": "SOUTH" as WalkwayPosition,
                "row": 0,
                "cellType": "NORMAL",
                "coinIDs": []
            },
            "SOUTH_0_1": {
                "baseID": "BASE_3",
                "cellID": "SOUTH_0_1",
                "column": 1,
                "position": "SOUTH" as WalkwayPosition,
                "row": 0,
                "cellType": "HOMEPATH",
                "coinIDs": []
            },
            "SOUTH_0_2": {
                "baseID": "BASE_3",
                "cellID": "SOUTH_0_2",
                "column": 2,
                "position": "SOUTH" as WalkwayPosition,
                "row": 0,
                "cellType": "NORMAL",
                "coinIDs": []
            }
        },
        "WEST": {
            "WEST_2_5": {
                "baseID": "BASE_1",
                "cellID": "WEST_2_5",
                "column": 5,
                "position": "WEST" as WalkwayPosition,
                "row": 2,
                "cellType": "NORMAL",
                "coinIDs": []
            },
            "WEST_2_4": {
                "baseID": "BASE_1",
                "cellID": "WEST_2_4",
                "column": 4,
                "position": "WEST" as WalkwayPosition,
                "row": 2,
                "cellType": "NORMAL",
                "coinIDs": []
            },
            "WEST_2_3": {
                "baseID": "BASE_1",
                "cellID": "WEST_2_3",
                "column": 3,
                "position": "WEST" as WalkwayPosition,
                "row": 2,
                "cellType": "NORMAL",
                "coinIDs": []
            },
            "WEST_2_2": {
                "baseID": "BASE_1",
                "cellID": "WEST_2_2",
                "column": 2,
                "position": "WEST" as WalkwayPosition,
                "row": 2,
                "cellType": "STAR",
                "coinIDs": []
            },
            "WEST_2_1": {
                "baseID": "BASE_1",
                "cellID": "WEST_2_1",
                "column": 1,
                "position": "WEST" as WalkwayPosition,
                "row": 2,
                "cellType": "NORMAL",
                "coinIDs": []
            },
            "WEST_2_0": {
                "baseID": "BASE_1",
                "cellID": "WEST_2_0",
                "column": 0,
                "position": "WEST" as WalkwayPosition,
                "row": 2,
                "cellType": "NORMAL",
                "coinIDs": []
            },
            "WEST_1_0": {
                "baseID": "BASE_1",
                "cellID": "WEST_1_0",
                "column": 0,
                "position": "WEST" as WalkwayPosition,
                "row": 1,
                "cellType": "NORMAL",
                "coinIDs": []
            },
            "WEST_1_1": {
                "baseID": "BASE_1",
                "cellID": "WEST_1_1",
                "column": 1,
                "position": "WEST" as WalkwayPosition,
                "row": 1,
                "cellType": "HOMEPATH",
                "coinIDs": []
            },
            "WEST_1_2": {
                "baseID": "BASE_1",
                "cellID": "WEST_1_2",
                "column": 2,
                "position": "WEST" as WalkwayPosition,
                "row": 1,
                "cellType": "HOMEPATH",
                "coinIDs": []
            },
            "WEST_1_3": {
                "baseID": "BASE_1",
                "cellID": "WEST_1_3",
                "column": 3,
                "position": "WEST" as WalkwayPosition,
                "row": 1,
                "cellType": "HOMEPATH",
                "coinIDs": []
            },
            "WEST_1_4": {
                "baseID": "BASE_1",
                "cellID": "WEST_1_4",
                "column": 4,
                "position": "WEST" as WalkwayPosition,
                "row": 1,
                "cellType": "HOMEPATH",
                "coinIDs": []
            },
            "WEST_1_5": {
                "baseID": "BASE_1",
                "cellID": "WEST_1_5",
                "column": 5,
                "position": "WEST" as WalkwayPosition,
                "row": 1,
                "cellType": "HOMEPATH",
                "coinIDs": []
            },
            "WEST_0_0": {
                "baseID": "BASE_1",
                "cellID": "WEST_0_0",
                "column": 0,
                "position": "WEST" as WalkwayPosition,
                "row": 0,
                "cellType": "NORMAL",
                "coinIDs": []
            },
            "WEST_0_1": {
                "baseID": "BASE_1",
                "cellID": "WEST_0_1",
                "column": 1,
                "position": "WEST" as WalkwayPosition,
                "row": 0,
                "cellType": "SPAWN",
                "coinIDs": []
            },
            "WEST_0_2": {
                "baseID": "BASE_1",
                "cellID": "WEST_0_2",
                "column": 2,
                "position": "WEST" as WalkwayPosition,
                "row": 0,
                "cellType": "NORMAL",
                "coinIDs": []
            },
            "WEST_0_3": {
                "baseID": "BASE_1",
                "cellID": "WEST_0_3",
                "column": 3,
                "position": "WEST" as WalkwayPosition,
                "row": 0,
                "cellType": "NORMAL",
                "coinIDs": []
            },
            "WEST_0_4": {
                "baseID": "BASE_1",
                "cellID": "WEST_0_4",
                "column": 4,
                "position": "WEST" as WalkwayPosition,
                "row": 0,
                "cellType": "NORMAL",
                "coinIDs": []
            },
            "WEST_0_5": {
                "baseID": "BASE_1",
                "cellID": "WEST_0_5",
                "column": 5,
                "position": "WEST" as WalkwayPosition,
                "row": 0,
                "cellType": "NORMAL",
                "coinIDs": []
            }
        },
        "NORTH": {
            "NORTH_5_0": {
                "baseID": "BASE_2",
                "cellID": "NORTH_5_0",
                "column": 0,
                "position": "NORTH" as WalkwayPosition,
                "row": 5,
                "cellType": "NORMAL",
                "coinIDs": []
            },
            "NORTH_4_0": {
                "baseID": "BASE_2",
                "cellID": "NORTH_4_0",
                "column": 0,
                "position": "NORTH" as WalkwayPosition,
                "row": 4,
                "cellType": "NORMAL",
                "coinIDs": []
            },
            "NORTH_3_0": {
                "baseID": "BASE_2",
                "cellID": "NORTH_3_0",
                "column": 0,
                "position": "NORTH" as WalkwayPosition,
                "row": 3,
                "cellType": "NORMAL",
                "coinIDs": []
            },
            "NORTH_2_0": {
                "baseID": "BASE_2",
                "cellID": "NORTH_2_0",
                "column": 0,
                "position": "NORTH" as WalkwayPosition,
                "row": 2,
                "cellType": "STAR",
                "coinIDs": []
            },
            "NORTH_1_0": {
                "baseID": "BASE_2",
                "cellID": "NORTH_1_0",
                "column": 0,
                "position": "NORTH" as WalkwayPosition,
                "row": 1,
                "cellType": "NORMAL",
                "coinIDs": []
            },
            "NORTH_0_0": {
                "baseID": "BASE_2",
                "cellID": "NORTH_0_0",
                "column": 0,
                "position": "NORTH" as WalkwayPosition,
                "row": 0,
                "cellType": "NORMAL",
                "coinIDs": []
            },
            "NORTH_0_1": {
                "baseID": "BASE_2",
                "cellID": "NORTH_0_1",
                "column": 1,
                "position": "NORTH" as WalkwayPosition,
                "row": 0,
                "cellType": "NORMAL",
                "coinIDs": []
            },
            "NORTH_1_1": {
                "baseID": "BASE_2",
                "cellID": "NORTH_1_1",
                "column": 1,
                "position": "NORTH" as WalkwayPosition,
                "row": 1,
                "cellType": "HOMEPATH",
                "coinIDs": []
            },
            "NORTH_2_1": {
                "baseID": "BASE_2",
                "cellID": "NORTH_2_1",
                "column": 1,
                "position": "NORTH" as WalkwayPosition,
                "row": 2,
                "cellType": "HOMEPATH",
                "coinIDs": []
            },
            "NORTH_3_1": {
                "baseID": "BASE_2",
                "cellID": "NORTH_3_1",
                "column": 1,
                "position": "NORTH" as WalkwayPosition,
                "row": 3,
                "cellType": "HOMEPATH",
                "coinIDs": []
            },
            "NORTH_4_1": {
                "baseID": "BASE_2",
                "cellID": "NORTH_4_1",
                "column": 1,
                "position": "NORTH" as WalkwayPosition,
                "row": 4,
                "cellType": "HOMEPATH",
                "coinIDs": []
            },
            "NORTH_5_1": {
                "baseID": "BASE_2",
                "cellID": "NORTH_5_1",
                "column": 1,
                "position": "NORTH" as WalkwayPosition,
                "row": 5,
                "cellType": "HOMEPATH",
                "coinIDs": []
            },
            "NORTH_0_2": {
                "baseID": "BASE_2",
                "cellID": "NORTH_0_2",
                "column": 2,
                "position": "NORTH" as WalkwayPosition,
                "row": 0,
                "cellType": "NORMAL",
                "coinIDs": []
            },
            "NORTH_1_2": {
                "baseID": "BASE_2",
                "cellID": "NORTH_1_2",
                "column": 2,
                "position": "NORTH" as WalkwayPosition,
                "row": 1,
                "cellType": "SPAWN",
                "coinIDs": []
            },
            "NORTH_2_2": {
                "baseID": "BASE_2",
                "cellID": "NORTH_2_2",
                "column": 2,
                "position": "NORTH" as WalkwayPosition,
                "row": 2,
                "cellType": "NORMAL",
                "coinIDs": []
            },
            "NORTH_3_2": {
                "baseID": "BASE_2",
                "cellID": "NORTH_3_2",
                "column": 2,
                "position": "NORTH" as WalkwayPosition,
                "row": 3,
                "cellType": "NORMAL",
                "coinIDs": []
            },
            "NORTH_4_2": {
                "baseID": "BASE_2",
                "cellID": "NORTH_4_2",
                "column": 2,
                "position": "NORTH" as WalkwayPosition,
                "row": 4,
                "cellType": "NORMAL",
                "coinIDs": []
            },
            "NORTH_5_2": {
                "baseID": "BASE_2",
                "cellID": "NORTH_5_2",
                "column": 2,
                "position": "NORTH" as WalkwayPosition,
                "row": 5,
                "cellType": "NORMAL",
                "coinIDs": []
            }
        },
        "EAST": {
            "EAST_0_0": {
                "baseID": "BASE_4",
                "cellID": "EAST_0_0",
                "column": 0,
                "position": "EAST" as WalkwayPosition,
                "row": 0,
                "cellType": "NORMAL",
                "coinIDs": []
            },
            "EAST_0_1": {
                "baseID": "BASE_4",
                "cellID": "EAST_0_1",
                "column": 1,
                "position": "EAST" as WalkwayPosition,
                "row": 0,
                "cellType": "NORMAL",
                "coinIDs": []
            },
            "EAST_0_2": {
                "baseID": "BASE_4",
                "cellID": "EAST_0_2",
                "column": 2,
                "position": "EAST" as WalkwayPosition,
                "row": 0,
                "cellType": "NORMAL",
                "coinIDs": []
            },
            "EAST_0_3": {
                "baseID": "BASE_4",
                "cellID": "EAST_0_3",
                "column": 3,
                "position": "EAST" as WalkwayPosition,
                "row": 0,
                "cellType": "STAR",
                "coinIDs": []
            },
            "EAST_0_4": {
                "baseID": "BASE_4",
                "cellID": "EAST_0_4",
                "column": 4,
                "position": "EAST" as WalkwayPosition,
                "row": 0,
                "cellType": "NORMAL",
                "coinIDs": []
            },
            "EAST_0_5": {
                "baseID": "BASE_4",
                "cellID": "EAST_0_5",
                "column": 5,
                "position": "EAST" as WalkwayPosition,
                "row": 0,
                "cellType": "NORMAL",
                "coinIDs": []
            },
            "EAST_1_5": {
                "baseID": "BASE_4",
                "cellID": "EAST_1_5",
                "column": 5,
                "position": "EAST" as WalkwayPosition,
                "row": 1,
                "cellType": "NORMAL",
                "coinIDs": []
            },
            "EAST_1_4": {
                "baseID": "BASE_4",
                "cellID": "EAST_1_4",
                "column": 4,
                "position": "EAST" as WalkwayPosition,
                "row": 1,
                "cellType": "HOMEPATH",
                "coinIDs": []
            },
            "EAST_1_3": {
                "baseID": "BASE_4",
                "cellID": "EAST_1_3",
                "column": 3,
                "position": "EAST" as WalkwayPosition,
                "row": 1,
                "cellType": "HOMEPATH",
                "coinIDs": []
            },
            "EAST_1_2": {
                "baseID": "BASE_4",
                "cellID": "EAST_1_2",
                "column": 2,
                "position": "EAST" as WalkwayPosition,
                "row": 1,
                "cellType": "HOMEPATH",
                "coinIDs": []
            },
            "EAST_1_1": {
                "baseID": "BASE_4",
                "cellID": "EAST_1_1",
                "column": 1,
                "position": "EAST" as WalkwayPosition,
                "row": 1,
                "cellType": "HOMEPATH",
                "coinIDs": []
            },
            "EAST_1_0": {
                "baseID": "BASE_4",
                "cellID": "EAST_1_0",
                "column": 0,
                "position": "EAST" as WalkwayPosition,
                "row": 1,
                "cellType": "HOMEPATH",
                "coinIDs": []
            },
            "EAST_2_0": {
                "baseID": "BASE_4",
                "cellID": "EAST_2_0",
                "column": 0,
                "position": "EAST" as WalkwayPosition,
                "row": 2,
                "cellType": "NORMAL",
                "coinIDs": []
            },
            "EAST_2_1": {
                "baseID": "BASE_4",
                "cellID": "EAST_2_1",
                "column": 1,
                "position": "EAST" as WalkwayPosition,
                "row": 2,
                "cellType": "NORMAL",
                "coinIDs": []
            },
            "EAST_2_2": {
                "baseID": "BASE_4",
                "cellID": "EAST_2_2",
                "column": 2,
                "position": "EAST" as WalkwayPosition,
                "row": 2,
                "cellType": "NORMAL",
                "coinIDs": []
            },
            "EAST_2_3": {
                "baseID": "BASE_4",
                "cellID": "EAST_2_3",
                "column": 3,
                "position": "EAST" as WalkwayPosition,
                "row": 2,
                "cellType": "NORMAL",
                "coinIDs": []
            },
            "EAST_2_4": {
                "baseID": "BASE_4",
                "cellID": "EAST_2_4",
                "column": 4,
                "position": "EAST" as WalkwayPosition,
                "row": 2,
                "cellType": "SPAWN",
                "coinIDs": []
            },
            "EAST_2_5": {
                "baseID": "BASE_4",
                "cellID": "EAST_2_5",
                "column": 5,
                "position": "EAST" as WalkwayPosition,
                "row": 2,
                "cellType": "NORMAL",
                "coinIDs": []
            }
        }
    } as {
        [walkwayPosition: string]: {
            [cellID: string]: ICell;
        };
    },
    "links": {
        "SOUTH_4_0": [
            {
                "cellID": "SOUTH_3_0",
                "position": "SOUTH" as WalkwayPosition
            }
        ],
        "SOUTH_3_0": [
            {
                "cellID": "SOUTH_2_0",
                "position": "SOUTH" as WalkwayPosition
            }
        ],
        "SOUTH_2_0": [
            {
                "cellID": "SOUTH_1_0",
                "position": "SOUTH" as WalkwayPosition
            }
        ],
        "SOUTH_1_0": [
            {
                "cellID": "SOUTH_0_0",
                "position": "SOUTH" as WalkwayPosition
            }
        ],
        "SOUTH_0_0": [
            {
                "cellID": "WEST_2_5",
                "position": "WEST" as WalkwayPosition
            }
        ],
        "WEST_2_5": [
            {
                "cellID": "WEST_2_4",
                "position": "WEST" as WalkwayPosition
            }
        ],
        "WEST_2_4": [
            {
                "cellID": "WEST_2_3",
                "position": "WEST" as WalkwayPosition
            }
        ],
        "WEST_2_3": [
            {
                "cellID": "WEST_2_2",
                "position": "WEST" as WalkwayPosition
            }
        ],
        "WEST_2_2": [
            {
                "cellID": "WEST_2_1",
                "position": "WEST" as WalkwayPosition
            }
        ],
        "WEST_2_1": [
            {
                "cellID": "WEST_2_0",
                "position": "WEST" as WalkwayPosition
            }
        ],
        "WEST_2_0": [
            {
                "cellID": "WEST_1_0",
                "position": "WEST" as WalkwayPosition
            }
        ],
        "WEST_1_0": [
            {
                "cellID": "WEST_0_0",
                "position": "WEST" as WalkwayPosition
            },
            {
                "cellID": "WEST_1_1",
                "position": "WEST" as WalkwayPosition
            }
        ],
        "WEST_1_1": [
            {
                "cellID": "WEST_1_2",
                "position": "WEST" as WalkwayPosition
            }
        ],
        "WEST_1_2": [
            {
                "cellID": "WEST_1_3",
                "position": "WEST" as WalkwayPosition
            }
        ],
        "WEST_1_3": [
            {
                "cellID": "WEST_1_4",
                "position": "WEST" as WalkwayPosition
            }
        ],
        "WEST_1_4": [
            {
                "cellID": "WEST_1_5",
                "position": "WEST" as WalkwayPosition
            }
        ],
        "WEST_0_0": [
            {
                "cellID": "WEST_0_1",
                "position": "WEST" as WalkwayPosition
            }
        ],
        "WEST_0_1": [
            {
                "cellID": "WEST_0_2",
                "position": "WEST" as WalkwayPosition
            }
        ],
        "WEST_0_2": [
            {
                "cellID": "WEST_0_3",
                "position": "WEST" as WalkwayPosition
            }
        ],
        "WEST_0_3": [
            {
                "cellID": "WEST_0_4",
                "position": "WEST" as WalkwayPosition
            }
        ],
        "WEST_0_4": [
            {
                "cellID": "WEST_0_5",
                "position": "WEST" as WalkwayPosition
            }
        ],
        "WEST_0_5": [
            {
                "cellID": "NORTH_5_0",
                "position": "NORTH" as WalkwayPosition
            }
        ],
        "NORTH_5_0": [
            {
                "cellID": "NORTH_4_0",
                "position": "NORTH" as WalkwayPosition
            }
        ],
        "NORTH_4_0": [
            {
                "cellID": "NORTH_3_0",
                "position": "NORTH" as WalkwayPosition
            }
        ],
        "NORTH_3_0": [
            {
                "cellID": "NORTH_2_0",
                "position": "NORTH" as WalkwayPosition
            }
        ],
        "NORTH_2_0": [
            {
                "cellID": "NORTH_1_0",
                "position": "NORTH" as WalkwayPosition
            }
        ],
        "NORTH_1_0": [
            {
                "cellID": "NORTH_0_0",
                "position": "NORTH" as WalkwayPosition
            }
        ],
        "NORTH_0_0": [
            {
                "cellID": "NORTH_0_1",
                "position": "NORTH" as WalkwayPosition
            }
        ],
        "NORTH_0_1": [
            {
                "cellID": "NORTH_0_2",
                "position": "NORTH" as WalkwayPosition
            },
            {
                "cellID": "NORTH_1_1",
                "position": "NORTH" as WalkwayPosition
            }
        ],
        "NORTH_1_1": [
            {
                "cellID": "NORTH_2_1",
                "position": "NORTH" as WalkwayPosition
            }
        ],
        "NORTH_2_1": [
            {
                "cellID": "NORTH_3_1",
                "position": "NORTH" as WalkwayPosition
            }
        ],
        "NORTH_3_1": [
            {
                "cellID": "NORTH_4_1",
                "position": "NORTH" as WalkwayPosition
            }
        ],
        "NORTH_4_1": [
            {
                "cellID": "NORTH_5_1",
                "position": "NORTH" as WalkwayPosition
            }
        ],
        "NORTH_0_2": [
            {
                "cellID": "NORTH_1_2",
                "position": "NORTH" as WalkwayPosition
            }
        ],
        "NORTH_1_2": [
            {
                "cellID": "NORTH_2_2",
                "position": "NORTH" as WalkwayPosition
            }
        ],
        "NORTH_2_2": [
            {
                "cellID": "NORTH_3_2",
                "position": "NORTH" as WalkwayPosition
            }
        ],
        "NORTH_3_2": [
            {
                "cellID": "NORTH_4_2",
                "position": "NORTH" as WalkwayPosition
            }
        ],
        "NORTH_4_2": [
            {
                "cellID": "NORTH_5_2",
                "position": "NORTH" as WalkwayPosition
            }
        ],
        "NORTH_5_2": [
            {
                "cellID": "EAST_0_0",
                "position": "EAST" as WalkwayPosition
            }
        ],
        "EAST_0_0": [
            {
                "cellID": "EAST_0_1",
                "position": "EAST" as WalkwayPosition
            }
        ],
        "EAST_0_1": [
            {
                "cellID": "EAST_0_2",
                "position": "EAST" as WalkwayPosition
            }
        ],
        "EAST_0_2": [
            {
                "cellID": "EAST_0_3",
                "position": "EAST" as WalkwayPosition
            }
        ],
        "EAST_0_3": [
            {
                "cellID": "EAST_0_4",
                "position": "EAST" as WalkwayPosition
            }
        ],
        "EAST_0_4": [
            {
                "cellID": "EAST_0_5",
                "position": "EAST" as WalkwayPosition
            }
        ],
        "EAST_0_5": [
            {
                "cellID": "EAST_1_5",
                "position": "EAST" as WalkwayPosition
            }
        ],
        "EAST_1_5": [
            {
                "cellID": "EAST_2_5",
                "position": "EAST" as WalkwayPosition
            },
            {
                "cellID": "EAST_1_4",
                "position": "EAST" as WalkwayPosition
            }
        ],
        "EAST_1_4": [
            {
                "cellID": "EAST_1_3",
                "position": "EAST" as WalkwayPosition
            }
        ],
        "EAST_1_3": [
            {
                "cellID": "EAST_1_2",
                "position": "EAST" as WalkwayPosition
            }
        ],
        "EAST_1_2": [
            {
                "cellID": "EAST_1_1",
                "position": "EAST" as WalkwayPosition
            }
        ],
        "EAST_1_1": [
            {
                "cellID": "EAST_1_0",
                "position": "EAST" as WalkwayPosition
            }
        ],
        "EAST_2_5": [
            {
                "cellID": "EAST_2_4",
                "position": "EAST" as WalkwayPosition
            }
        ],
        "EAST_2_4": [
            {
                "cellID": "EAST_2_3",
                "position": "EAST" as WalkwayPosition
            }
        ],
        "EAST_2_3": [
            {
                "cellID": "EAST_2_2",
                "position": "EAST" as WalkwayPosition
            }
        ],
        "EAST_2_2": [
            {
                "cellID": "EAST_2_1",
                "position": "EAST" as WalkwayPosition
            }
        ],
        "EAST_2_1": [
            {
                "cellID": "EAST_2_0",
                "position": "EAST" as WalkwayPosition
            }
        ],
        "EAST_2_0": [
            {
                "cellID": "SOUTH_0_2",
                "position": "SOUTH" as WalkwayPosition
            }
        ],
        "SOUTH_0_2": [
            {
                "cellID": "SOUTH_1_2",
                "position": "SOUTH" as WalkwayPosition
            }
        ],
        "SOUTH_1_2": [
            {
                "cellID": "SOUTH_2_2",
                "position": "SOUTH" as WalkwayPosition
            }
        ],
        "SOUTH_2_2": [
            {
                "cellID": "SOUTH_3_2",
                "position": "SOUTH" as WalkwayPosition
            }
        ],
        "SOUTH_3_2": [
            {
                "cellID": "SOUTH_4_2",
                "position": "SOUTH" as WalkwayPosition
            }
        ],
        "SOUTH_4_2": [
            {
                "cellID": "SOUTH_5_2",
                "position": "SOUTH" as WalkwayPosition
            }
        ],
        "SOUTH_5_2": [
            {
                "cellID": "SOUTH_5_1",
                "position": "SOUTH" as WalkwayPosition
            }
        ],
        "SOUTH_5_1": [
            {
                "cellID": "SOUTH_5_0",
                "position": "SOUTH" as WalkwayPosition
            },
            {
                "cellID": "SOUTH_4_1",
                "position": "SOUTH" as WalkwayPosition
            }
        ],
        "SOUTH_5_0": [
            {
                "cellID": "SOUTH_4_0",
                "position": "SOUTH" as WalkwayPosition
            }
        ],
        "SOUTH_4_1": [
            {
                "cellID": "SOUTH_3_1",
                "position": "SOUTH" as WalkwayPosition
            }
        ],
        "SOUTH_3_1": [
            {
                "cellID": "SOUTH_2_1",
                "position": "SOUTH" as WalkwayPosition
            }
        ],
        "SOUTH_2_1": [
            {
                "cellID": "SOUTH_1_1",
                "position": "SOUTH" as WalkwayPosition
            }
        ],
        "SOUTH_1_1": [
            {
                "cellID": "SOUTH_0_1",
                "position": "SOUTH" as WalkwayPosition
            }
        ],
        "SOUTH_0_1": [
            {
                "cellID": "HOME",
                "position": "HOME" as WalkwayPosition
            }
        ],
        "EAST_1_0": [
            {
                "cellID": "HOME",
                "position": "HOME" as WalkwayPosition
            }
        ],
        "NORTH_5_1": [
            {
                "cellID": "HOME",
                "position": "HOME" as WalkwayPosition
            }
        ],
        "WEST_1_5": [
            {
                "cellID": "HOME",
                "position": "HOME" as WalkwayPosition
            }
        ]
    }
}