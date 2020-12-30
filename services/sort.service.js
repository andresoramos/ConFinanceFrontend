export const orderArr = (arr, returnArr, i) => {
  if (i === arr.length) {
    return returnArr;
  }

  if (returnArr.length === 0) {
    returnArr.push(arr[0]);
    return orderArr(arr, returnArr, i + 1);
  }

  if (arr[i].ts > returnArr[0].ts) {
    returnArr.unshift(arr[i]);
    return orderArr(arr, returnArr, i + 1);
  }
  if (arr[i].ts < returnArr[returnArr.length - 1].ts) {
    returnArr.push(arr[i]);
    return orderArr(arr, returnArr, i + 1);
  }
  for (var j = 0; j < returnArr.length; j++) {
    if (returnArr[j].ts === arr[i].ts) {
      returnArr.splice(j, 0, arr[i]);
      return orderArr(arr, returnArr, i + 1);
    }
    if (arr[i].ts < returnArr[j].ts && arr[i].ts > returnArr[j + 1].ts) {
      returnArr.splice(j + 1, 0, arr[i]);
      return orderArr(arr, returnArr, i + 1);
    }
  }
};
