editor_blockly = function () {

    var editor_blockly = {};

/////////////////initscript start/////////////////////////////
// do not use String.raw because of highlighting
// Comment tagged templates
// https://marketplace.visualstudio.com/items?itemName=bierner.comment-tagged-templates
    initscript = /* js */`
(function(){
  var getCategory = function(name,custom){
    for(var node of document.getElementById('toolbox').children) {
      if(node.getAttribute('name')==name) return node;
    }
    var node = document.createElement('category');
    node.setAttribute('name',name);
    if(custom)node.setAttribute('custom',custom);
    document.getElementById('toolbox').appendChild(node);
    return node;
  }

  var toolboxObj = {
    '入口方块':[
      MotaActionFunctions.actionParser.parse([
        "欢迎使用事件编辑器",
        "本事件触发一次后会消失",
        {"type": "hide", "time": 500},
      ],'event'),
      MotaActionFunctions.actionParser.parse({
        "condition": "flag:__door__==2",
        "currentFloor": true,
        "priority": 0,
        "delayExecute": false,
        "multiExecute": false,
        "data": [
          {"type": "openDoor", "loc": [10,5]}
        ],
      },'autoEvent'),
      MotaActionBlocks['changeFloor_m'].xmlText(),
      MotaActionFunctions.actionParser.parse([{
        "id": "moneyShop1",
        "name": "贪婪之神", 
        "icon": "blueShop",
        "textInList": "1F金币商店", 
        "use": "money",
        "need": "20+10*times*(times+1)",  
        "text": "勇敢的武士啊，给我\\\${need}金币就可以：", 
        "choices": [ 
          {"text": "生命+800", "effect": "status:hp+=800"},
          {"text": "攻击+4", "effect": "status:atk+=4"},
        ]
      },{
        "id": "itemShop",
        "item": true,
        "textInList": "道具商店",
        "choices": [
          {"id": "yellowKey", "number": 10, "money": 10}
        ]
      },{
        "id": "keyShop1",
        "textInList": "回收钥匙商店",
        "commonEvent": "回收钥匙商店",
        "args": ""
      }],'shop'),
      MotaActionBlocks['afterBattle_m'].xmlText(),
      MotaActionBlocks['afterGetItem_m'].xmlText(),
      MotaActionBlocks['afterOpenDoor_m'].xmlText(),
      MotaActionBlocks['firstArrive_m'].xmlText(),
      MotaActionBlocks['eachArrive_m'].xmlText(),
      MotaActionBlocks['level_m'].xmlText(),
      MotaActionBlocks['commonEvent_m'].xmlText(),
    ],
    '显示文字':[
      MotaActionBlocks['text_0_s'].xmlText(),
      MotaActionBlocks['text_1_s'].xmlText(),
      MotaActionBlocks['comment_s'].xmlText(),
      MotaActionBlocks['autoText_s'].xmlText(),
      MotaActionBlocks['scrollText_s'].xmlText(),
      MotaActionBlocks['setText_s'].xmlText(),
      MotaActionBlocks['showImage_s'].xmlText(),
      MotaActionBlocks['showImage_1_s'].xmlText(),
      MotaActionBlocks['hideImage_s'].xmlText(),
      MotaActionBlocks['showTextImage_s'].xmlText(),
      MotaActionBlocks['moveImage_s'].xmlText(),
      MotaActionBlocks['showGif_0_s'].xmlText(),
      MotaActionBlocks['showGif_1_s'].xmlText(),
      MotaActionBlocks['tip_s'].xmlText(),
      MotaActionBlocks['win_s'].xmlText(),
      MotaActionBlocks['lose_s'].xmlText(),
      MotaActionBlocks['restart_s'].xmlText(),
      MotaActionBlocks['confirm_s'].xmlText(),
      MotaActionBlocks['choices_s'].xmlText([
        '选择剑或者盾','流浪者','man',MotaActionBlocks['choicesContext'].xmlText([
          '剑','','',null,'',MotaActionFunctions.actionParser.parseList([{"type": "openDoor", "loc": [3,3]}]),
          MotaActionBlocks['choicesContext'].xmlText([
            '盾','','',null,'',MotaActionFunctions.actionParser.parseList([{"type": "openDoor", "loc": [9,3]}]),
          ])
        ])
      ]),
    ],
    '数据相关':[
      MotaActionBlocks['addValue_s'].xmlText([
        MotaActionBlocks['idString_1_e'].xmlText(['status','生命']), '', false
      ]),
      MotaActionBlocks['setValue_s'].xmlText([
        MotaActionBlocks['idString_1_e'].xmlText(['status','生命']), '', false
      ]),
      MotaActionBlocks['setEnemy_s'].xmlText(),
      MotaActionBlocks['setFloor_s'].xmlText(),
      MotaActionBlocks['setGlobalAttribute_s'].xmlText(),
      MotaActionBlocks['setGlobalValue_s'].xmlText(),
      MotaActionBlocks['setGlobalFlag_s'].xmlText(),
      MotaActionBlocks['input_s'].xmlText(),
      MotaActionBlocks['input2_s'].xmlText(),
      MotaActionBlocks['update_s'].xmlText(),
      MotaActionBlocks['moveHero_s'].xmlText(),
      MotaActionBlocks['jumpHero_s'].xmlText(),
      MotaActionBlocks['changeFloor_s'].xmlText(),
      MotaActionBlocks['changePos_0_s'].xmlText(),
      MotaActionBlocks['changePos_1_s'].xmlText(),
      MotaActionBlocks['battle_s'].xmlText(),
      MotaActionBlocks['useItem_s'].xmlText(),
      MotaActionBlocks['loadEquip_s'].xmlText(),
      MotaActionBlocks['unloadEquip_s'].xmlText(),
      MotaActionBlocks['openShop_s'].xmlText(),
      MotaActionBlocks['disableShop_s'].xmlText(),
      MotaActionBlocks['setHeroIcon_s'].xmlText(),
      MotaActionBlocks['follow_s'].xmlText(),
      MotaActionBlocks['unfollow_s'].xmlText(),
    ],
    '地图处理':[
      MotaActionBlocks['battle_1_s'].xmlText(),
      MotaActionBlocks['openDoor_s'].xmlText(),
      MotaActionBlocks['closeDoor_s'].xmlText(),
      MotaActionBlocks['show_s'].xmlText(),
      MotaActionBlocks['hide_s'].xmlText(),
      MotaActionBlocks['setBlock_s'].xmlText(),
      MotaActionBlocks['move_s'].xmlText(),
      MotaActionBlocks['jump_s'].xmlText(),
      MotaActionBlocks['showBgFgMap_s'].xmlText(),
      MotaActionBlocks['hideBgFgMap_s'].xmlText(),
      MotaActionBlocks['setBgFgBlock_s'].xmlText(),
      MotaActionBlocks['showFloorImg_s'].xmlText(),
      MotaActionBlocks['hideFloorImg_s'].xmlText(),
    ],
    '事件控制':[
      MotaActionBlocks['if_1_s'].xmlText(),
      MotaActionBlocks['if_s'].xmlText(),
      MotaActionFunctions.actionParser.parseList({"type": "switch", "condition": "判别值", "caseList": [
        {"action": [{"type": "comment", "text": "当判别值是值的场合执行此事件"}]},
        {"action": [], "nobreak": true},
        {"case": "default", "action": [{"type": "comment", "text": "当没有符合的值的场合执行default事件"}]},
      ]}),
      MotaActionBlocks['while_s'].xmlText(),
      MotaActionBlocks['dowhile_s'].xmlText(),
      MotaActionBlocks['break_s'].xmlText(),
      MotaActionBlocks['continue_s'].xmlText(),
      MotaActionBlocks['revisit_s'].xmlText(),
      MotaActionBlocks['exit_s'].xmlText(),
      MotaActionBlocks['trigger_s'].xmlText(),
      MotaActionBlocks['insert_1_s'].xmlText(),
      MotaActionBlocks['insert_2_s'].xmlText(),
    ],
    '特效/声音':[
      MotaActionBlocks['sleep_s'].xmlText(),
      MotaActionBlocks['wait_s'].xmlText(),
      MotaActionBlocks['waitAsync_s'].xmlText(),
      MotaActionBlocks['vibrate_s'].xmlText(),
      MotaActionBlocks['animate_s'].xmlText(),
      MotaActionBlocks['setViewport_s'].xmlText(),
      MotaActionBlocks['moveViewport_s'].xmlText(),
      MotaActionBlocks['showStatusBar_s'].xmlText(),
      MotaActionBlocks['hideStatusBar_s'].xmlText(),
      MotaActionBlocks['showHero_s'].xmlText(),
      MotaActionBlocks['hideHero_s'].xmlText(),
      MotaActionBlocks['setCurtain_0_s'].xmlText(),
      MotaActionBlocks['setCurtain_1_s'].xmlText(),
      MotaActionBlocks['screenFlash_s'].xmlText(),
      MotaActionBlocks['setWeather_s'].xmlText(),
      MotaActionBlocks['playBgm_s'].xmlText(),
      MotaActionBlocks['pauseBgm_s'].xmlText(),
      MotaActionBlocks['resumeBgm_s'].xmlText(),
      MotaActionBlocks['loadBgm_s'].xmlText(),
      MotaActionBlocks['freeBgm_s'].xmlText(),
      MotaActionBlocks['playSound_s'].xmlText(),
      MotaActionBlocks['stopSound_s'].xmlText(),
      MotaActionBlocks['setVolume_s'].xmlText(),
      MotaActionBlocks['callBook_s'].xmlText(),
      MotaActionBlocks['callSave_s'].xmlText(),
      MotaActionBlocks['autoSave_s'].xmlText(),
      MotaActionBlocks['callLoad_s'].xmlText(),
    ],
    'UI绘制':[
      MotaActionBlocks['previewUI_s'].xmlText(),
      MotaActionBlocks['clearMap_s'].xmlText(),
      MotaActionBlocks['clearMap_1_s'].xmlText(),
      MotaActionBlocks['setAttribute_s'].xmlText(),
      MotaActionBlocks['fillText_s'].xmlText(),
      MotaActionBlocks['fillBoldText_s'].xmlText(),
      MotaActionBlocks['drawTextContent_s'].xmlText(),
      MotaActionBlocks['fillRect_s'].xmlText(),
      MotaActionBlocks['strokeRect_s'].xmlText(),
      MotaActionBlocks['drawLine_s'].xmlText(),
      MotaActionBlocks['drawArrow_s'].xmlText(),
      MotaActionBlocks['fillPolygon_s'].xmlText(),
      MotaActionBlocks['strokePolygon_s'].xmlText(),
      MotaActionBlocks['fillCircle_s'].xmlText(),
      MotaActionBlocks['strokeCircle_s'].xmlText(),
      MotaActionBlocks['drawImage_s'].xmlText(),
      MotaActionBlocks['drawImage_1_s'].xmlText(),
      MotaActionBlocks['drawIcon_s'].xmlText(),
      MotaActionBlocks['drawBackground_s'].xmlText(),
      MotaActionBlocks['drawSelector_s'].xmlText(),
      MotaActionBlocks['drawSelector_1_s'].xmlText(),
    ],
    '原生脚本':[
      MotaActionBlocks['function_s'].xmlText(),
      MotaActionBlocks['unknown_s'].xmlText(),
    ],
    '值块':[
      MotaActionBlocks['addValue_s'].xmlText([
        MotaActionBlocks['idString_1_e'].xmlText(['status','生命']), '', false
      ]),
      MotaActionBlocks['setValue_s'].xmlText([
        MotaActionBlocks['idString_1_e'].xmlText(['status','生命']), '', false
      ]),
      MotaActionBlocks['expression_arithmetic_0'].xmlText(),
      MotaActionBlocks['evFlag_e'].xmlText(),
      MotaActionBlocks['negate_e'].xmlText(),
      MotaActionBlocks['bool_e'].xmlText(),
      MotaActionBlocks['idString_e'].xmlText(),
      MotaActionBlocks['idString_1_e'].xmlText(),
      MotaActionBlocks['idString_2_e'].xmlText(),
      MotaActionBlocks['idString_3_e'].xmlText(),
      MotaActionBlocks['idString_4_e'].xmlText(),
      MotaActionBlocks['idString_5_e'].xmlText(),
      MotaActionBlocks['idString_6_e'].xmlText(),
      MotaActionBlocks['evalString_e'].xmlText(),
    ],
    '常见事件模板':[
      '<label text="检测音乐如果没有开启则系统提示开启"></label>',
      MotaActionFunctions.actionParser.parseList({"type": "if", "condition": "!core.musicStatus.bgmStatus",
        "true": [
          "\\t[系统提示]你当前音乐处于关闭状态，本塔开音乐游戏效果更佳"
        ],
        "false": []
      }),
      '<label text="商店购买属性/钥匙"></label>',
      MotaActionFunctions.actionParser.parse([
        {"type": "choices", "text": "\\t[老人,man]少年，你需要钥匙吗？\\n我这里有大把的！",
        "choices": [
            {"text": "黄钥匙（\\\${9+flag:shop_times}金币）", "color": [255,255,0,1], "action": [
                {"type": "if", "condition": "status:money>=9+flag:shop_times",
                    "true": [
                        {"type": "addValue", "name": "status:money", "value": "-(9+flag:shop_times)"},
                        {"type": "addValue", "name": "item:yellowKey", "value": "1"},
                    ],
                    "false": [
                        "\\t[老人,man]你的金钱不足！",
                        {"type": "revisit"}
                    ]
                }
            ]},
            {"text": "蓝钥匙（\\\${18+2*flag:shop_times}金币）", "color": [0,0,255,1], "action": [
            ]},
            {"text": "离开", "action": [
                {"type": "exit"}
            ]}
        ]
    },
    {"type": "addValue", "name": "flag:shop_times", "value": "1"},
    {"type": "revisit"}
      ], 'event'),  
      '<label text="战前剧情"></label>',
      MotaActionFunctions.actionParser.parse({ 
        "trigger": "action", 
        "displayDamage": true, 
        "data": [ 
          ' ... 战前剧情',
          {"type": "battle", "id": "greenSlime"},
          ' ... 战后剧情；请注意上面的强制战斗不会使怪物消失',
          '需要下一句来调用{"type": "hide"}来隐藏事件',
          {"type": "hide"},
        ]
      },'event'),
      '<label text="打怪掉落道具"></label>',
      MotaActionFunctions.actionParser.parse([
        '怪物变成了黄钥匙(黄钥匙idnum是21)',
        '打怪变成可对话的NPC: https://ckcz123.github.io/mota-js/#/event?id=%e6%89%93%e6%80%aa%e5%8f%98%e6%88%90%e5%8f%af%e5%af%b9%e8%af%9d%e7%9a%84npc%ef%bc%88%e6%80%aa%e7%89%a9-gtnpc%ef%bc%89',
        {"type": "setBlock", "number": 21}
      ],'afterBattle'),
      '<label text="打怪开门"></label>',
      MotaActionFunctions.actionParser.parse([
        {"type": "addValue", "name": "flag:__door__", "value": "1"},
        {"type": "if", "condition": "flag:__door__==2", 
          "true": [
            {"type": "openDoor", "loc": [10,5]}
          ],
          "false": [] 
        },
      ],'afterBattle'),
      '<label text="杀死魔龙后隐藏其余图块"></label>',
      MotaActionFunctions.actionParser.parse([
        {"type": "function", "function": "function(){var x=core.status.event.data.x,y=core.status.event.data.y;if(core.isset(x)&&core.isset(y)){core.insertAction([{type:'hide',loc:[[x-1,y-2],[x,y-2],[x+1,y-2],[x-1,y-1],[x,y-1],[x+1,y-1],[x-1,y],[x+1,y]]}]);}}"},
      ],'afterBattle'),
      '<label text="获得圣水后变成墙"></label>',
      MotaActionFunctions.actionParser.parse({
        "trigger": "action", 
        "noPass": true, 
        "data": [
          {"type": "if", "condition": "flag:hasSuperPotion", 
            "true": [], 
            "false": [
              {"type":"setValue", "name":"status:hp", "value":"status:hp*2"}, 
              {"type":"setBlock", "number": 1}, 
              {"type":"setValue", "name":"flag:hasSuperPotion", "value": "true"} 
            ]
          }
        ]
      },'event'),
    ],
    '最近使用事件':[
      '<label text="此处只是占位符,实际定义在editor_blockly.searchBlockCategoryCallback中"></label>',
    ]
  }
  var toolboxgap = '<sep gap="5"></sep>'
  //xml_text = MotaActionFunctions.actionParser.parse(obj,type||'event')
  //MotaActionBlocks['idString_e'].xmlText()

  for (var name in toolboxObj){
    var custom = null;
    if(name=='最近使用事件')custom='searchBlockCategory';
    getCategory(name,custom).innerHTML = toolboxObj[name].join(toolboxgap);
  }

var blocklyArea = document.getElementById('blocklyArea');
var blocklyDiv = document.getElementById('blocklyDiv');
var workspace = Blockly.inject(blocklyDiv,{
  media: '_server/blockly/media/',
  toolbox: document.getElementById('toolbox'),
  zoom:{
    controls: true,
    wheel: false,//滚轮改为上下(shift:左右)翻滚
    startScale: 1.0,
    maxScale: 3,
    minScale: 0.3,
    scaleSpeed: 1.08
  },
  trashcan: false,
});

editor_blockly.searchBlockCategoryCallback = function(workspace) {
  var xmlList = [];
  var labels = editor_blockly.searchBlock();
  for (var i = 0; i < labels.length; i++) {
    var blockText = '<xml>' +
        MotaActionBlocks[labels[i]].xmlText() +
        '</xml>';
    var block = Blockly.Xml.textToDom(blockText).firstChild;
    block.setAttribute("gap", 5);
    xmlList.push(block);
  }
  return xmlList;
};

workspace.registerToolboxCategoryCallback(
  'searchBlockCategory', editor_blockly.searchBlockCategoryCallback);
 
var onresize = function(e) {
  blocklyDiv.style.width = blocklyArea.offsetWidth + 'px';
  blocklyDiv.style.height = blocklyArea.offsetHeight + 'px';
  Blockly.svgResize(workspace);
};
if(typeof editor !== "undefined" && !editor.isMobile)window.addEventListener('resize', onresize, false);
onresize();
//Blockly.svgResize(workspace);

//Blockly.bindEventWithChecks_(workspace.svgGroup_,"wheel",workspace,function(e){});
document.getElementById('blocklyDiv').onmousewheel = function(e){
  //console.log(e);
  e.preventDefault();
  var hvScroll = e.shiftKey?'hScroll':'vScroll';
  var mousewheelOffsetValue=20/380*workspace.scrollbar[hvScroll].handleLength_*3;
  workspace.scrollbar[hvScroll].handlePosition_+=( ((e.deltaY||0)+(e.detail||0)) >0?mousewheelOffsetValue:-mousewheelOffsetValue);
  workspace.scrollbar[hvScroll].onScroll_();
  workspace.setScale(workspace.scale);
}

var doubleClickCheck=[[0,'abc']];
function omitedcheckUpdateFunction(event) {
  if(event.type==='create'){
    editor_blockly.addIntoLastUsedType(event.blockId);
  }
  if(event.type==='ui'){
    var newClick = [new Date().getTime(),event.blockId];
    var lastClick = doubleClickCheck.shift();
    doubleClickCheck.push(newClick);
    if(newClick[0]-lastClick[0]<500){
      if(newClick[1]===lastClick[1]){
        editor_blockly.doubleClickBlock(newClick[1]);
      }
    }
  }
  if(editor_blockly.workspace.topBlocks_.length>=2){
    codeAreaHL.setValue('入口方块只能有一个');
    return;
  }
  var eventType = document.getElementById('entryType').value;
  if(editor_blockly.workspace.topBlocks_.length==1){
    var blockType = editor_blockly.workspace.topBlocks_[0].type;
    if(blockType!==eventType+'_m'){
      codeAreaHL.setValue('入口方块类型错误');
      return;
    }
  }
  try {
    var code = Blockly.JavaScript.workspaceToCode(workspace).replace(/\\\\(i|c|d|e)/g, '\\\\\\\\$1');
    codeAreaHL.setValue(code);
  } catch (error) {
    codeAreaHL.setValue(String(error));
    if (error instanceof OmitedError){
    var blockName = error.blockName;
    var varName = error.varName;
    var block = error.block;
    }
    // console.log(error);
  }
  }

  workspace.addChangeListener(omitedcheckUpdateFunction);

  workspace.addChangeListener(Blockly.Events.disableOrphans);

  editor_blockly.workspace = workspace;

  MotaActionFunctions.workspace = function(){
    return editor_blockly.workspace;
  }

  // 因为在editor_blockly.parse里已经HTML转义过一次了,所以这里要覆盖掉以避免在注释中出现&lt;等
  MotaActionFunctions.xmlText = function (ruleName,inputs,isShadow,comment) {
    var rule = MotaActionBlocks[ruleName];
    var blocktext = isShadow?'shadow':'block';
    var xmlText = [];
    xmlText.push('<'+blocktext+' type="'+ruleName+'">');
    if(!inputs)inputs=[];
    for (var ii=0,inputType;inputType=rule.argsType[ii];ii++) {
      var input = inputs[ii];
      var _input = '';
      var noinput = (input===null || input===undefined);
      if(noinput && inputType==='field') continue;
      if(noinput) input = '';
      if(inputType!=='field') {
        var subList = false;
        var subrulename = rule.args[ii];
        subrulename=subrulename.split('_').slice(0,-1).join('_');
        var subrule = MotaActionBlocks[subrulename];
        if (subrule instanceof Array) {
          subrulename=subrule[subrule.length-1];
          subrule = MotaActionBlocks[subrulename];
          subList = true;
        }
        _input = subrule.xmlText([],true);
        if(noinput && !subList && !isShadow) {
          //无输入的默认行为是: 如果语句块的备选方块只有一个,直接代入方块
          input = subrule.xmlText();
        }
      }
      xmlText.push('<'+inputType+' name="'+rule.args[ii]+'">');
      xmlText.push(_input+input);
      xmlText.push('</'+inputType+'>');
    }
    if(comment){
      xmlText.push('<comment>');
      xmlText.push(comment);
      xmlText.push('</comment>');
    }
    var next = inputs[rule.args.length];
    if (next) {//next
      xmlText.push('<next>');
      xmlText.push(next);
      xmlText.push('</next>');
    }
    xmlText.push('</'+blocktext+'>');
    return xmlText.join('');
  }
})();
`;
/////////////////initscript end  /////////////////////////////

    editor.uivalues.disableBlocklyReplace = core.getLocalStorage("disableBlocklyReplace", false);
    var replaceCheckbox = document.getElementById('blocklyReplace');
    replaceCheckbox.checked = !editor.uivalues.disableBlocklyReplace;

    editor_blockly.triggerReplace = function () {
        editor.uivalues.disableBlocklyReplace = !replaceCheckbox.checked;
        core.setLocalStorage("disableBlocklyReplace", !replaceCheckbox.checked);
        if (MotaActionFunctions) MotaActionFunctions.disableReplace = !replaceCheckbox.checked;
        alert("已" + (replaceCheckbox.checked ? "开启" : "关闭") + "中文变量名替换！\n关闭并重开事件编辑器以生效。");
    }

    var input_ = '';
    editor_blockly.runOne = function () {
        //var printf = console.log;
        //var printf = function(){};
        var grammerFile = input_;
        converter = new Converter().init();
        converter.generBlocks(grammerFile);
        //printf(converter.blocks);
        converter.renderGrammerName();
        //converter.generToolbox();
        converter.generMainFile();
        //printf(converter.mainFile.join(''));
        //console.log(converter);


        var script = document.createElement('script');
        //var initscript = document.getElementById('initscript').innerText;
        script.innerHTML = converter.mainFile[5] + initscript;
        document.body.appendChild(script);
    }
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (xhr.readyState != 4) return;
        if (xhr.status != 200) {
            alert("图块描述文件加载失败, 请在'启动服务.exe'中打开编辑器");
            return;
        }
        input_ = xhr.responseText;
        editor_blockly.runOne();
        MotaActionFunctions.disableReplace = editor.uivalues.disableBlocklyReplace;
    }
    xhr.open('GET', '_server/MotaAction.g4', true);
    xhr.send(null);

    codeAreaHL = CodeMirror.fromTextArea(document.getElementById("codeArea"), {
        lineNumbers: true,
        matchBrackets: true,
        lineWrapping: true,
        continueComments: "Enter",
        extraKeys: {"Ctrl-Q": "toggleComment"}
    });

    editor_blockly.showXML = function () {
        var xml = Blockly.Xml.workspaceToDom(editor_blockly.workspace);
        var xml_text = Blockly.Xml.domToPrettyText(xml);
        console.log(xml_text);
        var xml_text = Blockly.Xml.domToText(xml);
        console.log(xml_text);
        console.log(xml);
    }

    editor_blockly.runCode = function () {
        // Generate JavaScript code and run it.
        window.LoopTrap = 1000;
        Blockly.JavaScript.INFINITE_LOOP_TRAP =
            'if (--window.LoopTrap == 0) throw "Infinite loop.";\n';
        var code = Blockly.JavaScript.workspaceToCode(editor_blockly.workspace);
        Blockly.JavaScript.INFINITE_LOOP_TRAP = null;
        try {
            eval('obj=' + code);
            console.log(obj);
        } catch (e) {
            alert(e);
        }
    }

    editor_blockly.parse = function () {
        MotaActionFunctions.parse(
            eval('obj=' + codeAreaHL.getValue().replace(/[<>&]/g, function (c) {
                return {'<': '&lt;', '>': '&gt;', '&': '&amp;'}[c];
            }).replace(/\\(r|f|i|c|d|e)/g,'\\\\$1')),
            document.getElementById('entryType').value
        );
    }

    editor_blockly.id = '';

    editor_blockly.import = function (id_, args) {
        var thisTr = document.getElementById(id_);
        if (!thisTr) return false;
        var input = thisTr.children[2].children[0].children[0];
        var field = thisTr.children[0].getAttribute('title');
        var type = args.type;
        if (!type) return false;
        editor_blockly.id = id_;
        codeAreaHL.setValue(input.value);
        document.getElementById('entryType').value = type;
        editor_blockly.parse();
        editor_blockly.show();
        return true;
    }

    var blocklyWidgetDiv = document.getElementsByClassName('blocklyWidgetDiv');
    editor_blockly.show = function () {
        if (typeof(selectBox) !== typeof(undefined)) selectBox.isSelected(false);
        document.getElementById('left6').style = '';
        for (var ii = 0, node; node = blocklyWidgetDiv[ii]; ii++) {
            node.style.zIndex = 201;
            node.style.opacity = '';
        }
    }
    editor_blockly.hide = function () {
        document.getElementById('left6').style = 'z-index:-1;opacity: 0;';
        for (var ii = 0, node; node = blocklyWidgetDiv[ii]; ii++) {
            node.style.zIndex = -1;
            node.style.opacity = 0;
        }
    }

    editor_blockly.cancel = function () {
        editor_blockly.id = '';
        editor_blockly.hide();
    }

    editor_blockly.confirm = function () {
        if (!editor_blockly.id) {
            editor_blockly.id = '';
            return;
        }
        if(editor_blockly.workspace.topBlocks_.length>=2){
          codeAreaHL.setValue('入口方块只能有一个');
          return;
        }
        var eventType = document.getElementById('entryType').value;
        if(editor_blockly.workspace.topBlocks_.length==1){
          var blockType = editor_blockly.workspace.topBlocks_[0].type;
          if(blockType!==eventType+'_m'){
            codeAreaHL.setValue('入口方块类型错误');
            return;
          }
        }
        var setvalue = function (value) {
            var thisTr = document.getElementById(editor_blockly.id);
            editor_blockly.id = '';
            var input = thisTr.children[2].children[0].children[0];
            input.value = value;
            editor_blockly.hide();
            input.onchange();
        }
        if (codeAreaHL.getValue() === '') {
            eventType==='shop'?setvalue('[]'):setvalue('null');
            return;
        }
        var code = Blockly.JavaScript.workspaceToCode(editor_blockly.workspace);
        code = code.replace(/\\(i|c|d|e)/g, '\\\\$1');
        eval('var obj=' + code);
        if (this.checkAsync(obj) && confirm("警告！存在不等待执行完毕的事件但却没有用【等待所有异步事件处理完毕】来等待" +
            "它们执行完毕，这样可能会导致录像检测系统出问题。\n你要返回修改么？")) return;
        setvalue(JSON.stringify(obj));
    }

    // 检查"不等待处理完毕"
    editor_blockly.checkAsync = function (obj) {
        if (!(obj instanceof Array)) return false;
        var hasAsync = false;
        for (var i = 0; i < obj.length; ++i) {
            var one = obj[i];
            if (one.type == 'if' && (this.checkAsync(one['true']) || this.checkAsync(one['false'])))
                return true;
            if ((one.type == 'while' || one.type == 'dowhile') && this.checkAsync(one.data))
                return true;
            if (one.type == 'if' && (this.checkAsync(one.yes) || this.checkAsync(one.no)))
                return true;
            if (one.type == 'choices') {
                var list = one.choices;
                if (list instanceof Array) {
                    for (var j = 0; j < list.length; j++) {
                        if (this.checkAsync(list[j].action)) return true;
                    }
                }
            }
            if (one.type == 'switch') {
                var list = one.caseList;
                if (list instanceof Array) {
                    for (var j = 0; j < list.length; j++) {
                        if (this.checkAsync(list[j].action)) return true;
                    }
                }
            }
            if (one.async && one.type != 'animate') hasAsync = true;
            if (one.type == 'waitAsync') hasAsync = false;
        }
        return hasAsync;
    }

    var previewBlock = function (b) {
        var types = [
            "previewUI_s", "clearMap_s", "clearMap_1_s", "setAttribute_s", "fillText_s",
            "fillBoldText_s", "fillRect_s", "strokeRect_s", "drawLine_s",
            "drawArrow_s", "fillPolygon_s", "strokePolygon_s", "fillCircle_s", "strokeCircle_s",
            "drawImage_s", "drawImage_1_s", "drawIcon_s", "drawBackground_s", "drawSelector_s", "drawSelector_1_s"
        ];
        if (b && types.indexOf(b.type)>=0) {
            try {
                var code = "[" + Blockly.JavaScript.blockToCode(b).replace(/\\(i|c|d|e)/g, '\\\\$1') + "]";
                eval("var obj="+code);
                // console.log(obj);
                if (obj.length > 0 && b.type.startsWith(obj[0].type)) {
                    if (b.type == 'previewUI_s')
                        editor.uievent.previewUI(obj[0].action);
                    else editor.uievent.previewUI([obj[0]]);
                }
            } catch (e) {main.log(e);}
            return true;
        }
        return false;
    }

    editor_blockly.doubleClickBlock = function (blockId) {
        var b = editor_blockly.workspace.getBlockById(blockId);

        if (previewBlock(b)) return;

        if (b && b.type in selectPointBlocks) { // selectPoint
            this.selectPoint();
            return;
        }

        var textStringDict = {
            'text_0_s': 'EvalString_0',
            'text_1_s': 'EvalString_2',
            'autoText_s': 'EvalString_2',
            'scrollText_s': 'EvalString_0',
            'comment_s': 'EvalString_0',
            'choices_s': 'EvalString_0',
            'showTextImage_s': 'EvalString_0',
            'function_s': 'RawEvalString_0',
            'shopsub': 'EvalString_3',
            'confirm_s': 'EvalString_0',
            'drawTextContent_s': 'EvalString_0',
        }
        var f = b ? textStringDict[b.type] : null;
        if (f) {
            var value = b.getFieldValue(f);
            //多行编辑
            editor_multi.multiLineEdit(value, b, f, {'lint': f === 'RawEvalString_0'}, function (newvalue, b, f) {
                if (textStringDict[b.type] !== 'RawEvalString_0') {
                }
                b.setFieldValue(newvalue.split('\n').join('\\n'), f);
            });
        }
    }

    editor_blockly.lastUsedType=[
        'text_0_s',
        'comment_s',
        'show_s',
        'hide_s',
        'addValue_s',
        'if_s',
        'battle_s',
        'openDoor_s',
        'choices_s',
        'setText_s',
        'exit_s',
        'revisit_s',
        'sleep_s',
        'setBlock_s',
        'insert_1_s'
    ]; // 最常用的15个图块
    editor_blockly.lastUsedTypeNum=15;

    editor_blockly.addIntoLastUsedType=function(blockId) {
        var b = editor_blockly.workspace.getBlockById(blockId);
        if(!b)return;
        var blockType = b.type;
        if(!blockType || blockType.indexOf("_s")!==blockType.length-2 || blockType==='pass_s')return;
        editor_blockly.lastUsedType = editor_blockly.lastUsedType.filter(function (v) {return v!==blockType;});
        if (editor_blockly.lastUsedType.length >= editor_blockly.lastUsedTypeNum)
            editor_blockly.lastUsedType.pop();
        editor_blockly.lastUsedType.unshift(blockType);

        document.getElementById("searchBlock").value='';
    }

    // Index from 1 - 9
    editor_blockly.openToolbox = function(index) {
        if (index < 0) index += editor_blockly.workspace.toolbox_.tree_.children_.length;
        editor_blockly.workspace.toolbox_.tree_.setSelectedItem(editor_blockly.workspace.toolbox_.tree_.children_[index]);
    }
    editor_blockly.reopenToolbox = function(index) {
        if (index < 0) index += editor_blockly.workspace.toolbox_.tree_.children_.length;
        editor_blockly.workspace.toolbox_.tree_.setSelectedItem(editor_blockly.workspace.toolbox_.tree_.children_[index]);
        editor_blockly.workspace.getFlyout_().show(editor_blockly.workspace.toolbox_.tree_.children_[index].blocks);
    }

    editor_blockly.closeToolbox = function() {
        editor_blockly.workspace.toolbox_.clearSelection();
    }

    var searchInput = document.getElementById("searchBlock");
    searchInput.onfocus = function () {
        editor_blockly.reopenToolbox(-1);
    }

    searchInput.oninput = function () {
        editor_blockly.reopenToolbox(-1);
    }

    editor_blockly.searchBlock = function (value) {
        if (value == null) value = searchInput.value;
        value = value.toLowerCase();
        if (value == '') return editor_blockly.lastUsedType;
        var results = [];
        for (var name in MotaActionBlocks) {
            if (typeof name !== 'string' || name.indexOf("_s") !== name.length-2) continue;
            var block = MotaActionBlocks[name];
            if(block && block.json) {
                if ((block.json.type||"").toLowerCase().indexOf(value)>=0
                    || (block.json.message0||"").toLowerCase().indexOf(value)>=0
                    || (block.json.tooltip||"").toLowerCase().indexOf(value)>=0) {
                    results.push(name);
                    if (results.length>=editor_blockly.lastUsedTypeNum)
                        break;
                }
            }
        }

        return results.length == 0 ? editor_blockly.lastUsedType : results;
    }

    // ------ select point ------

    // id: [x, y, floorId, forceFloor]
    var selectPointBlocks = {
        "changeFloor_m": ["Number_0", "Number_1", "IdString_0", true],
        "jumpHero_s": ["PosString_0", "PosString_1"],
        "changeFloor_s": ["PosString_0", "PosString_1", "IdString_0", true],
        "changePos_0_s": ["PosString_0", "PosString_1"],
        "battle_1_s": ["PosString_0", "PosString_1"],
        "openDoor_s": ["PosString_0", "PosString_1", "IdString_0"],
        "closeDoor_s": ["PosString_0", "PosString_1"],
        "show_s": ["EvalString_0", "EvalString_1", "IdString_0"],
        "hide_s": ["EvalString_0", "EvalString_1", "IdString_0"],
        "setBlock_s": ["EvalString_1", "EvalString_2", "IdString_0"],
        "move_s": ["PosString_0", "PosString_1"],
        "jump_s": ["PosString_2", "PosString_3"], // 跳跃暂时只考虑终点
        "showBgFgMap_s": ["EvalString_0", "EvalString_1", "IdString_0"],
        "hideBgFgMap_s": ["EvalString_0", "EvalString_1", "IdString_0"],
        "setBgFgBlock_s": ["EvalString_1", "EvalString_2", "IdString_0"],
        "showFloorImg_s": ["EvalString_0", "EvalString_1", "IdString_0"],
        "hideFloorImg_s": ["EvalString_0", "EvalString_1", "IdString_0"],
        "trigger_s": ["PosString_0", "PosString_1"],
        "insert_2_s": ["PosString_0", "PosString_1", "IdString_0"],
        "animate_s": ["EvalString_0", "EvalString_0"],
        "setViewport_s": ["PosString_0", "PosString_1"]
    }

    editor_blockly.selectPoint = function () {
        var block = Blockly.selected, arr = null;
        var floorId = editor.currentFloorId, pos = editor.pos, x = pos.x, y = pos.y;
        if (block != null && block.type in selectPointBlocks) {
            arr = selectPointBlocks[block.type];
            var xv = parseInt(block.getFieldValue(arr[0])), yv = parseInt(block.getFieldValue(arr[1]));
            if (block.type == 'animate_s') {
                var v = block.getFieldValue(arr[0]).split(",");
                xv = parseInt(v[0]); yv = parseInt(v[1]);
            }
            if (!isNaN(xv)) x = xv;
            if (!isNaN(yv)) y = yv;
            if (arr[2] != null) floorId = block.getFieldValue(arr[2]) || floorId;
        }
        editor.uievent.selectPoint(floorId, x, y, arr && arr[2] == null, function (fv, xv, yv) {
            if (!arr) return;
            if (arr[2] != null) {
                if (fv != editor.currentFloorId) block.setFieldValue(fv, arr[2]);
                else block.setFieldValue(arr[3] ? fv : "", arr[2]);
            }
            if (block.type == 'animate_s') {
                block.setFieldValue(xv+","+yv, arr[0]);
            }
            else {
                block.setFieldValue(xv+"", arr[0]);
                block.setFieldValue(yv+"", arr[1]);
            }
            if (block.type == 'changeFloor_m') {
                block.setFieldValue("floorId", "Floor_List_0");
                block.setFieldValue("loc", "Stair_List_0");
            }
        });
    }

    editor_blockly.getAutoCompletions = function (content) {
        // --- content为当前框中输入内容；将返回一个列表，为后续所有可补全内容

        // 检查 status:xxx，item:xxx和flag:xxx
        var index = Math.max(content.lastIndexOf(":"), content.lastIndexOf("："));
        if (index >= 0) {
            var ch = content.charAt(index);
            var before = content.substring(0, index), token = content.substring(index+1);
            if (/^[a-zA-Z0-9_\u4E00-\u9FCC]*$/.test(token)) {
                if (before.endsWith("状态") || (ch == ':' && before.endsWith("status"))) {
                    var list = Object.keys(core.status.hero);
                    if (before.endsWith("状态") && MotaActionFunctions) {
                        list = MotaActionFunctions.pattern.replaceStatusList.map(function (v) {
                            return v[1];
                        }).concat(list);
                    }
                    return list.filter(function (one) {
                        return one != token && one.startsWith(token);
                    }).sort();
                }
                else if (before.endsWith("物品") || (ch == ':' && before.endsWith("item"))) {
                    var list = Object.keys(core.material.items);
                    if (before.endsWith("物品") && MotaActionFunctions) {
                        list = MotaActionFunctions.pattern.replaceItemList.map(function (v) {
                            return v[1];
                        }).concat(list);
                    }
                    return list.filter(function (one) {
                        return one != token && one.startsWith(token);
                    }).sort();
                }
                else if (before.endsWith("变量") || (ch == ':' && before.endsWith("flag"))) {
                    return Object.keys(editor.used_flags || {}).filter(function (one) {
                        return one != token && one.startsWith(token);
                    }).sort();
                } else if (before.endsWith("怪物") || (ch == ':' && before.endsWith("enemy"))) {
                    return Object.keys(core.material.enemys).filter(function (one) {
                        return one != token && one.startsWith(token);
                    })
                } else {
                    var index2 = Math.max(content.lastIndexOf(":", index-1), content.lastIndexOf("：", index-1));
                    var ch2 = content.charAt(index2);
                    if (index2 >= 0) {
                        before = content.substring(0, index2);
                        if (before.endsWith("怪物") || (ch == ':' && ch2 == ':' && before.endsWith("enemy"))) {
                            var list = ["name", "hp", "atk", "def", "money", "experience", "point", "special"];
                            if (before.endsWith("怪物") && MotaActionFunctions) {
                                list = MotaActionFunctions.pattern.replaceEnemyList.map(function (v) {
                                    return v[1];
                                }).concat(list);
                            }
                            return list.filter(function (one) {
                                return one != token && one.startsWith(token);
                            })
                        }
                    }

                }
            }
        }

        // 提供 core.xxx 的补全
        index = content.lastIndexOf("core.");
        if (index >= 0) {
            var s = content.substring(index + 5);
            if (/^[\w.]*$/.test(s)) {
                var tokens = s.split(".");
                var now = core, prefix = tokens[tokens.length - 1];
                for (var i = 0; i < tokens.length - 1; ++i) {
                    now = now[tokens[i]];
                    if (now == null) break;
                }
                if (now != null) {
                    var candidates = [];
                    for (var i in now) {
                        candidates.push(i);
                    }
                    return candidates.filter(function (one) {
                        return one != prefix && one.startsWith(prefix);
                    }).sort();
                }
            }
        }

        // 提供 flags.xxx 补全
        index = content.lastIndexOf("flags.");
        if (index >= 0) {
            var token = content.substring(index+6);
            return Object.keys(editor.used_flags || {}).filter(function (one) {
                return one != token && one.startsWith(token)
                    && /^[a-zA-Z_]\w*$/.test(one);
            }).sort();
        }

        return [];
    }

    editor_blockly.completeItems = [];
    return editor_blockly;
}

// --- modify Blockly

Blockly.FieldColour.prototype.createWidget_ = function() {
    Blockly.WidgetDiv.hide();

    // console.log('here')
    var self=this;
    var pb=self.sourceBlock_
    var args = MotaActionBlocks[pb.type].args
    var targetf=args[args.indexOf(self.name)-1]

    var getValue=function(){
        // return self.getValue() // css颜色
        var f = pb.getFieldValue(targetf);
        if (/^(25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d),(25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d),(25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)(,0(\.\d+)?|,1)?$/.test(f)) {
            return f;
        }
        return "";
        // 也可以用 pb.getFieldValue(targetf) 获得颜色块左边的域的内容
    }

    var setValue=function(newValue){ // css颜色
        self.setValue(newValue)
        var c=new Colors();
        c.setColor(newValue)
        var rgbatext = [c.colors.webSmart.r,c.colors.webSmart.g,c.colors.webSmart.b,c.colors.alpha].join(",");
        pb.setFieldValue(rgbatext, targetf) // 放在颜色块左边的域中
    }

    setTimeout(function () {
        document.getElementById("colorPicker").value = getValue();
        window.jsColorPicker.confirm = setValue;
        // 设置位置
        triggerColorPicker(Blockly.WidgetDiv.DIV.style.left, Blockly.WidgetDiv.DIV.style.top);
    });

    return document.createElement('table');
};

Blockly.FieldTextInput.prototype.showInlineEditor_ = function(quietInput) {
    Blockly.WidgetDiv.show(this, this.sourceBlock_.RTL, this.widgetDispose_());
    var div = Blockly.WidgetDiv.DIV;
    // Create the input.
    var htmlInput =
        goog.dom.createDom(goog.dom.TagName.INPUT, 'blocklyHtmlInput');
    htmlInput.setAttribute('spellcheck', this.spellcheck_);
    var fontSize =
        (Blockly.FieldTextInput.FONTSIZE * this.workspace_.scale) + 'pt';
    div.style.fontSize = fontSize;
    htmlInput.style.fontSize = fontSize;

    Blockly.FieldTextInput.htmlInput_ = htmlInput;
    div.appendChild(htmlInput);

    htmlInput.value = htmlInput.defaultValue = this.text_;
    htmlInput.oldValue_ = null;

    // console.log('here')
    var self=this;
    var pb=self.sourceBlock_
    var args = MotaActionBlocks[pb.type].args
    var targetf=args[args.indexOf(self.name)+1]

    // ------ colour

    if(targetf && targetf.slice(0,7)==='Colour_'){
        var inputDom = htmlInput;
        // var getValue=function(){ // 获得自己的字符串
        //     return pb.getFieldValue(self.name);
        // }
        var setValue = function(newValue){ // 设置右边颜色块的css颜色
            pb.setFieldValue(newValue, targetf)
        }
        // 给inputDom绑事件
        inputDom.oninput=function(){
            var value=inputDom.value
            if(/[0-9 ]+,[0-9 ]+,[0-9 ]+(,[0-9. ]+)?/.test(value)){
                setValue('rgba('+value+')')
            }
        }
    }
    else {

        htmlInput.onkeydown = function (e) {
            if (e.keyCode == 13 && awesomplete.opened && awesomplete.selected) {
                e.stopPropagation();
                e.stopImmediatePropagation();
                e.preventDefault();
                awesomplete.select();
                return false;
            }
        }

        // --- awesomplete
        var awesomplete = new Awesomplete(htmlInput, {
            minChars: pb.type == "idString_3_e" ? 1 : 2,
            maxItems: 12,
            autoFirst: true,
            replace: function (text) {
                text = text.toString();
                var value = this.input.value, index = this.input.selectionEnd;
                if (index == null) index = value.length;
                if (index < awesomplete.prefix.length) index = awesomplete.prefix.length;
                var str = value.substring(0, index - awesomplete.prefix.length) + text + value.substring(index);
                this.input.value = str;
                pb.setFieldValue(str, self.name);
                index += text.length - awesomplete.prefix.length;
                this.input.setSelectionRange(index, index);

                editor_blockly.completeItems = editor_blockly.completeItems.filter(function (x) {
                    return x != text;
                });
                editor_blockly.completeItems.unshift(text);
            },
            filter: function () {return true;},
            item: function (text, input) {
                var li = document.createElement("li");
                li.setAttribute("role", "option");
                li.setAttribute("aria-selected", "false");
                input = awesomplete.prefix.trim();
                if (input != "") text = text.replace(new RegExp("^"+input, "i"), "<mark>$&</mark>");
                li.innerHTML = text;
                return li;
            },
            sort: function (a, b) {
                a = a.toString(); b = b.toString();
                var ia = editor_blockly.completeItems.indexOf(a), ib = editor_blockly.completeItems.indexOf(b);
                if (ia < 0) ia = editor_blockly.completeItems.length;
                if (ib < 0) ib = editor_blockly.completeItems.length;
                if (ia != ib) return ia - ib;
                if (a.length != b.length) return a.length - b.length;
                return a < b ? -1 : 1;
            }
        });

        htmlInput.oninput = function () {
            var value = htmlInput.value, index = htmlInput.selectionEnd;
            if (index == null) index = value.length;
            value = value.substring(0, index);
            // cal prefix
            awesomplete.prefix = "";
            for (var i = index - 1; i>=0; i--) {
                var c = value.charAt(i);
                if (!/^[a-zA-Z0-9_\u4E00-\u9FCC]$/.test(c)) {
                    awesomplete.prefix = value.substring(i+1);
                    break;
                }
            }

            var list = editor_blockly.getAutoCompletions(value);
            if (pb.type == "idString_3_e") {
                list = list.concat(Object.keys(core.material.enemys).filter(function (one) {
                    return one != value && one.startsWith(value);
                }));
                list.sort();
            }

            awesomplete.list = list;
            awesomplete.ul.style.marginLeft = getCaretCoordinates(htmlInput, htmlInput.selectionStart).left -
                htmlInput.scrollLeft - 20 + "px";
            awesomplete.evaluate();
        }

        awesomplete.container.style.width = "100%";

        window.awesomplete = awesomplete;
    }

    if (!quietInput) {
        htmlInput.focus();
        htmlInput.select();
    }
    this.validate_();
    this.resizeEditor_();

    this.bindEvents_(htmlInput);
};