/**
 * Округляет число до целого
 * 872.2737572636586 => 872
 * 872.00472898536 => 872
 * 872.0255898536 => 872
 */

export function roundNumber(number, locale = "ru-RU") {
  const formatter = Intl.NumberFormat(locale, {
    style: "currency",
    currency: "RUB",
    maximumFractionDigits: 0,
  })

  return formatter.format(number);
}
