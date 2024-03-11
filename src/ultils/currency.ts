export function formatCurrency(value: number): string {
    let formattedValue = ''
    if (value >= 1000000000) {
        formattedValue = (value / 1000000000).toFixed(1).replace('.0', '') + ' tỷ'
    } else if (value >= 1000000) {
        formattedValue = (value / 1000000).toFixed(1).replace('.0', '') + ' triệu'
    } else {
        return '0'
    }
    return formattedValue.replace('.',',')
}

export function formatFinalCurrency(value: number) {
    const val : number = Math.abs(value)
    const prefix = (value > 0) ? 'Dư ' : 'Thiếu '
    const suffix = (val >= 1000000000) ? ' tỷ' : ' triệu'
    let str = '0'
    if (val >= 1000000000) {
        str = (val / 1000000000).toFixed(1).replace('.0', '')
    } else if (val >= 1000000) {
        str = (val / 1000000).toFixed(1).replace('.',',')
    }
    return {
        prefix,
        suffix,
        str
    }
}