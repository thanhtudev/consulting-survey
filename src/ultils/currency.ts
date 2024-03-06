function formatCurrency(value: number): string {
    const val : number = Math.abs(value)
    console.log(val)
    let formattedValue = ''
    if (val >= 1000000000) {
        formattedValue = (val / 1000000000).toFixed(1).replace('.0', '') + ' tỷ'
    } else if (val >= 1000000) {
        formattedValue = (val / 1000000).toFixed(1) + ' triệu'
    } else {
        return '0'
    }
    return formattedValue.replace('.',',')
}
export default formatCurrency