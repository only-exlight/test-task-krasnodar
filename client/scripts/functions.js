let resHandler = (xhr, barBlock,messBlock) => {
    barBlock.style.width = '100%';
    if (xhr.status != 200) {
        messBlock.style.opacity = 1;
        messBlock.innerHTML = "<span class='error'>ОШИБКА!</span> Запрос не выполнен!";
    } else {
        message.style.opacity = 1;
        message.innerHTML = "<span class='success'>УСПЕХ!</span> Запрос выполнен!";
    }
    setTimeout(() => {
        messBlock.style.opacity = 0;
        setTimeout(() => {
            messBlock.innerHTML = "";
        }, 1000);
    }, 1000);
    setInterval(() => barBlock.style.width = '0%', 3000);
}
module.exports.resHandler = resHandler;

module.exports.qureyStatus = (e,barBlock,message,cb) => {
    if (e.target.readyState == 1) barBlock.style.width = '0%';
        switch (e.target.readyState) {
            case 0:
                bar.style.width = '0%';
                break;
            case 1:
                bar.style.width = '20%';
                break;
            case 2:
                bar.style.width = '60%';
                break;
            case 3:
                bar.style.width = '80%';
                break;
            case 4:
                resHandler(e.target,bar,message);
                if(cb) cb();
                break;
        }
}