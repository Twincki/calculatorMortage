export function debounce(func: Function, delay = 150) {
  // Переменная для хранения отложенного таймаута
  let timer: ReturnType<typeof setTimeout>;

  // Возврщаем функцию, которая будет замыкаться на timer
  return function (...args: unknown[]) {
    // Создаём функцию, которая содержит данные от передаваемой фукциии
    // Для последующего вызова. В том случае, если передаются и аргумент -- передаём их
    const debounceCallbacks = () => func(...args);

    // Если в timer записана функция, и debounce вызвана, значит функцию вызывать нельзя
    // Мы должны её перезаписать, а для этого очистить память -- удалить предыдущий таймаут
    clearTimeout(timer);

    // Записываем новый таймаут с функцией для отложенного вызова
    timer = setTimeout(debounceCallbacks, delay);
  };
}
