const _Array = {
    /**
     * @see {@link https://stackoverflow.com/a/39000004}
     * @param arr
     * @param result
     */
    flatten: (arr, result: any[] = []) => {
        for (let i = 0, length = arr.length; i < length; i++) {
            const value = arr[i];
            if (Array.isArray(value)) {
                _Array.flatten(value, result);
            } else {
                result.push(value);
            }
        }
        return result;
    },

    range: (a: number, b?: number) => {
        if (b === undefined) {
            b = a;
            a = 0;
        }
        const range: number[] = [];
        for (let elt = a; elt <= b; elt += (b - a) / Math.abs(b - a)) {
            range.push(elt);
        }
        return range;
    }
};
export default _Array;
