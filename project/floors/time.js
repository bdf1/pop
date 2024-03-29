main.floors.time=
{
    "floorId": "time",
    "title": "主塔 0 层",
    "name": "0",
    "width": 13,
    "height": 13,
    "canFlyTo": true,
    "canUseQuickShop": true,
    "cannotViewMap": false,
    "images": [],
    "item_ratio": 1,
    "defaultGround": "ground",
    "firstArrive": [
        {
            "type": "setFloor",
            "name": "name",
            "value": "status:mdef/1000+'秒'"
        },
        {
            "type": "playSound",
            "name": "click.mp3"
        },
        {
            "type": "setValue",
            "name": "flag:___",
            "value": "status:mdef",
            "norefresh": true
        },
        {
            "type": "insert",
            "name": "new"
        },
        {
            "type": "insert",
            "name": "draw"
        },
        {
            "type": "while",
            "condition": "status:mdef>0",
            "data": [
                {
                    "type": "wait"
                },
                {
                    "type": "if",
                    "condition": "flag:x==12&&flag:y==0",
                    "true": [
                        {
                            "type": "setValue",
                            "name": "flag:GEL",
                            "value": "1",
                            "norefresh": true
                        }
                    ]
                },
                {
                    "type": "if",
                    "condition": "flag:x<10&&flag:y>2",
                    "true": [
                        {
                            "type": "setValue",
                            "name": "flag:x",
                            "value": "flag:x+1",
                            "norefresh": true
                        },
                        {
                            "type": "setValue",
                            "name": "flag:y",
                            "value": "13-flag:y",
                            "norefresh": true
                        },
                        {
                            "type": "if",
                            "condition": "flag:grp[flag:x][flag:y]>0",
                            "true": [
                                {
                                    "type": "setValue",
                                    "name": "flag:_",
                                    "value": "flag:grp[flag:x][flag:y]",
                                    "norefresh": true
                                },
                                {
                                    "type": "function",
                                    "function": "function(){\ncore.group=core.getFlag('_')\n}"
                                },
                                {
                                    "type": "insert",
                                    "name": "draw"
                                },
                                {
                                    "type": "playSound",
                                    "name": "broken.mp3"
                                },
                                {
                                    "type": "addValue",
                                    "name": "status:hp",
                                    "value": "status:experience",
                                    "norefresh": true
                                },
                                {
                                    "type": "function",
                                    "function": "function(){\nfor(var i=1;i<=10;i++)for(var j=1;j<=10;j++)if(core.getFlag('grp')[i][j]==core.group)core.status.hero.flags.mp[i][j]=0;core.group=0;\n}"
                                },
                                {
                                    "type": "insert",
                                    "name": "draw"
                                },
                                {
                                    "type": "sleep",
                                    "time": 50
                                },
                                {
                                    "type": "function",
                                    "function": "function(){\ncore.drop()\n}"
                                },
                                {
                                    "type": "insert",
                                    "name": "draw"
                                },
                                {
                                    "type": "sleep",
                                    "time": 50
                                },
                                {
                                    "type": "function",
                                    "function": "function(){\ncore.left()\n}"
                                },
                                {
                                    "type": "insert",
                                    "name": "draw"
                                },
                                {
                                    "type": "sleep",
                                    "time": 50
                                },
                                {
                                    "type": "insert",
                                    "name": "full"
                                },
                                {
                                    "type": "insert",
                                    "name": "draw"
                                }
                            ],
                            "false": [
                                {
                                    "type": "if",
                                    "condition": "flag:_>0",
                                    "true": [
                                        {
                                            "type": "playSound",
                                            "name": "select.mp3"
                                        }
                                    ]
                                }
                            ]
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
            "type": "if",
            "condition": "flag:___==30000",
            "true": [
                {
                    "type": "win",
                    "reason": "30 sec"
                }
            ]
        },
        {
            "type": "if",
            "condition": "flag:___==60000",
            "true": [
                {
                    "type": "win",
                    "reason": "60 sec"
                }
            ]
        },
        {
            "type": "win",
            "reason": "sec"
        }
    ],
    "eachArrive": [],
    "parallelDo": "",
    "events": {},
    "changeFloor": {},
    "afterBattle": {},
    "afterGetItem": {},
    "afterOpenDoor": {},
    "autoEvent": {},
    "cannotMove": {},
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
    "bgmap": [

],
    "fgmap": [

]
}