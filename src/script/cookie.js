function setcookie(key, value, day) {
    let date = new Date();
    date.setDate(date.getDate() + day);
    document.cookie = key + '=' + encodeURI(value) + ';expires=' + date;
}

function getcookie(key) {
    let arr = decodeURI(document.cookie).split('; ');
    for (let i = 0; i < arr.length; i++) {
        let newarr = arr[i].split('=');
        if (newarr[0] === key) {
            return newarr[1];
        }
    }
}

function delcookie(key) {
    setcookie(key, '', -1);
}