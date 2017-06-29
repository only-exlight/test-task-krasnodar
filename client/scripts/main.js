window.onload = () => {
    let resHandler = require('./functions').resHandler;
    let qureyStatus = require('./functions').qureyStatus;
    let doc = document,
        container = doc.getElementById('box'),
        rounds = doc.getElementsByClassName('round'),
        saveBut = doc.getElementById('save'),
        downBut = doc.getElementById('download'),
        message = doc.getElementById('message'),
        bar = doc.getElementById('bar'),
        event = new Event('time'),
        saveXHR = new XMLHttpRequest(),
        downXHR = new XMLHttpRequest();

    saveXHR.addEventListener('readystatechange', (e) => {
        qureyStatus(e,bar,message);
    })

    downXHR.addEventListener('readystatechange', (e) => {
        qureyStatus(e,bar,message,()=>{
            let resData = JSON.parse(downXHR.responseText).data;
                for (let i = 0; i < rounds.length; i++) {
                    rounds[i].style.opacity = resData[i];
                }
        })
    })

    saveBut.addEventListener('click', (e) => {
        saveXHR.open('POST', '/api/save-state', true);
        saveXHR.setRequestHeader('Content-Type', 'application/json');
        let data = []
        for (let i = 0; i < rounds.length; i++) {
            data.push(rounds.item(i).style.opacity);
        }
        saveXHR.send(JSON.stringify({
            data: data
        }));
    })

    downBut.addEventListener('click', (e) => {
        downXHR.open('POST', '/api/download', true);
        downXHR.setRequestHeader('Content-Type', 'application/json');
        downXHR.send();
    })

    container.addEventListener('click', (e) => {
        if (e.target.className == 'round') {
            e.target.style.opacity = 1;
        }
        if (e.target.childNodes.length > 0) {
            e.target.childNodes[1].style.opacity = 1;
        }
    })

    container.addEventListener('time', (e) => {
        for (let i = 0; i < rounds.length; i++) {
            if (rounds.item(i).style.opacity < 0) rounds.item(i).style.opacity = 0;
            else if (rounds.item(i).style.opacity == '') rounds.item(i).style.opacity = 1;
            else rounds.item(i).style.opacity = rounds.item(i).style.opacity - 0.25;
        }
    })

    setInterval(() => {
        container.dispatchEvent(event);
    }, 3000)
};