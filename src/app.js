
var HelloWorldLayer = cc.Layer.extend({
    sprite:null,
    tanks:[],
    timeoutLabel: null,
    words: [],
    current_tank: null,
    ctor:function () {
        //////////////////////////////
        // 1. super init first
        this._super();


        // this.words = JSON.parse(res.collins_1_josn);
        this.words = ["zoology","zodiac","diagram","used","astrologer","astrology","second-hand","cast-off","outcast","unfashionable","antiquated","obsolete","extinct","archaic","disused","out","of","date","vent","aperture","duct","emit","forceful","persuasive","emphatic","categorical","insistent","pronounced","resounding","unequivocal","unmistakable","saying","maxim","motto","unambiguous","resonant","ringing","intended","conspicuous","blatant","salient","illustrious","eminent","high-ranking","brazen","flagrant","glaring","ostentatious","overt","pretentious","brash","flamboyant","flashy","gaudy","disapprove","deplore","censure","immoral","indecent","filthy","improper","pornographic","vulgar","humorous","comical","playful","merry","mischievous","spirited","animated","ebullient","puppet","pawn","mouthpiece","even","horizontal","unbroken","uninterrupted","matching","placid","well-balanced","reciprocate","serene","tranquil","sedate","undisturbed","happening","occurrence","manifestation","dignified","stately","lofty","majestic","regal","graceful","pleasing","tasteful","refined","cultivated","cultured","polished","adept","skilful","superlative","glossy","glazed","silky","sleek","dreamy","glaze","pottery","covered","terracotta","enamel","gloss","lacquer","varnish","oily","greasy","slippery","grease","icy","unsafe","devious","crafty","cunning","dishonest","evasive","deceptive","oblique","roundabout","directly","plainly","point-blank","downright","touching","emotive","poignant","stirring","unqualified","unfit","incapable","incompetent","unprepared","unlimited","limitless","unrestricted","untold","unimaginable","unthinkable","innumerable","myriad"];
        cc.log('words:', this.words);

        this.tanks = [];
        /////////////////////////////
        // 2. add a menu item with "X" image, which is clicked to quit the program
        //    you may modify it.
        // ask the window size
        var size = cc.winSize;

        /////////////////////////////
        // 3. add your codes below...
        // add a label shows "Hello World"
        // create and initialize a label
        var helloLabel = new cc.LabelTTF("Ztype", "Arial", 38);
        // position the label on the center of the screen
        helloLabel.x = size.width / 2;
        helloLabel.y = size.height / 2 + 200;
        // add the label as a child to this layer
        this.addChild(helloLabel, 5);

        // add "HelloWorld" splash screen"
        this.sprite0 = new cc.Sprite(res.gradient_png);
        this.sprite0.attr({
            x: size.width / 2,
            y: size.height / 2
        });
        this.addChild(this.sprite0, 0);

        // add "HelloWorld" splash screen"
        this.sprite1 = new cc.Sprite(res.grid_png);
        this.sprite1.attr({
            x: size.width / 2,
            y: size.height / 2
        });
        this.addChild(this.sprite1, 0);

        // var startItem = new cc.MenuItemImage(
        //     res.Start_N_png,
        //     res.Start_S_png,
        //     function () {
        //         cc.log("Menu is clicked!");
        //     }, this);
        // startItem.attr({
        //     x: size.width/2,
        //     y: size.height/2,
        //     anchorX: 0.5,
        //     anchorY: 0.5
        // });

        // var menu = new cc.Menu(); // new cc.Menu(startItem);
        // menu.x = 0;
        // menu.y = 0;
        // menu.
        // this.addChild(menu, 1);

        this.addSushi();
        // this.schedule(this.update, 10,16*1024,10);
        this.scoreLabel = new cc.LabelTTF("score:0", "Arial", 20);
        this.scoreLabel.attr({
            x:size.width / 2 + 100,
            y:size.height - 20
        });
        this.addChild(this.scoreLabel, 5);
    
        // timeout 60
        this.timeoutLabel = cc.LabelTTF.create("" + this.timeout, "Arial", 30);
        this.timeoutLabel.x = 20;
        this.timeoutLabel.y = size.height - 20;
        this.addChild(this.timeoutLabel, 5);
        this.schedule(this.timer,1,this.timeout,1);
        this.addKeyboardListenser();
        this.update();
        return true;
    },
    addScore:function(){
        this.score +=1;
        this.scoreLabel.setString("score:" + this.score);
    },
    addSushi: function(){
        // var sushi = new cc.Sprite(res.oppressor_png);
        var sushi = new TankSprite(res.mine_png);
        var word = this.words[Math.floor((this.words.length - 1)*cc.random0To1())]
        sushi.word = word;
        var size = cc.winSize;

        var x = sushi.width/2+size.width/2*cc.random0To1();
        sushi.attr({
            x: x,
            y:size.height - 30
        });

       
        this.addChild(sushi,5);
        this.tanks.push(sushi);
    },
    removeSushi : function() {
        //移除到屏幕底部的sushi
        for (var i = 0; i < this.tanks.length; i++) {
            // cc.log("removeSushi.........",this.tanks[i].y);
            if(0 >= this.tanks[i].y) {
                cc.log("==============remove:",i,this.tanks[i].word);
                this.tanks[i].removeFromParent();
                this.tanks[i] = undefined;
                this.tanks.splice(i,1);
                if (this.current_tank == this.tanks[i]) this.current_tank = undefined;
                i= i-1;
            }
        }
    },
    update : function() {
        this.addSushi();
        this.addSushi();
        this.addSushi();
        this.addSushi();
        
        this.removeSushi();
    },
    timer : function() {
        
            if (this.timeout == 0) {
                //cc.log('游戏结束');
                var gameOver = new cc.LayerColor(cc.color(225,225,225,100));
                var size = cc.winSize;
                var titleLabel = new cc.LabelTTF("Game Over", "Arial", 38);
                titleLabel.attr({
                    x:size.width / 2 ,
                    y:size.height / 2
                });
                gameOver.addChild(titleLabel, 5);
                var TryAgainItem = new cc.MenuItemFont(
                        "Try Again",
                        function () {
                            cc.log("Menu is clicked!");
                            var transition= cc.TransitionFade(1, new PlayScene(),cc.color(255,255,255,255));
                            cc.director.runScene(transition);
                        }, this);
                TryAgainItem.attr({
                    x: size.width/2,
                    y: size.height / 2 - 60,
                    anchorX: 0.5,
                    anchorY: 0.5
                });
        
                var menu = new cc.Menu(TryAgainItem);
                menu.x = 0;
                menu.y = 0;
                gameOver.addChild(menu, 1);
                this.getParent().addChild(gameOver);
        
                this.unschedule(this.update);
                this.unschedule(this.timer);
                return;
            }
        
            this.timeout -=1;
            this.timeoutLabel.setString("" + this.timeout);
        
        },
        addKeyboardListenser:function(){
            var tanks = this.tanks;
            var that = this;
            this.keyboardListener = cc.EventListener.create({
                event: cc.EventListener.KEYBOARD,
                // When "swallow touches" is true, then returning 'true' from the onTouchBegan method will "swallow" the touch event, preventing other listeners from using it.
                swallowTouches: true,
                //onTouchBegan event callback function                      
                // onTouchBegan: function (touch, event) { 
                //     var pos = touch.getLocation();
                //     var target = event.getCurrentTarget();  
                //     // TODO: target.removeTouchEventListenser();
                //     // 
                //     cc.eventManager.removeListener(this.touchListener,this);
                //     if ( cc.rectContainsPoint(target.getBoundingBox(),pos)) {
                //         cc.log("touched", event,target)
                //         return true;
                //     }
                //     return false;
                // }
                onKeyPressed:  function(keyCode, event){
                    var target = event.getCurrentTarget();
                    var lower_case_letter = String.fromCharCode(keyCode).toLowerCase();
                    if (keyCode == 189 || keyCode == 173) lower_case_letter = '-';
                    cc.log('key pressed', keyCode,lower_case_letter);
                    
                    if (!this.current_tank){
                        for (var i = 0; i < tanks.length; i++) {
                            // cc.log("removeSushi.........",this.tanks[i].y);
                            var temp_tank = tanks[i];
                            cc.log("temp_tank.........",temp_tank.word, temp_tank.word[0],temp_tank.word[0] == lower_case_letter);

                            if (temp_tank.word[0] == lower_case_letter) {
                                temp_tank.current = true;
                                this.current_tank = temp_tank;
                            }
                            // if(0 >= this.tanks[i].y) {
                            //     cc.log("==============remove:",i,this.tanks[i].word);
                            //     this.tanks[i].removeFromParent();
                            //     this.tanks[i] = undefined;
                            //     this.tanks.splice(i,1);
                            //     i= i-1;
                            // }
                        }
                    }
                    if (this.current_tank) {
                        var temp_letters = this.current_tank.word.split('');
                        
                        var first_letter = temp_letters.shift();
                        if (!first_letter){
                            // this.current_tank = null;
                            for (var i = 0; i < tanks.length; i++) {

                                if(this.current_tank == tanks[i]) {
                                    cc.log("==============remove:",i,tanks[i].word);
                                    tanks[i].removeFromParent();
                                    tanks[i] = undefined;
                                    that.tanks.splice(i,1);
                                    this.current_tank = undefined;
                                    i= i-1;
                                }
                            }
                            that.addSushi();

                        } else {

                            if (temp_letters.length <= 0 ){
                                for (var i = 0; i < tanks.length; i++) {

                                    if(this.current_tank == tanks[i]) {
                                        cc.log("==============remove:",i,tanks[i].word);
                                        tanks[i].removeFromParent();
                                        tanks[i] = undefined;
                                        that.tanks.splice(i,1);
                                        this.current_tank = undefined;
                                        i= i-1;
                                    }
                                }
                                that.addSushi();
                            } else {
                                cc.log('temp_letters:', temp_letters);
                                cc.log('first_letter:', first_letter);
                                cc.log('lower_case_letter:', lower_case_letter);
                                cc.log('lower_case_letter == first_letter:', lower_case_letter == first_letter);

                                var will_word = temp_letters.join('');
                                if (lower_case_letter == first_letter){
                                    this.current_tank.word = will_word;
                                    this.current_tank.zIndex = 6;
                                    this.current_tank.label.setFontFillColor(cc.color("#ffff00"));
                                    this.current_tank.label.setFontSize(14);
                                    this.current_tank.label.setString(will_word);

                                }
                            }




                        }
            
                    }
                    
                    //通过判断keyCode来确定用户按下了哪个键
                    // label.setString("Key " + keyCode.toString() + " was pressed!");
                },
                onKeyReleased: function(keyCode, event){
                    var target = event.getCurrentTarget();
                    cc.log('key released', keyCode.toString());
                    // label.setString("Key " + keyCode.toString() + " was released!");
                }
            });
            cc.eventManager.addListener(this.keyboardListener,this);
        }
});

var HelloWorldScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new HelloWorldLayer();
        this.addChild(layer);
    }
});

