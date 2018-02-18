// cc.AudioEngine.getInstance().init("mp3,ogg,wav");

var res = {
    HelloWorld_png : "res/HelloWorld.png",
    gradient_png : "res/gradient.png",
    grid_png : "res/grid.png",
    oppressor_png : "res/oppressor.png",
    mine_png : "res/mine.png",
    
    collins_1_josn : "res/collins_1.json",
    hit_ogg : "res/hit.ogg",
    endure_ogg : "res/endure.ogg",
    plasma_ogg : "res/plasma.ogg",
    target_ogg : "res/target.ogg",
    // {type: 'sound', src: 'res/hit.ogg'}

};

var g_resources = [];
for (var i in res) {
    g_resources.push(res[i]);
}
