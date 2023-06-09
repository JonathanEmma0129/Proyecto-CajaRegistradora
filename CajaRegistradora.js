function checkCashRegister(price, cash, cid) {
  var denominations = [
    { name: "PENNY", value: 0.01 },
    { name: "NICKEL", value: 0.05 },
    { name: "DIME", value: 0.1 },
    { name: "QUARTER", value: 0.25 },
    { name: "ONE", value: 1 },
    { name: "FIVE", value: 5 },
    { name: "TEN", value: 10 },
    { name: "TWENTY", value: 20 },
    { name: "ONE HUNDRED", value: 100 }
  ];

  var change = cash - price;

  var totalCash = cid.reduce((acc, curr) => acc + curr[1], 0);

  if (totalCash < change) {
    return { status: "INSUFFICIENT_FUNDS", change: [] };
  }

  if (totalCash === change) {
    return { status: "CLOSED", change: cid };
  }

  var changeToGive = [];
  for (var i = denominations.length - 1; i >= 0; i--) {
    var denomination = denominations[i];
    var denominationValue = 0;

    while (change >= denomination.value && cid[i][1] > 0) {
      change -= denomination.value;
      cid[i][1] -= denomination.value;
      denominationValue += denomination.value;
      change = Math.round(change * 100) / 100;
    }

    if (denominationValue > 0) {
      changeToGive.push([denomination.name, denominationValue]);
    }
  }

  if (change > 0) {
    return { status: "INSUFFICIENT_FUNDS", change: [] };
  }

  return { status: "OPEN", change: changeToGive };
}