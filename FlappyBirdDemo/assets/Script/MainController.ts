// Learn TypeScript:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Label)
    label: cc.Label = null;

    @property(cc.Sprite)
    bird0: cc.Sprite = null ;

    @property(cc.Sprite)
    bird1: cc.Sprite = null ;

    @property(cc.Sprite)
    bird2: cc.Sprite = null ;

    @property(cc.Sprite)
    bird3: cc.Sprite = null;

    @property(cc.Node)
    birdParent: cc.Node = null ;

    @property(cc.Node)
    bg0: cc.Node = null ;

    @property(cc.Node)
    bg1: cc.Node = null ;

    @property(cc.Node)
    pipeParent0 : cc.Node = null ;

    @property(cc.Node)
    pipeParent1 : cc.Node = null ;

    @property(cc.Node)
    pipeParent2: cc.Node = null ;

    @property(cc.Label)
    lbScore: cc.Label = null ;

    @property(cc.Node)
    nodeGameOver: cc.Node = null ;

    @property(cc.Button)
    btnStart: cc.Button = null ;

    @property
    text: string = 'hello';



    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    time: number = 0 ;  //距离上次切换显示的小鸟  流逝的时间
    speed: number = 0 ;
    score: number = 0 ;
    isGameStart: boolean = false ;


    start () {
        let pipeStartOffsetX: number = 200 ;
        let spaceX = (288+52)/3 ;
        this.pipeParent0.x = pipeStartOffsetX + spaceX * 0;
        this.pipeParent1.x = pipeStartOffsetX + spaceX * 1;
        this.pipeParent2.x = pipeStartOffsetX + spaceX * 2;
    }

    update (dt:number) {
        let timeTmp = this.time  + dt ;
        this.time = timeTmp ;

        if(this.time> 0.5){  //如果距离上次切换的时间 超过了0.5s 切换图片
            if(this.bird0.node.active){
                this.bird0.node.active = false ;
                this.bird1.node.active = true ;
            }else if(this.bird1.node.active){
                this.bird1.node.active = false ;
                this.bird2.node.active = true ;
            }else if(this.bird2.node.active){
                this.bird2.node.active = false ;
                this.bird3.node.active = true ;
            }else if(this.bird3.node.active){
                this.bird3.node.active = false ;
                this.bird0.node.active = true ;
            }
            this.time = 0 ;
        }

        // this.birdParent.y = this.birdParent.y - 1;

        // let bg0X = this.bg0.x ;
        // this.bg0.x = this.bg0.x - 1 ;
        //
        // let bg1X = this.bg1.x;
        // this.bg1.x = this.bg1.x - 1 ;
        //
        // if(bg0X<-288){
        //     this.bg0.x = this.bg0.x + 288*2;
        // }
        // if(bg1X<-288){
        //     this.bg1.x = this.bg1.x + 288*2;
        // }

        if(this.isGameStart == false){
            return ;
        }

        this.speed = this.speed - 0.05;
        this.birdParent.y = this.birdParent.y + this.speed ;
        this.birdParent.rotation = -this.speed * 10 ;

        this.moveBg(this.bg0);
        this.moveBg(this.bg1);
        this.movePipe(this.pipeParent0);
        this.movePipe(this.pipeParent1);
        this.movePipe(this.pipeParent2);

        this.checkCollision(this.birdParent,this.pipeParent0);
        this.checkCollision(this.birdParent,this.pipeParent2);
        this.checkCollision(this.birdParent,this.pipeParent0);
    }

    moveBg(bg:cc.Node){
        bg.x = bg.x - 1 ;
        if(bg.x<-288){
            bg.x = bg.x + 288* 2 ;
        }
    }

    movePipe(pipe: cc.Node){
        pipe.x = pipe.x -3 ;
        if(pipe.x<(-144-26)){
            pipe.x = pipe.x + 288 +52 ;

            pipe.y = 50-(Math.random() * 50) ;

            if(this.isGameStart){
                this.score = this.score + 1 ;
                this.lbScore.string = this.score.toString();
                console.log(this.lbScore.string);
            }

        }
    }

    onButtonClick(){
        this.speed =1.5;
    }

    checkCollision(bird:cc.Node,pipe:cc.Node){
        //小鸟的最右边小于了碰撞物的最左边
        if(bird.x + 17 <pipe.x - 26){
            return ;
        }
        if(bird.x - 17 > pipe.x +26){
            return ;
        }
        if((bird.y+12<pipe.y + 50)&&(bird.y-12>pipe.y-50)){

            return ;
        }
        this.gameOver();
    }

    onBtnStartClick(){
        this.isGameStart  = true ;
        this.nodeGameOver.active = false ;
        this.btnStart.node.active = false;
        // console.log(this.nodeGameOver.active );
        // console.log(11);

        this.resetGame();
    }
    gameOver(){
        this.isGameStart = true ;
        this.nodeGameOver.active = true ;
        this.btnStart.node.active = true ;
    }

    resetGame(){
        this.nodeGameOver.active = false ;
        this.btnStart.node.active = false ;
        this.birdParent.x = -104 ;
        this.birdParent.y = 50;
        this.speed = 0 ;
        this.score = 0 ;
        this.lbScore.string = this.score.toString();

        let pipeStartOffsetX: number = 200 ;
        let spaceX = (288+52)/3 ;
        this.pipeParent0.x = pipeStartOffsetX + spaceX * 0;
        this.pipeParent1.x = pipeStartOffsetX + spaceX * 1;
        this.pipeParent2.x = pipeStartOffsetX + spaceX * 2;

    }
}

