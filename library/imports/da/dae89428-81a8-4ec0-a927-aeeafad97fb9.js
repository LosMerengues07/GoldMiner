"use strict";
cc._RF.push(module, 'dae89QogahOwKknrur62X+5', 'start');
// script/start.js

"use strict";

// Learn cc.Class:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] https://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        draw: cc.Graphics,
        player1: cc.Node,
        base: cc.Node,
        hook: cc.Node
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad: function onLoad() {
        cc.director.getCollisionManager().enabledDebugDraw = false;
        cc.director.getCollisionManager().enabled = true;
    },
    update: function update(dt) {
        this.draw.clear();
        var startPos = this.base.convertToWorldSpaceAR(cc.v2(0, 1));
        var endPos = this.hook.convertToWorldSpaceAR(cc.v2(-0.1, -25.3));
        this.draw.lineWidth = 4.5;
        this.draw.moveTo(startPos.x, startPos.y);
        this.draw.lineTo(endPos.x, endPos.y);
        this.draw.stroke();
    }
});

cc._RF.pop();