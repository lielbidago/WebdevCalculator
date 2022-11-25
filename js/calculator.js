//problems:
// 1) div by 0 - to_display("Error - division by 0");
// 2) check for dots
// 3) check for errors in sc_eval
let first_num = 0;
let second_num = 0;
let curr_oper = "";
let curr_val = 0;
let cur = "";
let lastEntered = "";
const actions = ['+', '-', '/', 'x'];
const numbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
const sci_actions = ["**2", "**1/2", "**", "**1/", "%", "π"];
let display = "";
let to_log = '';
document.addEventListener('DOMContentLoaded', () => to_display(display));
const DISPLAY = document.getElementById("display") || document.createElement('display_none');
const LOG_SCREEN = document.getElementById("calculations");
function enter(id) {
    if (id == 'c') {
        reset();
        to_log = '';
        to_display("");
        op_log("");
        return;
    }
    if ((id == 'back') && lastEntered) {
        back(lastEntered);
        return;
    }
    if (!scien_f) { //if mode scienti is off
        simple_eval(id);
    }
    else {
        sc_eval(id);
    }
}
function simple_eval(id) {
    if ((lastEntered == 'eq1') && numbers.includes(id)) { //in case of for ex: 1+4=5 -> 6+8=14 
        reset();
    }
    lastEntered = id;
    if (!(id == "eq1") && !(actions.includes(id)) && !(id == 'back')) { //id is a number
        cur += id;
        if (zero_string(cur.length) == cur) { //meaning if cur is only zeros - like '0000'
            cur = '0';
        }
        display = cur;
        to_display(display);
    }
    else if ((actions.includes(id)) && first_num) { //meaning id is in actions and fn is full
        display = id; //
        to_display(display);
        if (!second_num) { //sn is empty
            if (cur) {
                second_num = Number(cur);
                first_num = eq(first_num, second_num, curr_oper);
                second_num = 0;
                cur = "";
                curr_oper = id;
            } //in case we enter two operends one after each other 
            curr_oper = id;
        }
        else { //sn is full
            first_num = eq(first_num, second_num, curr_oper);
            curr_oper = id;
            second_num = Number(cur);
        }
    }
    else if ((actions.includes(id)) && !first_num && !(id == "eq1")) { //id in actions & fn is empty
        display = id; //
        to_display(display);
        first_num = Number(cur);
        curr_oper = id;
        cur = "";
    }
    else if (id == "eq1") {
        display = "="; //
        to_display(display);
        second_num = Number(cur);
        if (!curr_oper) { // incase we entered a number and then pressed '='
            curr_oper = "+";
        }
        eval_result();
        first_num = curr_val;
        second_num = 0;
        curr_oper = "";
        cur = "";
        display = "";
        to_log += '<br>';
    }
}
function sc_eval(id) {
    if (actions.includes(id) || numbers.includes(id) || sci_actions.includes(id)) {
        if (id == 'x') {
            display += '*';
        }
        else if (id == 'π') {
            display += "*3.14";
        }
        else if (display.endsWith('**1/')) {
            display = display.slice(0, -4) + "**(1/" + id + ")";
            return;
        }
        display += id;
        to_display(display);
    }
    else if (id == 'eq1') {
        to_display('=');
        // if(display.includes("**1/")){
        //     let base = display[display.indexOf("**1/")-1]
        //     display.lastIndexOf("**1/")+1)
        // }
        console.log(display, " display ");
        curr_val = eval(display.replace('<br>', ''));
        console.log(curr_val);
        display = '';
        to_display(String(curr_val));
        reset();
    }
}
function reset() {
    first_num = 0;
    second_num = 0;
    curr_oper = "";
    cur = "";
    curr_val = 0;
}
function zero_string(n) {
    let s = "";
    for (let i = 0; i < n; i++) {
        s.concat('0');
    }
    return s;
}
function eval_result() {
    curr_val = eq(first_num, second_num, curr_oper);
    to_display(String(curr_val));
}
// function eval_sci_actions(pre_str:string):string{
//     //2+3*2-4**8√12
//     for(let i=0;i<pre_str.length-2;i++){ // so √ wont be at the ending
//         if(pre_str[i]=='√'){
//             pre_str=pre_str.slice(0,i)+(String(Math.sqrt(Number(pre_str[i+1]))))+pre_str.slice(i+1,-1);
//         }else if (pre_str[i]=='R' && i>1){ //so the root will have both base and root number
//             pre_str=pre_str.slice(0,i)+(String(Number(pre_str[i+1])**(1/Number(pre_str[i+1])))+pre_str.slice(i+1,-1);
//         }
//     }
//     return pre_str;
// }
function back(last) {
    if (actions.includes(last)) { //if last is action
        curr_oper = "";
    }
    else if (numbers.includes(last)) { //if last is number
        cur = cur.slice(0, -2);
    }
    else if (last == 'eq1') {
        to_display('error - cant back after "="');
    }
}
function eq(first_num, second_num, curr_oper) {
    let res = 0;
    if (curr_oper == "+") {
        res = +add(first_num, second_num);
    }
    else if (curr_oper == "-") {
        res = +sub(first_num, second_num);
    }
    else if (curr_oper == "x") {
        res = +mult(first_num, second_num);
    }
    else if (curr_oper == "/") {
        res = +div(first_num, second_num);
    }
    else if (!curr_oper) {
        res = first_num;
    }
    return res;
}
function add(first_num, second_num) {
    return first_num + second_num;
}
function sub(first_num, second_num) {
    return first_num - second_num;
}
function mult(first_num, second_num) {
    return first_num * second_num;
}
function div(first_num, second_num) {
    return first_num / second_num;
}
function to_display(todisplay) {
    if (todisplay == 'Infinity') {
        todisplay = "Error - division by 0";
    }
    DISPLAY.innerHTML = todisplay;
    op_log(todisplay);
}
function op_log(log_this) {
    if (log_this == "=") {
        to_log += '<br>';
    }
    to_log += log_this;
    LOG_SCREEN.innerHTML = to_log;
}
// function display_check(todisplay:string, DISPLAY()?: HTMLElement){
//     DISPLAY !== undefined ? DISPLAY().innerHTML = todisplay : () => {return};
// }
