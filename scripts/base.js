/**
 * Created by Zhichao Liu on 11/11/2015.
 */

window.onload = function(){

    var timeSwitch = false;
    var timerId;
    var kbEl = document.getElementById('keyboard');
    document.getElementById('result').style.top = (innerHeight-500)/2+'px';
    document.getElementById('result').style.left = (innerWidth-700)/2+'px';
    document.getElementById('kb-border').style.marginTop = (innerHeight - kbEl.offsetHeight) / 2 +'px';
    var WrongEl = 0;

    document.onselectstart  = function(){
        return false;
    };

    var timeAttr = 0;
    var time = function () {
        var timeEl = document.getElementById('time');
        timeEl.innerHTML = ++timeAttr;
    };

    var resultScr = function (time, zql) {
        var resultEl = document.getElementById('result');
        var resultTime = document.getElementById('resultTime');
        var resultZql = document.getElementById('resultZql');
        var playAgain = document.getElementById('play-again');
        playAgain.onclick = function(){
            location.reload();
        };
        resultTime.innerHTML = time;
        resultZql.innerHTML = zql;
        resultEl.style.zIndex = '999';
        resultEl.style.opacity = '1';
    };

    var randomChar = function(){
        var charCode = 0;
        while ((charCode>=0&&charCode<=64)||(charCode>=91&&charCode<=96)||(charCode>122)){
            charCode = Math.floor(Math.random()*123);
        }
        return String.fromCharCode(charCode);
    };

    for(i=0;i<52;i++){
        var keyBorder = document.createElement('div');
        keyBorder.setAttribute('class','key-border');
        var key = document.createElement('div');
        key.setAttribute('class','key');
        key.innerHTML = randomChar();
        keyBorder.appendChild(key);
        kbEl.appendChild(keyBorder);
    }

    var el = kbEl.firstElementChild;
    document.onkeypress = function (e) {
        e.preventDefault();
        if(!timeSwitch){
            timerId = setInterval(time,1000);
            timeSwitch = true;
        }
        if(e.keyCode == el.firstElementChild.innerHTML.charCodeAt(0)){
            el.firstElementChild.style.color = 'yellowgreen';
        }else{
            el.firstElementChild.style.color = 'red';
            WrongEl++;
        }

        document.getElementById('zql').innerHTML = ((52-WrongEl)/52*100).toFixed(2);
        el.firstElementChild.setAttribute('class','key keydown');
        el = el.nextElementSibling;

    };

    document.onkeyup = function(){
        if(el){
            el.previousElementSibling.firstElementChild.setAttribute('class','key');
        }else{
            kbEl.lastElementChild.firstElementChild.setAttribute('class','key');
            clearInterval(timerId)
            resultScr(document.getElementById('time').innerHTML,document.getElementById('zql').innerHTML);
            document.onkeypress = function(){return false;};
            return;
        }
    }
};
