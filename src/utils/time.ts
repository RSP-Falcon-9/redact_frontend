import moment from "moment";

export function dateToFormDate(date: Date) {
    return moment(date).format("YYYY-MM-DD");
}

export function normalizedTime(time: string) {
    return moment(time, "hh:mm").format("hh:mm:ss");
}
