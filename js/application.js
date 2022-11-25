let light_f = false;
let scien_f = false; // meaning scientific mode is off
let history_f = false;
let str_url = "";
const info = 'developer: liel bidago,\n this is stage: 1,\nThis app is an Calculator.';
function change_mode(id) {
    if (id == 'light') {
        if (!light_f) {
            get_item('display').style.background = 'yellow';
        }
        else {
            get_item('display').style.background = "rgb(166, 226, 201)";
        }
        on_off(light_f, get_item(id));
    }
    else if (id == 'scientific') {
        if (!scien_f) { //off
            get_item(id).style.background = "rgb(255, 199, 125)";
            get_item('scienti').style.display = 'block';
            scien_f = true;
        }
        else { //on
            get_item(id).style.background = "aliceblue";
            get_item('scienti').style.display = 'none';
            scien_f = false;
        }
        display = '';
        reset();
    }
    else if (id == 'history') {
        if (!history_f) { //off
            get_item(id).style.background = "rgb(255, 199, 125)";
            get_item('log').style.display = 'block';
            history_f = !history_f;
        }
        else { //on
            get_item(id).style.background = "aliceblue";
            get_item('log').style.display = 'none';
            history_f = !history_f;
        }
    }
    else if (id == 'config') {
    }
    //     if(document.body.className =='light'){  <----- dark mode
    //         document.body.className ='dark';
    //         return;
    //     }else{
    //         document.body.className ='light';
    //         return;
    //     }
    // }
}
function on_off(flag, bt) {
    if (!flag) {
        bt.style.background = "rgb(255, 199, 125)";
        light_f = true;
    }
    else {
        bt.style.background = "aliceblue";
        light_f = false;
    }
}
function get_item(id_str) {
    return document.getElementById(id_str) || document.createElement('display_' + id_str);
}
function get_config_result() {
    // function getCurrentURL () {
    //     return window.location.href
    //   }
    //   // Example
    //   const url = getCurrentURL()
    //   let param = new URLSearchParams(url);
    //   alert(param);
    alert(document.forms[0]);
}
document.addEventListener("DOMContentLoaded", config_set);
function config_set() {
    const data = window.location.search;
    let params = new URLSearchParams(data);
    const color = params.get('bgcolor');
    const mode = params.get('mode');
    const font = params.get('font');
    console.log(document.body.classList[0]);
    if (color) {
        document.body.style.background = color;
    }
    if (mode) {
        document.body.className = mode + " " + "calc";
    }
    if (font) {
        document.body.style.fontFamily = font;
    }
}
