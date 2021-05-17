import axios from "axios";
import * as EmailValidator from "email-validator";
export function IntToIndianStringFormat(count) {
    if (!count) {
        count = 0;
    }
    count = count.toString();
    let lastThree = count.substring(count.length - 3);
    let otherNumbers = count.substring(0, count.length - 3);
    if (otherNumbers !== "") lastThree = "," + lastThree;
    return otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + lastThree;
}

export function getThumbnail(videoId) {
    return `https://img.youtube.com/vi/${videoId}/0.jpg`;
}

function createArray(n) {
    let arr = new Array(n);
    let b = 0;
    while (b < n) {
        arr[b++] = b - 1;
    }
    return arr;
}
function sample(arr) {
    const randInt = Math.floor(Math.random() * arr.length);
    const ele = arr[randInt];
    arr.splice(randInt, 1);
    return [ele, arr];
}
export function randomize(arr, n) {
    const LEN = arr.length;
    let newArr = [];
    let allIndexes = createArray(LEN);
    let NEW_LEN = 0;

    if (n === 0) {
        return [];
    }

    if ((Boolean(n) && LEN >= n) || !n) {
        let index = 0;
        while (true) {
            const res = sample(allIndexes);
            allIndexes = res[1];
            index = res[0];
            newArr.push(arr[index]);
            NEW_LEN++;
            if ((n && NEW_LEN >= n) || NEW_LEN >= LEN) {
                break;
            }
        }
        return newArr;
    }
    return [];
}

export function capitalizeFirstLetter(str) {
    return str.substring(0, 1).toUpperCase() + str.substring(1);
}

export function capitalize(str) {
    return str
        .split(" ")
        .map((word) => capitalizeFirstLetter(word))
        .join(" ");
}

/**
 * fetch Playlist
 */

export async function getPlaylist(current_user, dataDispatch) {
    try {
        const res = await axios.get(
            `https://mockdata.uditkumar01.repl.co/user/${current_user._id}`
        );

        const { playlists } = res.data.user;
        console.log("focus", playlists);
        dataDispatch({
            type: "PLAYLIST_REFRESH",
            payload: playlists ? playlists : [],
        });
    } catch (err) {
        console.log(err.message, current_user._id);
    }
}

/**
 * auth check handlers
 */

export const handlePasswordChars = (checkText) => {
    if (checkText.length !== 0 && checkText.length < 8) {
        return { type: "warning", msg: "Too Short" };
    } else if (checkText.match(/[A-Za-z]+/g) && checkText.match(/[\d]+/g)) {
        return {};
    } else if (checkText.match(/[A-Za-z]+/g)) {
        return { type: "warning", msg: "Digit missing" };
    } else if (checkText.match(/[\d]+/g)) {
        return { type: "warning", msg: "Char missing" };
    }
    return {};
};
export const handlePasswordCheckPasswordEquality = (
    password,
    confirmPassword
) => {
    if (password !== confirmPassword) {
        return { type: "danger", msg: "Password doesn't match" };
    }
    return {};
};
export const isEmail = (checkText) => {
    return checkText === ""
        ? {}
        : EmailValidator.validate(checkText)
        ? {}
        : { type: "danger", msg: "Not a vaild Email" };
};
