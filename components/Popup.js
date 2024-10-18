class Popup {
    constructor(popupSelector) {
        this.popupElement = document.querySelector(popupSelector);
        this._popupCloseBtn = this.popupElement.querySelector(".popup__close");
        this._popupContent = this.popupElement.querySelector(".popup__content");
        this._handleEscapeClose = this._handleEscapeClose.bind(this);
        }
    
        _handleEscapeClose(evt) {
            if (evt.key === 'Escape') {
                this.close();
            }
        }

    open() {
        this.popupElement.classList.add("popup_visible");
        document.addEventListener("keyup", this._handleEscapeClose);
    }

    close() {
        this.popupElement.classList.remove("popup_visible");
        document.removeEventListener("keyup", this._handleEscapeClose);
    }

    setEventListeners() {
        this.popupElement.addEventListener("mousedown", (evt) => {
            if (evt.target === this.popupElement || evt.target.classList.contains("popup__close")) {
                this.close();
            }
        });
    }
}

export default Popup;