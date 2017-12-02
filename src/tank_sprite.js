var TankSprite = cc.Sprite.extend({
    label: null,
    rect: null,
    onEnter:function () {
        cc.log("Tank onEnter", this.word);
        this._super();
        this.addTouchEventListenser();
        this.label = new cc.LabelTTF(this.word, "Arial", 12);
        // position the label on the center of the screen
        this.label.x = 0;
        this.label.y = 1;
        // add the label as a child to this layer
        this.addChild(this.label, 5);
        // this.setOpacity(0);


        // this.rect = cc.Sprite.create();
        // this.rect.setTextureRect(cc.Rect(0,0,5,5));
        // this.rect.x = 0;
        // this.rect.y = 1;
        // // this.rect.setPosition(monsterPos->getPos());
        // this.rect.setColor(cc.color('#ff0000'));
        // this.addChild(this.rect,6);

        // this.rectangle = new cc.DrawNode();
        // this.rectangle.drawRect(cc.p(50,50), cc.p(200,300), cc.color(255,0,0,255), 3, cc.color(0,255,0,255));
        // this._sgNode.addChild(this.rectangle,6);

        var dorpAction = cc.MoveTo.create(60, cc.p(this.x,-30));
        // dorpAction.setSpeed(0.1);
        // dorpAction._speed = 0.1;
        // dorpAction.attr({
        //     speed: 0.1
        // });
        cc.log('dorpAction',dorpAction,dorpAction.getSpeed());
        this.runAction(dorpAction);
    },

    onExit:function () {
        // cc.log("Tank onExit");
    },
    word: null,
    addTouchEventListenser:function(){
        this.touchListener = cc.EventListener.create({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            // When "swallow touches" is true, then returning 'true' from the onTouchBegan method will "swallow" the touch event, preventing other listeners from using it.
            swallowTouches: true,
            //onTouchBegan event callback function                      
            onTouchBegan: function (touch, event) { 
                var pos = touch.getLocation();
                var target = event.getCurrentTarget();  
                // TODO: target.removeTouchEventListenser();
                // 
                cc.eventManager.removeListener(this.touchListener,this);
                if ( cc.rectContainsPoint(target.getBoundingBox(),pos)) {
                    cc.log("touched", event,target)
                    return true;
                }
                return false;
            }
        });
        cc.eventManager.addListener(this.touchListener,this);
    }
        

});