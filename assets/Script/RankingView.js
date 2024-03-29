cc.Class({
    extends: cc.Component,
    //ame: "RankingView",
    properties: {
        back: {
            default: null,
            type: cc.Node,
        },
        restart: {
            default: null,
            type: cc.Node,
        },
        home: {
            default: null,
            type: cc.Node,
        },
        rankingScrollView: {
            default: null,
            type: cc.Sprite,
        },
    },
    onLoad: function() {
        if(GlobalGame.access === 0){
            this.home.active = false;
            this.restart.active = false;
        }else if(GlobalGame.access === 1){
            this.back.active = false;
        }
        this.registerInput();
    },
    start: function() {
        
        if (CC_WECHATGAME) {
            //window.wx.showShareMenu({withShareTicket: true});//设置分享按钮，方便获取群id展示群排行榜
            this.tex = new cc.Texture2D();
            window.sharedCanvas.width = 720;
            window.sharedCanvas.height = 1280;
            this.friendFunc();
        }
    },
    friendFunc: function() {
        if (CC_WECHATGAME) {
            // 发消息给子域
            window.wx.postMessage({
                messageType: 1,
                MAIN_MENU_NUM: "x1"
            });
        } else {
            cc.log("获取好友排行榜数据。x1");
        }
    },
    /*
    groupFriendButtonFunc: function (event) {
        if (CC_WECHATGAME) {
            window.wx.shareAppMessage({
                success: (res) => {
                    if (res.shareTickets != undefined && res.shareTickets.length > 0) {
                        window.wx.postMessage({
                            messageType: 5,
                            MAIN_MENU_NUM: "x1",
                            shareTicket: res.shareTickets[0]
                        });
                    }
                }
            });
        } else {
            cc.log("获取群排行榜数据。x1");
        }
    },
    */
    /*
    gameOverButtonFunc: function (event) {
        if (CC_WECHATGAME) {
            window.wx.postMessage({// 发消息给子域
                messageType: 4,
                MAIN_MENU_NUM: "x1"
            });
        } else {
            cc.log("获取横向展示排行榜数据。x1");
        }
    },
    */
    /*
    submitScoreFunc: function(score){
        if (CC_WECHATGAME) {
            window.wx.postMessage({
                messageType: 3,
                MAIN_MENU_NUM: "x1",
                score: score,
            });
        } else {
            cc.log("提交得分: x1 : " + score)
        }
    },
    */
    // 刷新子域的纹理
    _updateSubDomainCanvas: function() {
        if (window.sharedCanvas != undefined) {
            this.tex.initWithElement(window.sharedCanvas);
            this.tex.handleLoadedTexture();
            this.rankingScrollView.spriteFrame = new cc.SpriteFrame(this.tex);
        }
    },
    update: function() {
        this._updateSubDomainCanvas();
    },

    registerInput: function(){
        this.back.on(cc.Node.EventType.TOUCH_START, function (event) {
            cc.director.loadScene('startgame');
        }, this);

        this.home.on(cc.Node.EventType.TOUCH_START, function (event){
            cc.director.loadScene('startgame');
        }, this);

        this.restart.on(cc.Node.EventType.TOUCH_START, function (event){
            cc.director.loadScene('game');
        }, this);
    }
});
