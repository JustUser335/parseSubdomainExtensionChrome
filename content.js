chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        if( request.click ) {
            let elem = document.querySelector("input[name=q]");
            let serchButton = document.querySelector('button[type=submit]');
            let elemValue = elem.value;
            let arrData = [];
            let allTegCite = document.querySelectorAll('cite');
            let countCite = allTegCite.length;
            let timerId;

            (countCite && checkWordLimit())?inProcess():outPutData();

            function inProcess(){
                [].forEach.call(allTegCite,function(e){
                    textCont = e.textContent;
                    if(!e.textContent.match('google')){
                        var link = /(\w)+:\/\/(.*?)\s/.exec(textCont);
                        if(!link){
                            link = /(\w)+:\/\/(.*?)*/.exec(textCont);
                        }
                        var clearLink = (link[0]).trim();
                        if(!arrData.includes(clearLink)){
                            arrData.push(clearLink);
                        }
                    }
                });
                for( var key in arrData ){
                    arrData[key] = "-inurl:"+ arrData[key];
                }
                var str = arrData.join(' ');
                var arrSElem = elemValue.split(' ');
                arrData.forEach(function(e){
                    if(!arrSElem.includes(e)){
                        arrSElem.push(e);
                    }
                });
                if(arrSElem.length > 1){
                    elem.value = arrSElem.join(' ');
                    autoClick();
                }else{
                    elem.value = elemValue + ' ' + str;
                    autoClick();
                }
            }
            function outPutData(){
                var result = new Array,score = 0;
                elemValue.split(' ').forEach(function(e){
                    score !== 0?result.push(/[^:].*/.exec(/:.*/.exec(e))[0]):'';
                    score++;
                });
                var resultStr = result.join('\n');// #outputFormat
                console.log('%c Process completed '+'\n%c'+resultStr+'\n'+'%c the result is copied to the clipboard ', 'background: #32CD32; font-size: 22px; border-radius: 5px 5px 0 0; color: #fff','font-size: 14px; color:#202124','background: #00BFFF; font-size: 18px; border-radius: 0 0 5px 5px; color: #fff');
                createElAndCopy(resultStr);
            }
            function createElAndCopy(resultStr){
                var area = document.createElement("textarea");
                area.innerHTML = resultStr;
                document.body.appendChild(area);
                area.select();
                document.execCommand("copy");
                area.remove();
            }
            function autoClick() {
                timerId = setInterval(function(){
                    serchButton.click()},3000);
            }
            function checkWordLimit(){
                var cardSection = document.querySelector('.card-section');
                if( cardSection ){
                    var cardSectionTextC = cardSection.textContent;
                    var words32 = /32/.test(cardSectionTextC);

                    if(words32){
                        console.log(console.log('%c DETECTED: word limit. Completion ' + '', 'background: #FF3333; font-size: 18px; text-align: center; border-radius: 5px 5px 5px 5px; color: #fff'));
                        return 0;
                    }
                }
                return 1;
            }

            (function unloadTheStyle(){

            })();
        }
        /* !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
        *  1. определить состояние поисковой стороки Пример: site:edu35.ru
        *  !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! */
    }
);