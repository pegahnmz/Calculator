const toggle__theme = document.querySelector("#toggle__theme");
const body = document.querySelector("body")
const equal = document.querySelector("#equal")
let result__main = document.querySelector(".result__main")
const result__equal = document.querySelector(".result__equal")
const btn_c = document.querySelector("#btn_c")
const btn_backspace = document.querySelector("#btn_backspace")
let btn = Array.from( document.querySelectorAll(".btn"))
let operations =Array.from(document.querySelectorAll(".operation")).map((a)=>{return a.value})
const history__container = document.querySelector(".history__container")
const clearHistory = document.querySelector("#clearHistory")
const backToMainPage = document.querySelector("#backToMainPage")
const snackbar = document.querySelector(".snackbar")
const snackbar_clear = document.querySelector("#snackbar_clear")
const snackbar_cancel = document.querySelector("#snackbar_cancel")
const historyPage = document.querySelector(".history")
const showHistory = document.querySelector("#showHistory")
const backres = document.querySelector("#backres")

let history=[]
let equalFlag=false
let willClear =false
let backFlag = false
let indexHistory=history.length-1;
renderHistory()



/*calculator buttons */
btn.map((button) => {
    button.addEventListener("click", (e) => {
        
        switch(e.target.value){
            case 'AC':
                if(result__main.innerHTML != "0" && !equalFlag){
                    
                    result__main.innerHTML = result__main.innerHTML.slice(0,-1)
                    if(!result__main.innerHTML){
                       // result__main.innerHTML = "0"
                        begin__state();
                    }
                }
                break
            case 'C':
                result__main.innerHTML= "0";
                equalFlag=false
                backFlag=false
                begin__state();
                renderHistory()
                break
            case '%':
                if(!equalFlag){
                    percent()
                }
                
                break
            case '=':
                if(result__main.innerHTML != 0){
                    calc(result__main.innerHTML)
                    showEqualRes()
                    saveOnHistory()
                }

                break

            default:
                if(!equalFlag){
                    var mr = document.querySelector(".main__res")
                    if(mr.innerHTML !== '0'){
                        if(mr.innerHTML.length<=12){
                            if(operations.includes( mr.innerHTML.slice(-1)) && 
                               operations.includes(e.target.value)){
                                   mr.innerHTML = mr.innerHTML.slice(0,-1)+e.target.value
                               }else{
                                mr.innerHTML += e.target.value;
                                calc(mr.innerHTML) 
                               }
                       
                        }
    
                    }else{
                       
                        if(e.target.value === '.'){
                            mr.innerHTML += e.target.value;
                            start_calc();
                        }
                        else if(operations.includes(e.target.value)){
                            
                            mr.innerHTML += e.target.value
                            start_calc();
                        }else{
                            mr.innerHTML = e.target.value
                            start_calc();
                        }
                        
                    }
                }

                
        }
        
        
    })
})

/*show equal */
function showEqualRes(){

    result__equal.classList.add("main__res")
    result__equal.classList.remove("hide")
    result__equal.classList.remove("sub__res")
    result__main.classList.remove("main__res")
    result__main.classList.add("sub__res")
    equalFlag=true
}

/*save on history array */
function saveOnHistory(){
    let newHistoryRecord = {
        operation: result__main.innerHTML,
        res:result__equal.innerHTML
    }
    history.push(newHistoryRecord)
    renderHistory()
}

/*render all history */
function renderHistory(){
    history__container.innerHTML=''
    if(history.length<=0){
        clearHistory.classList.add('disabledbtn')
        backres.classList.add('disabledbtn')
        clearHistory.disabled=true
        backres.disabled=true
    }else{
        clearHistory.classList.remove('disabledbtn')
        backres.classList.remove('disabledbtn')
        clearHistory.disabled=false
        backres.disabled=false
        for(let el of history){
            let newrow = `
            <div class="history__row">
                                <p>${el.operation}</p>
                                <p >${el.res}</p>
                            </div>`;
            history__container.innerHTML += newrow;
        }
    }

}

/**calc percent */
function percent(){
    if(isNaN( result__main.innerHTML.slice(-1))){
        //NOT WORK
    }else{
        let tempo = result__main.innerHTML
        let indexOfLastOprator=-1;
        for(let i = tempo.length-1 ; i>=0 ;i--){
            if(isNaN(tempo[i])){
                indexOfLastOprator = i;
                break
            }     
        }
        let tep = tempo.slice(indexOfLastOprator+1) / 100;
        let newt = tempo.slice(0,indexOfLastOprator+1)
        result__main.innerHTML=(newt+tep)
        calc(newt+tep)
    }
}


/*calculation */
function calc(str){
    try{
       var res=eval(str)
       result__equal.innerHTML="= "+res
    }catch{
    }
    
}


/**begin state of calculator */
function begin__state(){
    result__main.classList.add("main__res")
    result__equal.classList.remove("main__res")
    result__equal.innerHTML= "0"
    result__main.innerHTML="0"
    result__equal.classList.add("hide")
}

/*start calculate */
function start_calc(){
    result__equal.classList.remove("hide")

    result__equal.classList.add("sub__res")
    let v = result__main.innerHTML
    calc(v)
}

/*show the previous calculations */
backres.addEventListener('click',() => {    

        if(backFlag){
            indexHistory=indexHistory-1;
        }else{
            
            if(equalFlag){
                indexHistory=history.length-2
            }else{
                indexHistory=history.length-1
            }
            
        }
      
        if(indexHistory>=0){
            let backresult = history[indexHistory]
            result__main.innerHTML=backresult.operation
            result__equal.innerHTML=backresult.res
            showEqualRes()
        }else{
            backres.classList.add('disabledbtn')
            backres.disabled=true
        }
        backFlag=true
    


})

/* theme toggle button*/
toggle__theme.addEventListener("click",() => {
    body.classList.toggle("light")
   
})

/*back to main page */
backToMainPage.addEventListener('click',() => {
    historyPage.classList.add("history_hide")
})
/*clear history*/
clearHistory.addEventListener('click', () => {
    snackbar.classList.add("show__snackbar")
    })

/*show history page*/
showHistory.addEventListener('click', () => {
    historyPage.classList.remove("history_hide")
    renderHistory()
})



/*snackbar*/
snackbar_cancel.addEventListener('click',() => {
    snackbar.classList.remove("show__snackbar")
    
})
snackbar_clear.addEventListener('click',() => {
    willClear=true;
    history=[]
    renderHistory()
    begin__state()
    snackbar.classList.remove("show__snackbar")
   
})



