var data_a1e2fb4a_e986_4524_b0da_9b7ba7c0874d = 
{
	"main": {
		"floorIds": [
			"MT0",
			"time",
			"step"
		],
		"images": [
			"bg.jpg",
			"winskin.png"
		],
		"tilesets": [
			"magictower.png"
		],
		"animates": [
			"hand",
			"sword",
			"zone"
		],
		"bgms": [],
		"sounds": [
			"broken.mp3",
			"click.mp3",
			"fire.mp3",
			"gameover.mp3",
			"select.mp3",
			"stageclear.mp3",
			"win.mp3"
		],
		"nameMap": {
			"背景图.jpg": "bg.jpg",
			"背景音乐.mp3": "bgm.mp3"
		},
		"startBackground": "bg.jpg",
		"startLogoStyle": "color: black",
		"levelChoose": [
			[
				"简单",
				"Easy"
			],
			[
				"普通",
				"Normal"
			],
			[
				"困难",
				"Hard"
			],
			[
				"噩梦",
				"Hell"
			]
		],
		"equipName": [
			"武器",
			"盾牌"
		],
		"startBgm": "",
		"statusLeftBackground": "url(project/images/ground.png) repeat",
		"statusTopBackground": "url(project/images/ground.png) repeat",
		"toolsBackground": "url(project/images/ground.png) repeat",
		"borderColor": "#CCCCCC",
		"statusBarColor": "white",
		"hardLabelColor": "red",
		"floorChangingBackground": "black",
		"floorChangingTextColor": "white",
		"font": "Verdana",
		"startButtonsStyle": "background-color: #32369F; opacity: 0.85; color: #FFFFFF; border: #FFFFFF 2px solid; caret-color: #FFD700;"
	},
	"firstData": {
		"title": "消灭星星",
		"name": "popstar",
		"version": "Ver 2.6.5",
		"floorId": "MT0",
		"hero": {
			"name": "阳光",
			"lv": 1,
			"hpmax": 0,
			"hp": 0,
			"manamax": -1,
			"mana": 0,
			"atk": 0,
			"def": 0,
			"mdef": 0,
			"money": 0,
			"experience": 0,
			"equipment": [],
			"items": {
				"keys": {
					"yellowKey": 0,
					"blueKey": 0,
					"redKey": 0
				},
				"constants": {},
				"tools": {},
				"equips": {}
			},
			"loc": {
				"direction": "up",
				"x": 12,
				"y": 0
			},
			"flags": {},
			"steps": 0
		},
		"startCanvas": [
			{
				"type": "comment",
				"text": "在这里可以用事件来自定义绘制标题界面的背景图等"
			},
			{
				"type": "comment",
				"text": "也可以直接切换到其他楼层（比如某个开始剧情楼层）进行操作。"
			},
			{
				"type": "showImage",
				"code": 1,
				"image": "bg.jpg",
				"loc": [
					0,
					0
				],
				"dw": 100,
				"dh": 100,
				"opacity": 1,
				"time": 0
			},
			{
				"type": "while",
				"condition": "1",
				"data": [
					{
						"type": "comment",
						"text": "给用户提供选择项，这里简单的使用了choices事件"
					},
					{
						"type": "comment",
						"text": "也可以贴按钮图然后使用等待操作来完成"
					},
					{
						"type": "choices",
						"choices": [
							{
								"text": "开始游戏",
								"action": [
									{
										"type": "comment",
										"text": "检查bgm状态，下同"
									},
									{
										"type": "function",
										"function": "function(){\ncore.control.checkBgm()\n}"
									},
									{
										"type": "if",
										"condition": "core.flags.startDirectly",
										"true": [
											{
												"type": "comment",
												"text": "直接开始游戏，设置初始化数据"
											},
											{
												"type": "function",
												"function": "function(){\ncore.events.setInitData('')\n}"
											}
										],
										"false": [
											{
												"type": "comment",
												"text": "动态生成难度选择项"
											},
											{
												"type": "function",
												"function": "function(){\nvar choices = [];\nmain.levelChoose.forEach(function (one) {\n\tchoices.push({\"text\": one[0], \"action\": [\n\t\t{\"type\": \"function\", \"function\": \"function() { core.status.hard = '\"+one[1]+\"'; core.events.setInitData('\"+one[1]+\"'); }\"}\n\t]});\n})\ncore.insertAction({\"type\": \"choices\", \"choices\": choices});\n}"
											}
										]
									},
									{
										"type": "hideImage",
										"code": 1,
										"time": 0
									},
									{
										"type": "comment",
										"text": "成功选择难度"
									},
									{
										"type": "break"
									}
								]
							},
							{
								"text": "读取存档",
								"action": [
									{
										"type": "function",
										"function": "function(){\ncore.control.checkBgm()\n}"
									},
									{
										"type": "comment",
										"text": "简单的使用“呼出读档界面”来处理"
									},
									{
										"type": "callLoad"
									}
								]
							},
							{
								"text": "回放录像",
								"action": [
									{
										"type": "function",
										"function": "function(){\ncore.control.checkBgm()\n}"
									},
									{
										"type": "comment",
										"text": "这段代码会弹框选择录像文件"
									},
									{
										"type": "if",
										"condition": "!core.isReplaying()",
										"true": [
											{
												"type": "function",
												"function": "function(){\ncore.chooseReplayFile()\n}"
											}
										],
										"false": []
									}
								]
							}
						]
					}
				]
			},
			{
				"type": "comment",
				"text": "接下来会执行startText中的事件"
			}
		],
		"startText": [
			{
				"type": "function",
				"function": "function(){\ncore.T=0\n}"
			},
			"规则同普通消除星星。每次消除方块后会自动保存。不允许手动保存。限时模式不会自动保存，需要一次性玩到结束。",
			"每次可以选择一个至少有两个方块的同色的四连通块，消除后可得四连通块包含方块数平方的5倍的分数。消除后上面的方块会掉下来。如果有空列则右边的列会自动向左。",
			"红心后面显示当前分数，金币后面显示当前所选连通块的大小，经验后面显示消除当前所选连通块可得的分数。",
			{
				"type": "hideHero"
			},
			{
				"type": "choices",
				"text": "选择模式",
				"choices": [
					{
						"text": "经典",
						"action": [
							"每一关都有一个目标分数。你需要消除方块来增加分数。如果没有方块可消除并且剩余方块数<10则可以得到(2000-20×(剩余方块数的平方))分的奖励分数。如果最终分数达到目标分数则进入下一关否则game over。"
						]
					},
					{
						"text": "30秒",
						"action": [
							{
								"type": "setValue",
								"name": "status:mdef",
								"value": "30000"
							},
							"你需要在30秒时间内通过消除方块获得尽量多的分数。方块会自动填补。十字架后显示剩余时间，单位毫秒。",
							{
								"type": "changeFloor",
								"floorId": "time",
								"time": 0
							}
						]
					},
					{
						"text": "60秒",
						"action": [
							{
								"type": "setValue",
								"name": "status:mdef",
								"value": "60000"
							},
							"你需要在60秒时间内通过消除方块获得尽量多的分数。方块会自动填补。十字架后显示剩余时间，单位毫秒。",
							{
								"type": "changeFloor",
								"floorId": "time",
								"time": 0
							}
						]
					},
					{
						"text": "30步",
						"action": [
							{
								"type": "setValue",
								"name": "status:mdef",
								"value": "30"
							},
							"你需要在30步内通过消除方块获得尽量多的分数。方块会自动填补。十字架后显示剩余步数。",
							{
								"type": "changeFloor",
								"floorId": "step",
								"time": 0
							}
						]
					},
					{
						"text": "60步",
						"action": [
							{
								"type": "setValue",
								"name": "status:mdef",
								"value": "60"
							},
							"你需要在60步内通过消除方块获得尽量多的分数。方块会自动填补。十字架后显示剩余步数。",
							{
								"type": "changeFloor",
								"floorId": "step",
								"time": 0
							}
						]
					}
				]
			}
		],
		"shops": [],
		"levelUp": [
			{
				"need": "0",
				"title": "",
				"action": []
			}
		]
	},
	"values": {
		"lavaDamage": 0,
		"poisonDamage": 0,
		"weakValue": 0,
		"redJewel": 0,
		"blueJewel": 0,
		"greenJewel": 0,
		"redPotion": 0,
		"bluePotion": 0,
		"yellowPotion": 0,
		"greenPotion": 0,
		"breakArmor": 0,
		"counterAttack": 0,
		"purify": 0,
		"hatred": 0,
		"moveSpeed": 100,
		"animateSpeed": 400,
		"floorChangeTime": 0
	},
	"flags": {
		"enableFloor": true,
		"enableName": false,
		"enableLv": false,
		"enableHPMax": false,
		"enableMana": false,
		"enableMDef": true,
		"enableMoney": true,
		"enableExperience": true,
		"enableLevelUp": false,
		"levelUpLeftMode": false,
		"enableKeys": false,
		"enablePZF": false,
		"enableDebuff": false,
		"enableSkill": false,
		"flyNearStair": false,
		"flyRecordPosition": false,
		"pickaxeFourDirections": false,
		"bombFourDirections": false,
		"snowFourDirections": false,
		"bigKeyIsBox": false,
		"steelDoorWithoutKey": false,
		"itemFirstText": false,
		"equipment": false,
		"equipboxButton": false,
		"iconInEquipbox": false,
		"enableAddPoint": false,
		"enableNegativeDamage": false,
		"hatredDecrease": true,
		"betweenAttackCeil": false,
		"betweenAttackMax": false,
		"useLoop": false,
		"startUsingCanvas": false,
		"startDirectly": true,
		"statusCanvas": false,
		"statusCanvasRowsOnMobile": 3,
		"displayEnemyDamage": true,
		"displayCritical": true,
		"displayExtraDamage": true,
		"enableGentleClick": true,
		"potionWhileRouting": false,
		"ignoreChangeFloor": true,
		"canGoDeadZone": false,
		"enableMoveDirectly": true,
		"enableDisabledShop": true,
		"disableShopOnDamage": false,
		"blurFg": false,
		"checkConsole": true
	}
}