import { APP_CONFIG } from "../../config/config";


function base_convert(number: number, frombase: number, tobase: number) { // eslint-disable-line camelcase
    // discuss at: https://locutus.io/php/base_convert/
    // example 1: base_convert('A37334', 16, 2)
    // returns 1: '101000110111001100110100'
    // example 2: base_convert(596608, 10, 36)
    // returns 2: 'cscg'
    return parseInt(number + '', frombase | 0).toString(tobase | 0)
}

function userAvatar(userId: number) {
    if (userId > 0) {
        return APP_CONFIG.IMAGE_BASE_URL + `avatars/ua${base_convert(userId, 10, 36)}.png`;
    }
    // return 'holder.js/64x64/';
    return '';
}



function timeAgoFromTimeStamp(timestampInMili: number) {
    const fromDate = new Date(timestampInMili);
    return timeAgo(fromDate)
}

function timeAgoFromDate(date: string) {
    const fromDate = new Date(date);
    return timeAgo(fromDate)
}

function timeAgo(fromDate: Date) {
    const currentDate = new Date()
    var seconds = Math.ceil((currentDate.getTime() - fromDate.getTime()) / 1000);
    var interval = seconds / 31536000;

    if (interval >= 1) {
        return Math.ceil(interval) + ` year${interval == 1 ? '' : 's'} ago`;
    }
    interval = seconds / 2592000;
    if (interval >= 1) {
        return Math.ceil(interval) + ` month${interval == 1 ? '' : 's'} ago`;
    }
    interval = seconds / 86400;
    if (interval >= 1) {
        return Math.ceil(interval) + ` day${interval == 1 ? '' : 's'} ago`;
    }
    interval = seconds / 3600;
    if (interval >= 1) {
        return Math.ceil(interval) + ` hour${interval == 1 ? '' : 's'} ago`;
    }
    interval = seconds / 60;
    if (interval >= 1) {
        return Math.ceil(interval) + ` minute${interval == 1 ? '' : 's'} ago`;
    }
    const secondAgo = Math.ceil(seconds);
    if (isNaN(secondAgo)) { return "Invalid date"; }
    return secondAgo + ` second${interval == 1 ? '' : 's'} ago`;
}

function numberFormat(num: number) {
    return num.toLocaleString("en-US", { style: "decimal", currency: "USD" });
}

function nl2br(str: string, is_xhtml?: boolean) { //new line to br tag
    const breakTag = (is_xhtml || typeof is_xhtml === 'undefined') ? '<br />' : '<br>';
    return (str + '').replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g, '$1' + breakTag + '$2');
}

export {
    userAvatar,
    timeAgo,
    timeAgoFromDate,
    timeAgoFromTimeStamp,
    numberFormat,
    nl2br,
    base_convert,
}