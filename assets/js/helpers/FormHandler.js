export class FormHandler {
  constructor(formId) {
    this.form = document.getElementById(formId);
    this.form.addEventListener("submit", this.handleSubmit.bind(this));
    this.checkboxData = {};
    this.handleCheckboxes();
    this.onChangeConsoleLog();
  }

  areAllFieldsEmpty() {
    const inputs = this.form.querySelectorAll("input");
    let allEmpty = true;

    inputs.forEach((input) => {
      if (input.type !== "checkbox") {
        if (input.value.trim() !== "") {
          allEmpty = false;
        }
      } else {
        if (input.checked) {
          allEmpty = false;
        }
      }
    });

    return allEmpty;
  }

  handleCheckboxes() {
    const checkboxes = this.form.querySelectorAll("input[type=checkbox]");

    /* Event Delegation */
    checkboxes.forEach((checkbox) => {
      checkbox.addEventListener("change", (event) => {
        const { name, value, checked } = event.target;

        // If the checkbox is checked, add its value to the array
        // If it's unchecked, remove its value from the array
        if (checked) {
          if (!this.checkboxData[name]) {
            this.checkboxData[name] = [];
          }
          this.checkboxData[name].push(value);
        } else {
          const valueIndex = this.checkboxData[name].indexOf(value);
          if (valueIndex > -1) {
            this.checkboxData[name].splice(valueIndex, 1);
          }
        }
      });
    });
  }

  handleSubmit(event) {
    event.preventDefault();

    if (this.areAllFieldsEmpty()) {
      console.error("All fields are empty");
      return;
    }

    const formData = new FormData(this.form);
    const formDataObject = Object.fromEntries(formData);

    const combinedData = { ...formDataObject, ...this.checkboxData };

    console.log(combinedData);

    this.form.reset();

    this.checkboxData = {};
  }

  /* Development */
  logFormData() {
    const formData = new FormData(this.form);
    const formDataObject = Object.fromEntries(formData);

    const combinedData = { ...formDataObject, ...this.checkboxData };

    console.log(combinedData);
  }

  onChangeConsoleLog() {
    const inputs = this.form.querySelectorAll("input");

    inputs.forEach((input) => {
      input.addEventListener("change", (event) => {
        console.log(
          `Something Changed in ${event.target.name}, ${event.target.value}`
        );
        this.logFormData();
      });
    });
  }
}
