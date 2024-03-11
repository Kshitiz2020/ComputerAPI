"use strict";

(function () {
  let idField;
  let nameField;
  let typesField;
  let amountField;
  let processorField;
  let resultarea;

  let searchState = true;

  document.addEventListener("DOMContentLoaded", init);

  function init() {
    idField = document.getElementById("ID");
    nameField = document.getElementById("name");
    typesField = document.getElementById("types");
    amountField = document.getElementById("amount");
    processorField = document.getElementById("processor");

    resultarea = document.getElementById("resultarea");

    updateFieldsAccess();
    document.getElementById("submit").addEventListener("click", send);

    document.getElementById("clear").addEventListener("click", reset);

    idField.addEventListener("focus", clearAll);
  } //end of init

  function reset() {
    searchState = true;
    clearAll();
  }

  function clearAll() {
    if (searchState) {
      idField.value = "";
      nameField.value = "";
      typesField.value = "";
      amountField.value = "";
      processorField.value = "";
      resultarea.textContent = "";
      resultarea.removeAttribute("class");
      updateFieldsAccess();
    }
  } //end of clearAll

  function updateFieldsAccess() {
    if (searchState) {
      idField.removeAttribute("readonly");
      nameField.setAttribute("readonly", true);
      typesField.setAttribute("readonly", true);
      amountField.setAttribute("readonly", true);
      processorField.setAttribute("readonly", true);
    } else {
      idField.setAttribute("readonly", true);
      nameField.removeAttribute("readonly");
      typesField.removeAttribute("readonly");
      amountField.removeAttribute("readonly");
      processorField.removeAttribute("readonly");
    }
  } //updateFieldsAccess

  async function send() {
    const baseUri = "http://localhost:4000/rest/computer";
    try {
      if (searchState) {
        //get data
        const data = await fetch(`${baseUri}/id/${idField.value}`, {
          mode: "cors",
        });
        const result = await data.json();
        if (result.length > 0) {
          const computer = result[0];
          idField.value = computer.id;
          nameField.value = computer.name;
          typesField.value = computer.types;
          amountField.value = computer.amount;
          processorField.value = computer.gear;
          searchState = false;
          updateFieldsAccess();
        } else {
          updateStatus({ message: "Nothing found", type: "error" });
        }
      } else {
        //put data
        const computer = {
          id: +idField.value,
          name: nameField.value,
          types: +typesField.value,
          amount: amountField.value,
          processor: processorField.value,
        };
        const options = {
          method: "PUT",
          mode: "cors",
          body: JSON.stringify(computer),
          headers: { "Content-Type": "application/json" },
        };
        const data = await fetch(`${baseUri}/${computer.id}`, options);
        const result = await data.json();

        updateStatus(result);
      }
    } catch (error) {
      updateStatus({ message: error.message, type: "error" });
    }
  } //end of send
  function updateStatus(status) {
    resultarea.textContent = status.message;
    resultarea.setAttribute("class", status.type);
  }

  function updateStatus(status) {
    resultarea.textContent = status.message;
    resultarea.setAttribute("class", status.type);
  }
})();
