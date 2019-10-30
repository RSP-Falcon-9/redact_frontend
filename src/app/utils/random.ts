import uuid from "uuid";

export function getNormalizedUUID() {
    return uuid().replace(/-/g, "");
}
