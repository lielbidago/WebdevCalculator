function change_mode(id){
     
    if(id =='mode'){
    if(document.body.className =='light'){
        document.body.className ='dark';
        return;
    }else{
        document.body.className ='light';
        return;
    }      
    }
}
