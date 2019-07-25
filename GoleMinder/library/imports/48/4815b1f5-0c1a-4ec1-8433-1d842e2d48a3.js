"use strict";
cc._RF.push(module, '4815bH1DBpOwYQzHYQuLUij', 'pig');
// script/pig.js

'use strict';

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
    speed: 0,
    value: 0,
    hooked: false,
    theta: 0,
    moveSpeed: 3,
    toRight: true
  },
  onCollisionEnter: function onCollisionEnter(other, self) {
    // 碰撞则播放爆炸动画
    if (other.node.group === 'hook' && !other.node.getComponent('hook').occupied) {
      this.hook = other.node.getComponent('hook');
      this.hook.moveSpeed = this.speed;
      this.hook.down = false;
      this.theta = other.node.getRotation() * (Math.PI / 180);
      this.node.x = other.node.x - (40 + this.node.height / 2) * Math.sin(this.theta);
      this.node.y = other.node.y - (40 + this.node.height / 2) * Math.cos(this.theta);
      this.hooked = true;
      this.hook.occupied = true;
      this.hook.item = this.node;
    } else if (other.node.group === 'items') {
      if (!this.hooked) {
        if (this.toRight) {
          this.toRight = false;
          this.animationComponent.stop('pigRunR');
          this.animationComponent.play('pigRun');
        } else {
          this.toRight = true;
          this.animationComponent.stop('pigRun');
          this.animationComponent.play('pigRunR');
        }
      }
    }
  },
  // LIFE-CYCLE CALLBACKS:

  // onLoad () {},

  start: function start() {
    this.canvas = cc.find('Canvas').getComponent('game');
    this.animationComponent = this.getComponent(cc.Animation);

    var num = Math.random();
    if (num > 0.5) {
      this.toRight = true;
      this.animationComponent.play('pigRunR');
    } else {
      this.toRight = false;
      this.animationComponent.play('pigRun');
    }
  },
  update: function update(dt) {
    if (!this.hooked) {
      if (this.toRight) {
        this.node.x += this.moveSpeed;
        if (this.node.x > 440) {
          this.toRight = false;
          this.animationComponent.stop('pigRunR');
          this.animationComponent.play('pigRun');
        }
      } else {
        this.node.x -= this.moveSpeed;
        if (this.node.x < -440) {
          this.toRight = true;
          this.animationComponent.stop('pigRun');
          this.animationComponent.play('pigRunR');
        }
      }
    } else {
      if (this.hook.occupied) {
        this.node.x += this.speed * Math.sin(this.theta);
        this.node.y += this.speed * Math.cos(this.theta);
      } else {
        this.canvas.add1.string = '+' + this.value;
        this.canvas.add1.getComponent('label').play = true;
        this.canvas.money1 += this.value;
        this.node.destroy();
      }
    }
  }
  // update (dt) {},

});

cc._RF.pop();