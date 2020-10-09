export const numeral = (num) => {
    if(num / 1000 >= 1) {
        return `${num / 1000}k`
    } else {
        return num
    }
}