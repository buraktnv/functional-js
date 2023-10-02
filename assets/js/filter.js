function handleCheckboxes(form, checkboxData) {
  const checkboxes = form.querySelectorAll("input[type=checkbox]");

  checkboxes.forEach((checkbox) => {
    checkbox.addEventListener("change", (event) => {
      const { name, value, checked } = event.target;

      if (checked) {
        if (!checkboxData[name]) {
          checkboxData[name] = [];
        }
        checkboxData[name].push(value);
      } else {
        const valueIndex = checkboxData[name].indexOf(value);
        if (valueIndex > -1) {
          checkboxData[name].splice(valueIndex, 1);
        }
      }
    });
  });
}

function handleSubmit(event, form, checkboxData) {
  event.preventDefault();

  const formData = new FormData(form);
  const formDataObject = Object.fromEntries(formData);

  const combinedData = { ...formDataObject, ...checkboxData };

  console.log(combinedData);

  form.reset();

  checkboxData = {};
}

function logFormData(form, checkboxData) {
  const formData = new FormData(form);
  const formDataObject = Object.fromEntries(formData);

  const combinedData = { ...formDataObject, ...checkboxData };

  console.log(combinedData);
}

function onChangeConsoleLog(form, checkboxData) {
  const inputs = form.querySelectorAll("input");

  inputs.forEach((input) => {
    input.addEventListener("change", (event) => {
      console.log(
        `Something Changed in ${event.target.name}, ${event.target.value}`
      );
      logFormData(form, checkboxData);
    });
  });
}

function areAllCheckboxGroupsChecked(groups) {
  return Array.from(groups).every((group) => {
    const checkboxes = group.querySelectorAll("input[type=checkbox]");
    return Array.from(checkboxes).some((checkbox) => checkbox.checked);
  });
}

function initFormHandler(formId) {
  const form = document.getElementById(formId);
  const checkboxData = {};
  const submitButton = form.querySelector("button[type=submit]");
  const checkboxGroups = form.querySelectorAll(".filter-card__input-group");
  const locationInput = form.querySelector(".input.-location");

  form.addEventListener("submit", (event) => {
    handleSubmit(event, form, checkboxData);
  });

  handleCheckboxes(form, checkboxData);
  onChangeConsoleLog(form, checkboxData);

  // Add an event listener to check the form's validity on checkbox change
  checkboxGroups.forEach((group) => {
    group.addEventListener("change", () => {
      if (
        areAllCheckboxGroupsChecked(checkboxGroups) &&
        locationInput.value.trim() !== ""
      ) {
        submitButton.disabled = false;
      } else {
        submitButton.disabled = true;
      }
    });
  });

  // Add an event listener to check the form's validity when the location input changes
  locationInput.addEventListener("input", () => {
    if (
      areAllCheckboxGroupsChecked(checkboxGroups) &&
      locationInput.value.trim() !== ""
    ) {
      submitButton.disabled = false;
    } else {
      submitButton.disabled = true;
    }
  });

  // Initialize the submit button state based on the initial form state
  if (
    !areAllCheckboxGroupsChecked(checkboxGroups) ||
    locationInput.value.trim() === ""
  ) {
    submitButton.disabled = true;
  }
}

initFormHandler("filter-card");
