class LoadingIndicator extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.render();
  }

  show() {
    this.style.display = "flex";
  }

  hide() {
    this.style.display = "none";
  }

  render() {
    this.innerHTML = `
            <div class="loading-container">
                <div class="spinner"></div>
                <p>Loading...</p>
            </div>

            <style>
                .loading-container {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background-color: rgba(255, 255, 255, 0.8);
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                    z-index: 1000;
                }

                .spinner {
                    width: 50px;
                    height: 50px;
                    border: 5px solid var(--secondary-color);
                    border-top: 5px solid var(--primary-color);
                    border-radius: 50%;
                    animation: spin 1s linear infinite;
                }

                @keyframes spin {
                    0% {
                        transform: rotate(0deg);
                    }

                    100% {
                        transform: rotate(360deg);
                    }
                }
            </style>
        `;

    this.style.display = "none";
  }
}

customElements.define("loading-indicator", LoadingIndicator);
