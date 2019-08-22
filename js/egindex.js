
window.onload = function ( ) {

    class Game {
        constructor(screenClassName,pauseButton,key,lifeValue,integralValue,alertEle,ScoreValue,cover,btn) {
            this.screen = document.querySelector(screenClassName);
            this.pauseButton = document.querySelector(pauseButton);
            this.keyEle = document.querySelector(key);
            this.letters = [];
            this.lifeValue = document.querySelector(lifeValue);
            this.integralValue = document.querySelector(integralValue)
            this.alertEle = document.querySelector(alertEle)
            this.ScoreValue = document.querySelector(ScoreValue)
            this.cover = document.querySelector(cover);
            this.btn = document.querySelector(btn);

        }

        makeWord(num=4) {
            for (let i=0;i<num;i++) {
                let div = document.createElement("div");
                div.classList.add("letter");
                let letter = Math.floor(Math.random() *5+1);
                while (this.isRepeat(letter)){
                    letter = Math.floor(Math.random() * 5+1);
                }
                let left = Math.random() * 4;
                while (this.isOverlap(left)){
                    left = Math.random() * 4;
                }
                let top = Math.random()*(-4)+0.2;
                while (this.isTopeat(top)){
                    top = Math.random()*(-4)+0.2;
                }
                div.setAttribute("style", `background: url("egimg/${letter}.jpg");top:${top}rem;left:${left}rem;`)
                this.screen.appendChild(div);
                let obj ={}
                obj['title']=letter
                obj['top']=top;
                obj['left']=left
                obj['node']=div;
                this.letters.unshift(obj);
            }
        }
        //判断重叠
        //只要返回不是-1 重叠了
        isOverlap(left){
            let status = this.letters.findIndex((item)=>{
                if (Math.abs(left-item.left)<0.6){
                        return item;
                }
            })
            if (status!=-1){
                return true;
            } else {
                return false;
            }
        }
        isRepeat(letter){
            let status = this.letters.findIndex((item)=>{
                if (letter == item.title){
                        return item;
                }
            })
            if (status==-1){
                return false;
            } else {
                return true;
            }
        }
        isTopeat(top){
            let status = this.letters.findIndex((item)=>{
                if (Math.abs(item.top-top)<0.55){
                        return item;
                }
            })
            if (status!=-1){
                return true;
            } else {
                return false;
            }
        }
        //字母下落
        run(){
            this.t = setInterval(()=> {
                this.letters.forEach((item,index)=>{
                    item.top+=0.015;
                    item.node.style.top = item.top+'rem';
                    if (item.top>5){
                        //清除字母
                        this.screen.removeChild(item.node);
                        this.letters.splice(index,1);
                        this.makeWord(1);
                        //生命值
                        this.lifeValue.innerText-=5;
                        if (this.lifeValue.innerText==0){
                            clearInterval(this.t);
                            let imgEle = document.querySelector(".pauseButton img");
                                let srcValue = [];
                                srcValue.push(imgEle.attributes.src.value);
                                srcValue.push(imgEle.attributes.imgsrc.value);
                            if (imgEle.attributes.src.value == srcValue[0]){
                                let num = imgEle.attributes.src.value
                                imgEle.attributes.src.value = imgEle.attributes.imgsrc.value
                                imgEle.attributes.imgsrc.value = num;
                                clearInterval(this.t);
                            } else if (imgEle.attributes.src.value == srcValue[1]){
                                let num = imgEle.attributes.src.value
                                imgEle.attributes.src.value = imgEle.attributes.imgsrc.value
                                imgEle.attributes.imgsrc.value = num;
                                this.run();
                            }
                            this.alertEle.style="display:block;";
                            this.ScoreValue.innerText = this.integralValue.innerText;
                        }
                    }
                })
            },8)
        }
        //开关暂停
        pauseButtonFF(){
            let imgEle = document.querySelector(".pauseButton img");
            let srcValue = [];
            srcValue.push(imgEle.attributes.src.value);
            srcValue.push(imgEle.attributes.imgsrc.value);
            this.pauseButton.ontouchend = () => {
                if (imgEle.attributes.src.value == srcValue[0]){
                    let num = imgEle.attributes.src.value
                    imgEle.attributes.src.value = imgEle.attributes.imgsrc.value
                    imgEle.attributes.imgsrc.value = num;
                    clearInterval(this.t);
                    this.cover.style = "display:block;"
                } else if (imgEle.attributes.src.value == srcValue[1]){
                    let num = imgEle.attributes.src.value
                    imgEle.attributes.src.value = imgEle.attributes.imgsrc.value
                    imgEle.attributes.imgsrc.value = num;
                    this.run();
                    this.cover.style = "display:none;"
                }
            }
        }
        //键盘点击删除字母
        delWord(){
            this.keyEle.ontouchend=function(event){
                let tar = event.target;
                if (tar.nodeName == "SPAN"){
                    let value = tar.innerText;
                    if(value == "杨登辉"){
                        value = 4
                    }
                    if(value == "石小蕾"){
                        value = 2
                    }
                    if(value == "刘钊"){
                        value = 1
                    }
                    if(value == "岳英俊"){
                        value = 6
                    }
                    if(value == "王国栋"){
                        value = 3
                    }
                    if(value == "严武军"){
                        value = 5
                    }
                    let index = game.letters.findIndex((item)=>{
                        if (value == item.title){
                            return item;
                        }
                    })
                    if (index!=-1){
                        game.screen.removeChild(game.letters[index].node);
                        game.letters.splice(index,1);
                        game.makeWord(1);
                        //积分值
                        let num = parseInt(game.integralValue.innerText);
                        num+=5;
                        game.integralValue.innerText = num;
                    }
                }
            }
        }
        btnEle(){
            this.btn.ontouchend=function () {
                game.alertEle.style="display:none;";
                let imgEle = document.querySelector(".pauseButton img");//
                    let srcValue = [];
                    srcValue.push(imgEle.attributes.src.value);
                    srcValue.push(imgEle.attributes.imgsrc.value);
                if (imgEle.attributes.src.value == srcValue[0]){
                    let num = imgEle.attributes.src.value
                    imgEle.attributes.src.value = imgEle.attributes.imgsrc.value
                    imgEle.attributes.imgsrc.value = num;
                    clearInterval(this.t);
                } else if (imgEle.attributes.src.value == srcValue[1]){
                    let num = imgEle.attributes.src.value
                    imgEle.attributes.src.value = imgEle.attributes.imgsrc.value
                    imgEle.attributes.imgsrc.value = num;
                    this.run();
                }
                game.screen.innerHTML="";
                game.letters=[];
                game.run();//继续运行
                game.makeWord();
                game.lifeValue.innerHTML = 100;//生命值恢复
                game.integralValue.innerText = 0;//积分值恢复
                game.pauseButtonFF()//开关恢复
            }
        }
    }
    let game = new Game(".wordBox",".pauseButton",".keyBoard",".lifeValue span",".integralValue span",".alert",".overPlay span",".cover",".btn");
    game.makeWord();
    game.run();
    game.pauseButtonFF();
    game.delWord()
    game.btnEle()

}