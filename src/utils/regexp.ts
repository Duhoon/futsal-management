export function matchNames(str: string) {
    return /^[ㄱ-ㅎ가-힣0-9a-zA-Z\s]*$/g.test(str);
}
