//Blockcypher api to get block date information for current and historical blocks
async function getBlockInfo(height) {
  return new Promise(async (resolve, reject) => {
    const xhr = new XMLHttpRequest();

    const url = `https://mempool.space/api/blocks/${height}`;

    xhr.responseType = "json";

    xhr.onreadystatechange = () => {
      if (xhr.readyState === XMLHttpRequest.DONE) {
        resolve(xhr.response);
      } else {
        return "Trouble reaching the Blockcypher API.";
      }
    };

    xhr.open("GET", url);

    xhr.send();
  });
}

//Blockcypher api to get current block height
async function getBlockHeight() {
  return new Promise(async (resolve, reject) => {
    const xhr = new XMLHttpRequest();

    const url = `https://mempool.space/api/blocks/tip/height`;

    xhr.responseType = "json";

    xhr.onreadystatechange = () => {
      if (xhr.readyState === XMLHttpRequest.DONE) {
        resolve(xhr.response);
      } else {
        return "Trouble reaching the Mempool.space API.";
      }
    };

    xhr.open("GET", url);

    xhr.send();
  });
}

//get current btc price from coindesk
async function getBTCPrice() {
  return new Promise(async (resolve, reject) => {
    const xhr = new XMLHttpRequest();

    const url = `https://blockchain.info/ticker`;

    xhr.responseType = "json";

    xhr.onreadystatechange = () => {
      if (xhr.readyState === XMLHttpRequest.DONE) {
        resolve(xhr.response.USD.last);
      } else {
        return "Trouble reaching the Blockchain API.";
      }
    };

    xhr.open("GET", url);

    xhr.send();
  });
}

//h3 information
async function currentHeightInterval() {
  let height = await getBlockHeight();
  return document.querySelector('#current').innerHTML = 'CURRENT BLOCK HEIGHT: ' + '<span id="bh-top">' + height + '</span>';
}
currentHeightInterval();
//let heightInterval = setInterval(currentHeightInterval(), 60000);

async function currentBTCPrice() {
  let price = await getBTCPrice();
  const options = { style: 'currency', currency: 'USD' };
  const numberFormat = new Intl.NumberFormat('en-US', options);
  return document.querySelector('#btcprice').innerHTML = '<span id="pricefont">' + numberFormat.format(price) + '</span>' +  ' <span id="unit">(USD)</span>';
}
currentBTCPrice();

//main functionality
const submitButton = document.querySelector("#button");
const blockHeightInput = document.querySelector("#blockheight");
blockHeightInput.focus();

submitButton.onclick = async function handleOnClick() {
  submitButton.disabled = true;
  document.querySelector('#button').innerHTML = 'LOADING';
  await currentHeightInterval();
  await currentBTCPrice();
  const blockHeight = blockHeightInput.value;
  const currentBlockHeight = await getBlockHeight();

  if (blockHeight == 0) {
  const genesisBlock = new Date('2009-01-03 18:15:05 utc');
    document.querySelector('#button').innerHTML = 'GENERATE DATE';
    document.querySelector("#blockdate").innerHTML = genesisBlock;
    document.querySelector('#easteregg').innerHTML = 'This is the first block in the bitcoin blockchain, known as the <a href="https://en.bitcoin.it/wiki/Genesis_block" target="_blank" rel="noreferrer">Genesis Block</a>. This block was mined by <a href="https://www.satoshi.nakamotoinstitute.org" target="_blank" rel="noreferrer">Satoshi Nakamoto</a>.<br><br><a href="https://en.bitcoin.it/w/images/en/1/1d/Jonny1000thetimes.png" target="_blank" rel="noreferrer">The Times 03/Jan/2009 Chancellor on brink of second bailout for banks</a>';
    submitButton.disabled = false;
  }

  else if (blockHeight == 170) {
    const timestamp = new Date('2009-01-12 03:30:25 utc');
      document.querySelector('#button').innerHTML = 'GENERATE DATE';
      document.querySelector("#blockdate").innerHTML = timestamp;
      document.querySelector('#easteregg').innerHTML = 'This block contains the transaction that represents the first ever transfer of bitcoin from one person to another. It also has the added distinction of being (one of?) the only known transfers of bitcoin from Satoshi Nakamoto, in this case sending bitcoin to <a href="https://bitcoincoaster.com/news/running-bitcoin-sculpture/" target="_blank" rel="noreferrer">Hal Finney</a> as a test.';
      submitButton.disabled = false;
  }

  else if (blockHeight == 24835) {
    const timestamp = new Date('2009-10-12 04:21:18 utc');
      document.querySelector('#button').innerHTML = 'GENERATE DATE';
      document.querySelector("#blockdate").innerHTML = timestamp;
      document.querySelector('#easteregg').innerHTML = 'In this block there is the first-known BTC-to-fiat transaction, 5,050 BTC were exchanged for 5.02 USD, at an effective exchange rate of ~0.001 USD/BTC.<br><br><a href="https://nitter.pussthecat.org/marttimalmi/status/423455561703624704" target="_blank" rel="noreferrer">Twitter thread</a>';
      submitButton.disabled = false;
  }

  else if (blockHeight == 57043) {
    const timestamp = new Date('2010-05-22 18:16:31 utc');
      document.querySelector('#button').innerHTML = 'GENERATE DATE';
      document.querySelector("#blockdate").innerHTML = timestamp;
      document.querySelector('#easteregg').innerHTML = '<i class="fas fa-pizza-slice"></i><br>57043 has the famous Bitcoin Pizza transaction, one of the earliest real-world transactions, in which 10,000 BTC was paid for 2 large pizzas worth ~41 USD (at an effective exchange rate of ~$0.04/BTC).<br><br><a href="https://bitcointalk.org/index.php?topic=137.0" target="_blank" rel="noreferrer">bitcointalk.org thread</a>';
      submitButton.disabled = false;
  }

  else if (blockHeight == 153509) {
    const timestamp = new Date('2011-11-16 05:59:08 utc');
      document.querySelector('#button').innerHTML = 'GENERATE DATE';
      document.querySelector("#blockdate").innerHTML = timestamp;
      document.querySelector('#easteregg').innerHTML = 'This block confirms a transaction from November 2011 that spends 11 UTXOs worth 50,000 BTC each to create a single 550,000 BTC UTXO. This is currently the largest output transaction.<br><br><a href="https://mempool.space/tx/29a3efd3ef04f9153d47a990bd7b048a4b2d213daaa5fb8ed670fb85f13bdbcf" target="_blank" rel="noreferrer">View transaction</a>';
      submitButton.disabled = false;
  }

  else if (blockHeight == 210000) {
    const timestamp = new Date('2012-11-28 15:24:38 utc');
      document.querySelector('#button').innerHTML = 'GENERATE DATE';
      document.querySelector("#blockdate").innerHTML = timestamp;
      document.querySelector('#easteregg').innerHTML = 'First block of subsidy (miner reward) era #2 (25 BTC).';
      submitButton.disabled = false;
  }

  else if (blockHeight == 230009) {
    const timestamp = new Date('2013-04-06 20:28:10 utc');
      document.querySelector('#button').innerHTML = 'GENERATE DATE';
      document.querySelector("#blockdate").innerHTML = timestamp;
      document.querySelector('#easteregg').innerHTML = 'This block includes a transaction that encodes the Bitcoin whitepaper PDF in 945 of its 947 outputs. Read the whitepaper <a href="https://bitcoin.org/en/bitcoin-paper" target="_blank" rel="noreferrer">here</a>.';
      submitButton.disabled = false;
  }

  else if (blockHeight == 420000) {
    const timestamp = new Date('2016-07-09 16:46:13 utc');
      document.querySelector('#button').innerHTML = 'GENERATE DATE';
      document.querySelector("#blockdate").innerHTML = timestamp;
      document.querySelector('#easteregg').innerHTML = 'First block of subsidy (miner reward) era #3 (12.5 BTC).';
      submitButton.disabled = false;
  }

  else if (blockHeight == 621259) {
    const timestamp = new Date('2020-03-11 22:57:21 utc');
      document.querySelector('#button').innerHTML = 'GENERATE DATE';
      document.querySelector("#blockdate").innerHTML = timestamp;
      document.querySelector('#easteregg').innerHTML = '500+ million USD transferred for < 1 USD fee (2020 prices).<br><br><a href="https://mempool.space/tx/eeea72f5c9fe07178013eac84c3705443321d5453befd7591f52d22ac39b3963" target="_blank" rel="noreferrer">View transaction</a>';
      submitButton.disabled = false;
  }

  else if (blockHeight == 629999) {
    const timestamp = new Date('2020-05-11 19:23:23 utc');
      document.querySelector('#button').innerHTML = 'GENERATE DATE';
      document.querySelector("#blockdate").innerHTML = timestamp;
      document.querySelector('#easteregg').innerHTML = 'The coinbase message in this block reads `Times 09/Apr/2020 With $2.3T Injection, Fed`s Plan Far Exceeds 2008 Rescue`, echoing the spiritual call-to-action of Satoshi`s genesis block.';
      submitButton.disabled = false;
  }

  else if (blockHeight == 630000) {
    const timestamp = new Date('2020-05-11 19:23:43 utc');
      document.querySelector('#button').innerHTML = 'GENERATE DATE';
      document.querySelector("#blockdate").innerHTML = timestamp;
      document.querySelector('#easteregg').innerHTML = 'First block of subsidy (miner reward) era #4 (6.25 BTC).';
      submitButton.disabled = false;
  }

  else if (blockHeight == 6929999) {
    const heightDifference = blockHeight - currentBlockHeight;
    const minutesInFuture = heightDifference * 10;
    const msInFuture = minutesInFuture * 60000;
    const currentTime = Date.now();
    const futureTime = currentTime + msInFuture;
    const futureTimeFormatted = new Date(futureTime);
    document.querySelector('#button').innerHTML = 'GENERATE DATE';
    document.querySelector('#easteregg').innerHTML = 'This will be the last bitcoin ever mined, completing the 21 million hard-coded distribution schedule.';
    document.querySelector('#blockdate').innerHTML = '~' + ' ' + futureTimeFormatted;
    submitButton.disabled = false;
  }

  else if (blockHeight <= currentBlockHeight && blockHeight > 0) {
    const blockInfoResult = await getBlockInfo(blockHeight);
    const blockDate = new Date(blockInfoResult[0].timestamp * 1000);
    document.querySelector('#button').innerHTML = 'GENERATE DATE';
    document.querySelector('#easteregg').innerHTML = '';
    document.querySelector("#blockdate").innerHTML = blockDate;
    submitButton.disabled = false;
  }

  else if (blockHeight > currentBlockHeight) {
    const heightDifference = blockHeight - currentBlockHeight;
    const minutesInFuture = heightDifference * 10;
    const msInFuture = minutesInFuture * 60000;
    const currentTime = Date.now();
    const futureTime = currentTime + msInFuture;
    const futureTimeFormatted = new Date(futureTime);
    document.querySelector('#button').innerHTML = 'GENERATE DATE';
    document.querySelector('#easteregg').innerHTML = '';
    document.querySelector('#blockdate').innerHTML = '~' + ' ' + futureTimeFormatted;
    submitButton.disabled = false;
  }

  else if (blockHeight < 0) {
    document.querySelector('#button').innerHTML = 'GENERATE DATE';
    document.querySelector('#easteregg').innerHTML = '';
    document.querySelector('#blockdate').innerHTML = 'Block height must not be a negative number.';
    submitButton.disabled = false;
  }

  else {
    document.querySelector('#button').innerHTML = 'GENERATE DATE';
    document.querySelector('#easteregg').innerHTML = '';
    document.querySelector('#blockdate').innerHTML = 'Trouble reaching API, please try again later.';
    submitButton.disabled = false;
  }
};

//HINTS
const hintLink = document.querySelector('#hintlink');
const hints = document.querySelector('#hints');
hintLink.onclick = function hintClick() {
  if (hints.style.display === 'none' || hints.style.display === '') {
    hints.style.display = 'block'
  }
  else {
    hints.style.display = 'none'
  }
};
