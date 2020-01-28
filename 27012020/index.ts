export {};

const getPrimos = (limit: number): any => {
    const primos = []
    for (let i = 2; i < limit; i++) {
        let isPrimo = true; 
        for (let j = 2; j < i; j++) {
            if (i % j === 0) {
                isPrimo = false
                break;
            }
        }
        isPrimo && primos.push(i)
    }
    return primos
}
  
const primos = getPrimos(100)

const expected = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97]
expected.forEach((elementExpected: number, index: number): void => {
    const elementPrimos = primos[index]
    if (elementExpected !== elementPrimos) throw 'NOT!'
})
console.log('Success');