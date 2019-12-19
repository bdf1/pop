main.floors.MT0=
{
    "floorId": "MT0",
    "title": "主塔 0 层",
    "name": "0",
    "canFlyTo": true,
    "canUseQuickShop": true,
    "cannotViewMap": false,
    "defaultGround": "ground",
    "images": [],
    "item_ratio": 1,
    "map": [
    [  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0],
    [  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0],
    [  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0],
    [  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0],
    [  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0],
    [  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0],
    [  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0],
    [  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0],
    [  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0],
    [  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0],
    [  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0],
    [  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0],
    [  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0]
],
    "firstArrive": [
        {
            "type": "playSound",
            "name": "click.mp3"
        },
        {
            "type": "setValue",
            "name": "flag:stage",
            "value": "0",
            "norefresh": true
        },
        {
            "type": "while",
            "condition": "status:hp>=status:mdef",
            "data": [
                {
                    "type": "addValue",
                    "name": "flag:stage",
                    "value": "1"
                },
                {
                    "type": "setFloor",
                    "name": "name",
                    "value": "flag:stage"
                },
                {
                    "type": "if",
                    "condition": "flag:stage==1",
                    "true": [
                        {
                            "type": "setValue",
                            "name": "status:mdef",
                            "value": "1000"
                        }
                    ],
                    "false": [
                        {
                            "type": "addValue",
                            "name": "status:mdef",
                            "value": "1800+100*flag:stage"
                        }
                    ]
                },
                "关卡${flag:stage}，目标分数${status:mdef}",
                {
                    "type": "insert",
                    "name": "main"
                },
                {
                    "type": "if",
                    "condition": "status:hp>=status:mdef",
                    "true": [
                        {
                            "type": "playSound",
                            "name": "win.mp3"
                        },
                        {
                            "type": "playSound",
                            "name": "fire.mp3"
                        }
                    ]
                }
            ]
        },
        {
            "type": "playSound",
            "name": "gameover.mp3"
        },
        {
            "type": "win",
            "reason": "GAME OVER"
        }
    ],
    "parallelDo": "",
    "events": {},
    "changeFloor": {},
    "afterBattle": {},
    "afterGetItem": {},
    "afterOpenDoor": {},
    "cannotMove": {},
    "bgmap": [

],
    "fgmap": [

],
    "width": 13,
    "height": 13,
    "autoEvent": {}
}