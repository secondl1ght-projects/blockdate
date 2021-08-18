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

//main functionality
const submitButton = document.querySelector("#button");
const blockHeightInput = document.querySelector("#blockheight");

submitButton.onclick = async function handleOnClick() {
  const blockHeight = blockHeightInput.value;
  const currentBlockHeight = await getBlockHeight();

  if (blockHeight <= currentBlockHeight && blockHeight > 0) {
    const blockInfoResult = await getBlockInfo(blockHeight);
    const blockDate = new Date(blockInfoResult.time);
    document.querySelector("#blockdate").innerHTML = blockDate;
  }

  else if (blockHeight > currentBlockHeight) {
    const heightDifference = blockHeight - currentBlockHeight;
    const minutesInFuture = heightDifference * 10;
    const msInFuture = minutesInFuture * 60000;
    const currentTime = Date.now();
    const futureTime = currentTime + msInFuture;
    const futureTimeFormatted = new Date(futureTime);
    document.querySelector('#blockdate').innerHTML = '~' + ' ' + futureTimeFormatted;
  }

  else {
    document.querySelector('#blockdate').innerHTML = 'Block height must be greater than zero.';
  }
};
