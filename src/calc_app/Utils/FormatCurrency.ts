export interface FormatCurrencyConfig{
  decimals?:0|1|2;
  locale?:string, 
  currency?:string
  [key:string]:any
}


export default function FormatCurrency(amount:number, config:FormatCurrencyConfig = {}):string {
  const {decimals = 2, locale = 'es-MX', currency = 'MXN', ...conf} = config
  const currency_value = new Intl.NumberFormat(locale, {
    // style: 'currency',
    // currency: currency,
    minimumFractionDigits:decimals,
    maximumFractionDigits: 2,
    ...conf
  }).format(amount);
  return `$${currency_value.toUpperCase().replace(' ','')}`
};