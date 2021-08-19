//Blockcypher api to get block date information for current and historical blocks
async function getBlockInfo(height) {
  return new Promise(async (resolve, reject) => {
    const xhr = new XMLHttpRequest();

    const url = `https://api.blockcypher.com/v1/btc/main/blocks/${height}?txstart=1&limit=1`;

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

    const url = `https://api.blockcypher.com/v1/btc/main`;

    xhr.responseType = "json";

    xhr.onreadystatechange = () => {
      if (xhr.readyState === XMLHttpRequest.DONE) {
        resolve(xhr.response.height);
      } else {
        return "Trouble reaching the Blockcypher API.";
      }
    };

    xhr.open("GET", url);

    xhr.send();
  });
}

//h2 information
async function currentHeightInterval() {
  let height = await getBlockHeight();
  return document.querySelector('#current').innerHTML = 'CURRENT BLOCK HEIGHT: ' + height;
}
currentHeightInterval();
//let heightInterval = setInterval(currentHeightInterval(), 60000);

//main functionality
const submitButton = document.querySelector("#button");
const blockHeightInput = document.querySelector("#blockheight");

submitButton.onclick = async function handleOnClick() {
  submitButton.disabled = true;
  document.querySelector('#button').innerHTML = 'LOADING';
  await currentHeightInterval();
  const blockHeight = blockHeightInput.value;
  const currentBlockHeight = await getBlockHeight();

  if (blockHeight <= currentBlockHeight && blockHeight > 0) {
    const blockInfoResult = await getBlockInfo(blockHeight);
    const blockDate = new Date(blockInfoResult.time);
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

  else if (blockHeight == 0) {
  const genesisBlock = new Date('2009-01-03 18:15:05 utc');
    document.querySelector('#button').innerHTML = 'GENERATE DATE';
    document.querySelector("#blockdate").innerHTML = genesisBlock;
    document.querySelector('#easteregg').innerHTML = 'This is the first block in the bitcoin blockchain, known as the Genesis Block. This block was mined by Satoshi Nakamoto.';
    submitButton.disabled = false;
  }

  else {
    document.querySelector('#button').innerHTML = 'GENERATE DATE';
    document.querySelector('#easteregg').innerHTML = '';
    document.querySelector('#blockdate').innerHTML = 'Block height must not be a negative number.';
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
