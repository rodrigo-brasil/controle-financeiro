export const currencyFormatter = (value) => {
    return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    }).format(value);
}

export const getDateFormatted = (date) => {
    return new Intl.DateTimeFormat('pt-BR', {
        year: 'numeric',
        month: 'long',
    }).format(date);
}