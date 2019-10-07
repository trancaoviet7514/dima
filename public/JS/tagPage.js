window.onload = function(){
    var url = window.location.href;
    var parameter = url.split('/');
    var key = parameter[parameter.length - 1];
    
    if(key == 'news'){
        document.getElementById('news').style.backgroundColor = "#c5c5c5";
    }
    else if(key == 'books'){
        document.getElementById('books').style.backgroundColor = "#c5c5c5";
    }
    else if(key == 'belongings'){
        document.getElementById('belongings').style.backgroundColor = "#c5c5c5";
    }
    else if(key == 'clothes'){
        document.getElementById('clothes').style.backgroundColor = "#c5c5c5";
    }
    else if(key == 'others'){
        document.getElementById('others').style.backgroundColor = "#c5c5c5";
    }
}