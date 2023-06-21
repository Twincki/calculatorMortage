function form() {
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
    submitFormBtn.innerText = "Заявка отправляется..."
  })
}

export default form