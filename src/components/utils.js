import {format, formatDistanceToNowStrict} from 'date-fns'

function stringToColor(string) {
    let hash = 0;
    let i;

    /* eslint-disable no-bitwise */
    for (i = 0; i < string.length; i += 1) {
        hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }

    let color = '#';

    for (i = 0; i < 3; i += 1) {
        const value = (hash >> (i * 8)) & 0xff;
        color += `00${value.toString(16)}`.slice(-2);
    }
    /* eslint-enable no-bitwise */

    return color;
}

export function stringAvatar(name) {
    return {
        sx: {
            bgcolor: stringToColor(name),
            width: 30, height: 30,
            fontSize: 15,
        },
        children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
    };
}

export function getTimeDiff(time) {
    const target = new Date(time);
    return formatDistanceToNowStrict(target);
}

export function parseDate(time) {
    const target = new Date(time);
    console.log(target, time);
    return format(target, 'MMM dd yyyy');
}







