import * as wasm from 'asic-tycoon';

const name = document.getElementById('name');
const initialHeight = document.getElementById('init-height');
const blockHash = document.getElementById('block-hash');
const hash = document.getElementById('hash'); // player hash
const guess = document.getElementById('guess'); // Hash! btn
const start = document.getElementById('start');
const step = document.getElementById('step');
const trade = document.getElementById('trade');
const log = document.getElementById('log');
const target = 9; // number of leading zeroes

let begin; // start time
let n; // new random guess
let ctxId; // `load_refresh` interval ID


// Bootstrap player's starting hashrate with
// a proof-of-work minigame
guess.addEventListener('click', function() {
    if (!begin)
    {
        // set begin time and guess a number
        begin = new Date().getTime();
        n = Math.floor(Math.random() * 10);
    }
    else 
    {
        // generate random guess
        n = Math.floor(Math.random() * 10);
    }

    if (n >= target)
    {
        // record elapsed time
        let now = new Date().getTime();
        let t = Math.floor((now - begin) / 1000);
        
        // set player hashrate
        // less time to solve means a better starting hash
        let h;
        let goal = target + 1; // e.g. 10sec
        if (t == goal) {h = 1;}
        else if (t >= 55) {h = 0.1;}
        else if (t < goal)
        {
            h = 10 - ((t / goal) * 10); // e.g. (5sec, 5hash)
        }
        else 
        {
            // (t > goal, t < 55)
            h = 1 - ((t - 10) / 50); // e.g. (35sec, 0.5hash)
        }
        hash.innerHTML = h;

        // Prompt user to start
        log.innerHTML = `Found a nonce in ${t} seconds. Ready to Start.`;
        guess.toggleAttribute('disabled');
    }
    
    // Make a string the resembles a sha256
    let s = '';
    
    // Push '0' n times, where n is our guess
    for (let i = 0; i < n; ++i)
    {
        s += '0';
    }
    
    // Push a random digit to fill the length
    while (s.length < 64 - n) 
    {
        let dec = Math.floor(Math.random() * 15);
        let hex = dec.toString(16);
        s += hex;
    }
    blockHash.value = s;
    
});

// Refresh UI on some interval
start.addEventListener('click', function() {
    if (hash.innerHTML == '0')
    {
        alert("Haven't initialized a hashrate!");
    }
    else if (!ctxId )
    {
        ctxId = setInterval(function() {
            console.log('running new ctx!');
            wasm.load_refresh();
        }, 5000)
        
        console.log('started interval');

        // set block height
        document.getElementById('height').innerHTML = initialHeight.value;
        
        // clear input fields
        let player = name.value;
        console.log(`dropping name ${player}`);
        name.value = '';
        initialHeight.value = '';
    }
});

// Step forward once
step.addEventListener('click', function() {
    if (ctxId != null)
    {
        clearInterval(ctxId);
        console.log('interval cleared');
    }
    else if (hash.innerHTML == '0')
    {
        alert("Haven't initialized a hashrate!");
    }
    else
    {
        console.log('refresh once');
        wasm.load_refresh();
    }
});

// Exchange items
trade.addEventListener('click', function() {
    if (hash.innerHTML == '0')
    {
        log.innerHTML = 'unauthorized';
    }
    else 
    {
        let item = document.getElementById('item');
        let qty = document.getElementById('qty');
        
        if (item != null && qty != null)
        {
            console.log('executing trade');
            wasm.exchange(item.value, qty.value);
        }
        else 
        {
            console.log('unable to get item id');
        }
    }
});

