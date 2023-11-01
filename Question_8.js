function countMinutes(timeStr) {
    let num1 = "", num2 = "";
    let hr1 = "", hr2 = "", min1 = "", min2 = "";
    let index = timeStr.indexOf('-');
    let colon = false;

    for (let x = 0; x < timeStr.length; x++) {
        if (x >= index) {
            colon = false;
            for (x; x < timeStr.length; x++) {
                if (timeStr[x] === ':') {
                    colon = true;
                    continue;
                }

                if (timeStr[x] === 'A' || timeStr[x] === 'P') {
                    num2 += timeStr[x];
                    num2 += timeStr[x + 1];
                }

                if (colon && !isNaN(timeStr[x])) {
                    min2 += timeStr[x];
                } else if (!isNaN(timeStr[x])) {
                    hr2 += timeStr[x];
                }
            }
        } else {
            if (timeStr[x] === ':') {
                colon = true;
                continue;
            }

            if (timeStr[x] === 'A' || timeStr[x] === 'P') {
                num1 += timeStr[x];
                num1 += timeStr[x + 1];
            }

            if (colon && !isNaN(timeStr[x])) {
                min1 += timeStr[x];
            } else if (!isNaN(timeStr[x])) {
                hr1 += timeStr[x];
            }
        }
    }

    let hr = 0;
    if (parseInt(hr1) === parseInt(hr2) && num1 === num2 && parseInt(min1) > parseInt(min2)) {
        hr = 24 - (parseInt(hr1) - parseInt(hr2));
    } else if (parseInt(hr1) > parseInt(hr2) && num1 === num2 && parseInt(min1) < parseInt(min2)) {
        hr = 24 - (parseInt(hr1) - parseInt(hr2));
    } else if (num1 === num2 || (hr2 === "12" && hr1 !== "12")) {
        hr = parseInt(hr2) - parseInt(hr1);
    } else {
        hr = (12 - parseInt(hr1)) + parseInt(hr2);
    }

    let time;
    if (min1 !== "00") {
        time = (hr * 60 - parseInt(min1)) + parseInt(min2);
    } else {
        time = (hr * 60 + parseInt(min1)) + parseInt(min2);
    }

    return time;
}

console.log("Minutes between 12:01AM to 12:00PM: ", countMinutes("12:01PM-12:00PM"));
console.log("Minutes between 2:12AM to 2:8AM: ", countMinutes("2:12AM-2:8AM"));
console.log("Minutes between 1:04PM to 1:29PM: ", countMinutes("1:04PM-1:29PM"));
console.log("Minutes between 2:00PM to 10:00PM: ", countMinutes("2:00PM-10:00PM"));