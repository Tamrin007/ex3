'use strict'

window.onload = function() {
    const questionary_area = document.getElementById('questionary-area');
    const order = createRandomOrder();

    for (let i = 0; i < order.length; i++) {
        createDivVideo(order[i]);
        createDivQuestionary(order[i]);
    }
}

function createRandomOrder() {
    let seq = ['B', 'C', 'D', 'E', 'F', 'G', 'H', 'I'];
    let order = ['A'];
    const times = seq.length;

    for(let i = 0; i < times; i++) {
        let r = Math.floor(Math.random() * seq.length);
        order.push(seq[r]);
        seq.splice(r, 1);
    }

    return order;
}

function createDivVideo(num) {
    const video_area = document.getElementById('video-area');
    const v = document.createElement('div');

    v.setAttribute('class', 'siimple-btn siimple-btn--teal btn');
    v.setAttribute('onclick', `this.style.display = 'none'; openVideos('` + num + `')`);
    v.textContent = num;

    video_area.appendChild(v);
}

function createDivQuestionary(num) {
    const questionary_area = document.getElementById('questionary-area');
    const q = document.createElement('div');

    q.setAttribute('class', 'siimple-btn siimple-btn--pink btn');
    q.setAttribute('onclick', `this.style.display = 'none'; openQuestionary('` + num + `')`);
    q.textContent = num;
    
    questionary_area.appendChild(q);
}

function openVideos(target) {
    const name = document.getElementById('name-form').value;
    const url = 'http://localhost:8080/' + name + '/' + target;
    window.open(url, '_blank');
}

function openQuestionary(target) {
    const name = document.getElementById('name-form').value;
    let url;
    switch (target) {
        case "A":
            url = "https://docs.google.com/forms/d/e/1FAIpQLSdrzUpg05A_zPsPLXP1y64ro41YRz7MKwmQzQUHAl0AXO1ndw/viewform?usp=pp_url&entry.132045329=" + name + "&entry.880690698&entry.805327672";
            break;
        case "B":
            url = "https://docs.google.com/forms/d/e/1FAIpQLSdrx1q-ZeGC-K7pv-QPbBB2Z02TjYZq03Ti1mslt5PZCg48RQ/viewform?usp=pp_url&entry.132045329=" + name + "&entry.880690698&entry.805327672";
            break;
        case "C":
            url = "https://docs.google.com/forms/d/e/1FAIpQLSeWbKkAFbwEYHPy7Wause9FVWs65zx31ChdDfmhaSGttzlz0A/viewform?usp=pp_url&entry.132045329=" + name + "&entry.880690698&entry.805327672";
            break;
        case "D":
            url = "https://docs.google.com/forms/d/e/1FAIpQLSeVm-WqDFDf70WyyeloxRXtDz3-F23Y9bP3wcklR3FeBa5nRg/viewform?usp=pp_url&entry.132045329=" + name + "&entry.880690698&entry.805327672"
            break;
        case "E":
            url = "https://docs.google.com/forms/d/e/1FAIpQLSemiZIBmT9ApSMTxiUCUaXAgynuHdyZiZJzP6Hxm2ZP58n3dg/viewform?usp=pp_url&entry.132045329=" + name + "&entry.880690698&entry.805327672"
            break;
        case "F":
            url = "https://docs.google.com/forms/d/e/1FAIpQLSdKxeIXYtmYFwADV64dvhVy6wM6-zk8EaGQV9ic6nfs1VaZTg/viewform?usp=pp_url&entry.132045329=" + name + "&entry.880690698&entry.805327672"
            break;
        case "G":
            url = "https://docs.google.com/forms/d/e/1FAIpQLScSIEncjlrIQoUJ4WOq27jkYR1h4lOtn9fnxEZWdNaijT3Stw/viewform?usp=pp_url&entry.132045329=" + name + "&entry.880690698&entry.805327672"
            break;
        case "H":
            url = "https://docs.google.com/forms/d/e/1FAIpQLSftABbvr4WJWpWxg9j_gYUrrfZkktnxIokgmUCXnSC8hcEJng/viewform?usp=pp_url&entry.132045329=" + name + "&entry.880690698&entry.805327672"
            break;
        case "I":
            url = "https://docs.google.com/forms/d/e/1FAIpQLSdv85CMTRzeO26KyXrZaWrhK5Y_wgg7GnafVOyY12l6eDhHrg/viewform?usp=pp_url&entry.132045329=" + name + "&entry.880690698&entry.805327672"
            break;
        default:
    }
    window.open(url, '_blank');
}
