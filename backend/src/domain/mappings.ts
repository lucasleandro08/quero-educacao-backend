export const KIND_MAPPINGS = {
    'Presencial' : 'Presencial',
    'presencial' : 'Presencial',
    'EaD' : 'EaD',
    'ead' : 'EaD'
} as const;

export const LEVEL_MAPPINGS  = {
    'bacharelado': 'Graduação (bacharelado)',
    'tecnologo': 'Graduação (tecnólogo)',
    'licenciatura': 'Graduação (licenciatura)'
} as const;

export const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR',{
        style: 'currency',
        currency : 'BRL'
    }).format(value);
};

export const calculateDiscountPercentage = (fullPrice:number, offeredPrice : number) : string => {
    const discount = Math.round(((fullPrice - offeredPrice)/fullPrice)*100);
    return `${discount}%`
}