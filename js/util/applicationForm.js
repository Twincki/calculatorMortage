import { Logger } from "./logger/Logger.js";

function form(getData) {
  const data = getData()

  const openFormBtn = document.querySelector("#openFormBtn")
  const orderForm = document.querySelector("#orderForm")
  const submitFormBtn = document.querySelector("#submitFormBtn")

  openFormBtn.addEventListener("click", function () {
    orderForm.classList.remove("none")
    openFormBtn.classList.add("none")
  })

  orderForm.addEventListener("submit", function (event) {
    event.preventDefault();

    // Собираем данные с формы перед disable
    const formData = new FormData(orderForm)

    // Disable для кнопки и input
    submitFormBtn.setAttribute("disabled", true)
    submitFormBtn.textContent = "Заявка отправляется..."
    Logger.info("Application is sent...");

    orderForm.querySelectorAll("input").forEach(function (input) {
      input.setAttribute("disabled", true)
    });


    fetchData()
    async function fetchData() {
      let url = checkOnUrl(document.location.href);

      // Функция убирающая index.html если он есть 
      function checkOnUrl(url) {
        let urlArrayDot = url.split('.');

        if (urlArrayDot[urlArrayDot.length - 1] === 'html') {
          urlArrayDot.pop();
          let newUrl = urlArrayDot.join('.');
          let urlArraySlash = newUrl.split('/');
          urlArraySlash.pop();
          newUrl = urlArraySlash.join('/') + '/';
          return newUrl;
        }
        return url;
      }

      // Делаем запрос 
      const response = await fetch(url + 'mail.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          form: {
            name: formData.get('name'),
            email: formData.get('email'),
            phone: formData.get('phone'),
          },
          data,
        }),
      });

      // Получаем результат запроса 
      const result = await response.text()

      submitFormBtn.removeAttribute("disabled", true)
      submitFormBtn.innerText = "Оформить заявку"

      orderForm.querySelectorAll("input").forEach(function (input) {
        input.removeAttribute("disabled", true)
      });

      // Очищаем поля формы
      orderForm.reset();
      orderForm.classList.add('none');

      // На основе ответа от сервера показываем сообщения об Успехе или Ошибке
      if (result === 'SUCCESS') {
        document.getElementById('success').classList.remove('none');
      } else {
        document.getElementById('error').classList.remove('none');
      }
    }
  })
}

export default form