class FormValidator {
    constructor(settings, formEl) {
        this._inputSelector = settings.inputSelector;
        this._formSelector = settings.formSelector
        this._submitButtonSelector = settings.submitButtonSelector;
        this._errorClass = settings._errorClass;
        this._inputErrorClass = settings.inputErrorClass;
        this._inactiveButtonClass = settings.inactiveButtonClass;
        this._formEl = formEl;
    }

    _showInputError(inputElement) {
        const errorElement = this._formEl.querySelector(`#${inputElement.id}-error`);
        console.log(`Showing error for ${inputElement.name}: ${inputElement.validationMessage}`);
        inputElement.classList.add(this._inputErrorClass);
        errorElement.textContent = inputElement.validationMessage;
        errorElement.classList.add(this._errorClass);
        console.log(`Error message set: ${errorElement.textContent}`); // Log the set message
    }

    _hideInputError(inputElement) {
        const errorElement = this._formEl.querySelector(`#${inputElement.id}-error`);
        inputElement.classList.remove(this._inputErrorClass);
        errorElement.textContent = "";
        errorElement.classList.remove(this._errorClass);
    }

    _checkInputValidity(inputElement) {
        if (!inputElement.validity.valid) {
            this._showInputError(inputElement);
          } 
          else {
            this._hideInputError(inputElement);
          }
    }

    _toggleButtonState() {
        const isFormValid = this._inputList.every((inputElement) =>
            inputElement.validity.valid
        );

        if (isFormValid) {
            this._submitButton.classList.remove(this._inactiveButtonClass);
            this._submitButton.disabled = false;
          } else {
            this._submitButton.classList.add(this._inactiveButtonClass);
            this._submitButton.disabled = true;
          }
    }

    _setEventListeners() {
        this._inputList = Array.from(
            this._formEl.querySelectorAll(this._inputSelector),
          );

        this._submitButton = this._formEl.querySelector(this._submitButtonSelector);
        
        this._toggleButtonState();
        
        this._inputList.forEach((inputElement) => {
            inputElement.addEventListener("input", () => {
              this._checkInputValidity(inputElement);
              this._toggleButtonState();
            });
          });
    }

    enableValidation() {
        this._formEl.addEventListener("submit", (evt) => {
            evt.preventDefault();
  });
        this._setEventListeners();
    }
}

export default FormValidator;