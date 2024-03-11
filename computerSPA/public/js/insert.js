"use strict";

(function () {
  let idField;
  let nameField;
  let typesField;
  let amountField;
  let processorField;
  let resultarea;

  document.addEventListener("DOMContentLoaded", init);

  function init() {
    resultarea = document.getElementById("resultarea");
    idField = document.getElementById("heroID");
    nameField = document.getElementById("name");
    typesField = document.getElementById("types");
    amountField = document.getElementById("amount");
    processorField = document.getElementById("processor");

    document.getElementById("submit").addEventListener("click", send);

    idField.addEventListener("focus", clear);
  }

  function clear() {
    idField.value = "";
    nameField.value = "";
    typesField.value = "";
    amountField.value = "";
    processorField.value = "";
    resultarea.textContent = "";
    resultarea.removeAttribute("class");
  }

  async function send() {
    const computer = {
      id: +idField.value,
      name: nameField.value,
      types: +types.value,
      amount: amountField.value,
      processor: processorField.value,
    };

    try {
      const options = {
        method: "POST",
        body: JSON.stringify(computer),
        headers: { "Content-Type": "application/json" },
        mode: "cors",
      };
      const data = await fetch("http://localhost:4000/rest/computer", options);
      const result = await data.json();

      updateStatus(result);
    } catch (err) {
      updateStatus({ message: err.message, type: "error" });
    }
  } //end of send

  function updateStatus(status) {
    resultarea.textContent = status.message;
    resultarea.setAttribute("class", status.type);
  }
})();
