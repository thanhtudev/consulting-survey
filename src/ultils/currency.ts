function formatCurrency(value: number): string {
    const formattedValue = (value / 1000000000).toFixed(1); // Làm tròn đến 1 chữ số thập phân
    return `${formattedValue} tỷ`.replace('.', ',').replace(',0', '');
}
export default formatCurrency