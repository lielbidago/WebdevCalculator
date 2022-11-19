
let first_num = 0;
let second_num = 0;
let curr_oper = null;
let curr_val = 0;
// let n = null;
const actions=['+','-','/','x'];
const numbers=['0','1','2','3','4','5','6','7','8','9'];
let display = "";
let cur = "";
let lastEntered = null;

function enter(id){

    if (id =='c'){
        reset();
        to_display("");
        return;
    }

    if ((id == 'back') && lastEntered){
        back(lastEntered);
        return;
    }

    if ((lastEntered=='eq1') && numbers.includes(id)){ //in case of for ex: 1+4=5 -> 6+8=14 
        reset();
    }

    lastEntered = id;

    if(!(id == "eq1") && !(actions.includes(id)) && !(id=='back')){ //id is a number
        cur = cur.concat(id);
        display = display.concat(cur);
        to_display(display);
        // if (id=='back'){
        //     display('error');
        // }
    }else if ((actions.includes(id)) && first_num){ //meaning id is in actions and fn is full
        display = display.concat(id);
        to_display(display);
        if (!second_num){ //sn is empty
            if (cur){
                second_num = Number(cur);
                first_num = eq(first_num, second_num, curr_oper);
                second_num = 0;
                cur = "";
                curr_oper = id;
            } //in case we enter two operends one after each other 
            curr_oper = id;
        }else{ //sn is full
            first_num = eq(first_num, second_num, curr_oper);
            curr_oper = id;
            second_num = Number(cur);
        }
    }else if((actions.includes(id)) && !first_num && !(id =="eq1")){ //id in actions & fn is empty
        display = display.concat(id);
        to_display(display);
        first_num = Number(cur);
        curr_oper = id;
        cur = "";
    }else if(id == "eq1"){
        display = display.concat("=");
        to_display(display);
        second_num = Number(cur);
            if (!curr_oper){ // incase we entered a number and then pressed '='
                curr_oper = "+";
            }
        eval();
        first_num = curr_val;
        second_num = 0;
        curr_oper = null;
        cur = "";
        display = "";
        
    }
}

function reset(){
    first_num = 0;
    second_num = 0;
    curr_oper = null;
    cur = "";
    curr_val = 0;
}


function eval(){ 

    curr_val = eq(first_num, second_num, curr_oper);
    to_display(curr_val);
    
}

function back(last){
    
    if (actions.includes(last)){ //if last is action
        curr_oper = null;
    }else if (numbers.includes(last)){//if last is number
        cur = cur.slice(0,-2);
    }else if (last == 'eq1'){
        to_display('error - cant back after "="');
    }
}       


function eq(first_num, second_num, curr_oper){
    let res=0;
    if(curr_oper=="+"){
        res =+ add(first_num,second_num);
    }else if(curr_oper=="-"){
        res =+ sub(first_num,second_num);
    }else if(curr_oper=="x"){
        res =+ mult(first_num,second_num);
    }else if(curr_oper=="/"){
        res =+ div(first_num,second_num);
    }else if(!curr_oper){
        res = first_num;
    }
    return res;
}

function add(first_num,second_num){
    return first_num + second_num;
}
function sub(first_num,second_num){
    return first_num - second_num;
}
function mult(first_num,second_num){
    return first_num * second_num;
}
function div(first_num,second_num){
    if (second_num == 0){
        return;
    }
    return first_num / second_num;
}

function to_display(todisplay){
    document.getElementById("display").innerHTML = todisplay;
}
// button.addEventListener('click', (event) => {
//     const myP = document.createElement('p');
//     myP.innerHTML = input.value;
// })


// function displayButtonInfo(val){
//     alert(val);
// }



// function enter1(n, first_num, second_num, curr_oper,curr_val){
//     if((typeof(n)=="number") && (!first_num)){
//         return first_num;
//     }else if((typeof(n)=="number") && (first_num)){
//         return Number(String(first_num)+String(n));
//     }else if((typeof(n)==String) && (!curr_oper)){
//         curr_oper = n; 
//     }
    
// }


