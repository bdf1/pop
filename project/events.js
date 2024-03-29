var events_c12a15a8_c380_4b28_8144_256cba95f760 = 
{
	"commonEvent": {
		"加点事件": [
			{
				"type": "comment",
				"text": "通过传参，flag:arg1 表示当前应该的加点数值"
			},
			{
				"type": "choices",
				"choices": [
					{
						"text": "攻击+${1*flag:arg1}",
						"action": [
							{
								"type": "setValue",
								"name": "status:atk",
								"value": "status:atk+1*flag:arg1"
							}
						]
					},
					{
						"text": "防御+${2*flag:arg1}",
						"action": [
							{
								"type": "setValue",
								"name": "status:def",
								"value": "status:def+2*flag:arg1"
							}
						]
					},
					{
						"text": "生命+${200*flag:arg1}",
						"action": [
							{
								"type": "setValue",
								"name": "status:hp",
								"value": "status:hp+200*flag:arg1"
							}
						]
					}
				]
			}
		],
		"毒衰咒处理": [
			{
				"type": "comment",
				"text": "获得毒衰咒效果，flag:arg1 为要获得的类型"
			},
			{
				"type": "switch",
				"condition": "flag:arg1",
				"caseList": [
					{
						"case": "0",
						"action": [
							{
								"type": "comment",
								"text": "获得毒效果"
							},
							{
								"type": "if",
								"condition": "!flag:poison",
								"true": [
									{
										"type": "setValue",
										"name": "flag:poison",
										"value": "true"
									}
								],
								"false": []
							}
						]
					},
					{
						"case": "1",
						"action": [
							{
								"type": "comment",
								"text": "获得衰效果"
							},
							{
								"type": "if",
								"condition": "!flag:weak",
								"true": [
									{
										"type": "setValue",
										"name": "flag:weak",
										"value": "true"
									},
									{
										"type": "if",
										"condition": "core.values.weakValue>=1",
										"true": [
											{
												"type": "comment",
												"text": ">=1：直接扣数值"
											},
											{
												"type": "addValue",
												"name": "status:atk",
												"value": "-core.values.weakValue"
											},
											{
												"type": "addValue",
												"name": "status:def",
												"value": "-core.values.weakValue"
											}
										],
										"false": [
											{
												"type": "comment",
												"text": "<1：扣比例"
											},
											{
												"type": "function",
												"function": "function(){\ncore.addBuff('atk', -core.values.weakValue);\n}"
											},
											{
												"type": "function",
												"function": "function(){\ncore.addBuff('def', -core.values.weakValue);\n}"
											}
										]
									}
								],
								"false": []
							}
						]
					},
					{
						"case": "2",
						"action": [
							{
								"type": "comment",
								"text": "获得咒效果"
							},
							{
								"type": "if",
								"condition": "!flag:curse",
								"true": [
									{
										"type": "setValue",
										"name": "flag:curse",
										"value": "true"
									}
								],
								"false": []
							}
						]
					}
				]
			}
		],
		"滑冰事件": [
			{
				"type": "comment",
				"text": "公共事件：滑冰事件"
			},
			{
				"type": "if",
				"condition": "core.canMoveHero()",
				"true": [
					{
						"type": "comment",
						"text": "检测下一个点是否可通行"
					},
					{
						"type": "setValue",
						"name": "flag:nx",
						"value": "core.nextX()"
					},
					{
						"type": "setValue",
						"name": "flag:ny",
						"value": "core.nextY()"
					},
					{
						"type": "if",
						"condition": "core.noPass(flag:nx, flag:ny)",
						"true": [
							{
								"type": "comment",
								"text": "不可通行，触发下一个点的事件"
							},
							{
								"type": "trigger",
								"loc": [
									"flag:nx",
									"flag:ny"
								]
							}
						],
						"false": [
							{
								"type": "comment",
								"text": "可通行，先移动到下个点，然后检查阻激夹域，并尝试触发该点事件"
							},
							{
								"type": "moveHero",
								"time": 80,
								"steps": [
									"forward"
								]
							},
							{
								"type": "function",
								"function": "function(){\ncore.checkBlock();\n}"
							},
							{
								"type": "comment",
								"text": "【触发事件】如果该点存在事件则会立刻结束当前事件"
							},
							{
								"type": "trigger",
								"loc": [
									"flag:nx",
									"flag:ny"
								]
							},
							{
								"type": "comment",
								"text": "如果该点不存在事件，则继续检测该点是否是滑冰点"
							},
							{
								"type": "if",
								"condition": "core.getBgNumber() == 167",
								"true": [
									{
										"type": "function",
										"function": "function(){\ncore.insertAction(\"滑冰事件\",null,null,null,true)\n}"
									}
								],
								"false": []
							}
						]
					}
				],
				"false": []
			}
		],
		"回收钥匙商店": [
			{
				"type": "comment",
				"text": "此事件在全局商店中被引用了(全局商店keyShop1)"
			},
			{
				"type": "comment",
				"text": "解除引用前勿删除此事件"
			},
			{
				"type": "comment",
				"text": "玩家在快捷列表（V键）中可以使用本公共事件"
			},
			{
				"type": "while",
				"condition": "1",
				"data": [
					{
						"type": "choices",
						"text": "\t[商人,woman]你有多余的钥匙想要出售吗？",
						"choices": [
							{
								"text": "黄钥匙（10金币）",
								"color": [
									255,
									255,
									0,
									1
								],
								"action": [
									{
										"type": "if",
										"condition": "item:yellowKey >= 1",
										"true": [
											{
												"type": "addValue",
												"name": "item:yellowKey",
												"value": "-1"
											},
											{
												"type": "addValue",
												"name": "status:money",
												"value": "10"
											}
										],
										"false": [
											"\t[商人,woman]你没有黄钥匙！"
										]
									}
								]
							},
							{
								"text": "蓝钥匙（50金币）",
								"color": [
									0,
									0,
									255,
									1
								],
								"action": [
									{
										"type": "if",
										"condition": "item:blueKey >= 1",
										"true": [
											{
												"type": "addValue",
												"name": "item:blueKey",
												"value": "-1"
											},
											{
												"type": "addValue",
												"name": "status:money",
												"value": "50"
											}
										],
										"false": [
											"\t[商人,woman]你没有蓝钥匙！"
										]
									}
								]
							},
							{
								"text": "离开",
								"action": [
									{
										"type": "exit"
									}
								]
							}
						]
					}
				]
			}
		],
		"draw": [
			{
				"type": "function",
				"function": "function(){\ncore.fs();for(var i=1;i<=10;i++)for(var j=1;j<=10;j++)core.setBlock((core.getFlag('mp')[i][j]?core.getFlag('mp')[i][j]+110:0)+(core.group&&core.group==core.getFlag('grp')[i][j]?5:0),i-1,13-j);core.setStatus('money',core.getFlag('v')[core.group]);core.setStatus('experience',core.getFlag('v')[core.group]*core.getFlag('v')[core.group]*5);core.updateStatusBar();\n}"
			}
		],
		"new": [
			{
				"type": "function",
				"function": "function(){\nvar t=[[0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0]];for(var i=1;i<=10;i++)for(var j=1;j<=10;j++)t[i][j]=core.rand(5)+1;core.setFlag('mp',t)\n}"
			}
		],
		"main": [
			{
				"type": "insert",
				"name": "new"
			},
			{
				"type": "insert",
				"name": "draw"
			},
			{
				"type": "setValue",
				"name": "flag:__",
				"value": "0",
				"norefresh": true
			},
			{
				"type": "while",
				"condition": "core.fs()",
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
								"condition": "core.group==flag:grp[flag:x][flag:y]&&core.group>0",
								"true": [
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
										"type": "if",
										"condition": "status:hp>=status:mdef&&flag:__==0",
										"true": [
											{
												"type": "setValue",
												"name": "flag:__",
												"value": "1",
												"norefresh": true
											},
											{
												"type": "playSound",
												"name": "stageclear.mp3"
											}
										]
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
										"time": 100
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
										"time": 100
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
										"type": "autoSave",
										"nohint": true
									}
								],
								"false": [
									{
										"type": "setValue",
										"name": "flag:_",
										"value": "flag:grp[flag:x][flag:y]",
										"norefresh": true
									},
									{
										"type": "if",
										"condition": "flag:_>0",
										"true": [
											{
												"type": "playSound",
												"name": "select.mp3"
											}
										]
									},
									{
										"type": "function",
										"function": "function(){\ncore.group=core.getFlag('_')\n}"
									},
									{
										"type": "insert",
										"name": "draw"
									}
								]
							}
						]
					}
				]
			},
			{
				"type": "function",
				"function": "function(){\nvar cnt=0,bo=0;for(var i=1;i<=10;i++)for(var j=1;j<=10;j++)if(core.status.hero.flags.mp[i][j])cnt++;if(cnt<10)bo=2000-20*cnt*cnt;core.status.hero.hp+=bo;core.updateStatusBar();core.insertAction(\"剩余\"+cnt+\"个方块，奖励\"+bo+\"分\");\n}"
			}
		],
		"full": [
			{
				"type": "function",
				"function": "function(){\nfor(var i=1;i<=10;i++)for(var j=1;j<=10;j++)if(!core.status.hero.flags.mp[i][j])core.status.hero.flags.mp[i][j]=core.rand(5)+1;\n}"
			}
		]
	}
}