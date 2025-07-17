export interface FormatCurrencyConfig{
  decimals?:0|1|2;
  locale?:string, 
  currency?:string
}


export default function FormatCurrency(amount:number, config:FormatCurrencyConfig = {}):string {
  const {decimals = 2, locale = 'es-MX', currency = 'MXN'} = config
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currency,
    minimumFractionDigits:decimals,
    maximumFractionDigits: 2,
  }).format(amount);
};