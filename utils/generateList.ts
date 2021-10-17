export default function generateList(start: number, end: number): Array<number> {
    const result = [];
    for (let i = start; i <= end; i++) {
        result.push(i);
    }
    return result;
}