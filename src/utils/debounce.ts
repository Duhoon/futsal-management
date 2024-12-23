export const debounce = <T, Z extends (...args: T[]) => void>(
    fn: Z,
    delay: number = 300,
) => {
    let timeout: ReturnType<typeof setTimeout>;

    return (...args: Parameters<Z>): void => {
        if (timeout) clearTimeout(timeout);
        timeout = setTimeout(() => {
            fn(...args);
        }, delay);
    };
};
