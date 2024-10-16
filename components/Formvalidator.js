class FormValidator {
    constructor(settings, formEl) {
        this._settings = settings;
        this._formEl = formEl;

        this._inputSelector = settings.inputSelector;
        this._submitButtonSelector = settings.submitButtonSelector;

        this._formSelector = settings.formSelector;

        this._errorClass = settings.errorClass;
        this._inputErrorClass = settings.inputErrorClass;
        this._inactiveButtonClass = settings.inactiveButtonClass;

        this._inputList = Array.from(this._formEl.querySelectorAll(this._settings.inputSelector));
        this._submitButton = this._formEl.querySelector(this._submitButtonSelector);
    }

    resetValidation() {

      this._formEl.reset();

      this._inputList.forEach((inputElement) => {
        this._hideInputError(inputElement);
      });
      this._disableSubmitButton();
    }

    _showInputError(inputElement) {
        const errorElement = this._formEl.querySelector(`#${inputElement.id}-error`);
        inputElement.classList.add(this._inputErrorClass);
        inputElement.classList.add(this._errorClass);
        errorElement.textContent = inputElement.validationMessage;
        errorElement.classList.add(this._errorClass);
    }

    _hideInputError(inputElement) {
        const errorElement = this._formEl.querySelector(`#${inputElement.id}-error`);
        inputElement.classList.remove(this._inputErrorClass);
        errorElement.textContent = "";
        errorElement.classList.remove(this._errorClass);
    }

    _disableSubmitButton() {
      this._submitButton.disabled = true;
      this._submitButton.classList.add(this._settings.inactiveButtonClass);
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
            this._disableSubmitButton();
          }
    }

    _setEventListeners() {        
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

    isValid() {
      return this._inputList.every((inputElement) => inputElement.validity.valid);
    }
}

export default FormValidator;