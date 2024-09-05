import { LitElement, html, css } from 'lit';

class ModalDialog extends LitElement {
  static styles = css`
    .modal {
      display: block;
      position: fixed;
      z-index: 1;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.5);
    }

    .modal-content {
      background-color: #fff;
      margin: 15% auto;
      padding: 20px;
      border: 1px solid #888;
      width: 80%;
      text-align: center;
      border-radius: 20px;
      border: 0px;
    }

    .btnCerrar {
      width: 125px;
      height: 34px;
      border-radius: 10px;
      border: 0px;
      background: #34a853;
      color: white;
      font-size: 15px;
      font-weight: 600;
    }
  `;

  render() {
    return html`
      <div class="modal">
        <div class="modal-content">
          <h3>Pokémón Repetido</h3>
          <p>Haz marcado este Pokémon como repetido. Por favor, visita el punto más cercano para solucionarlo.</p>
          <button class="btnCerrar" @click=${this.closeModal}>Cerrar</button>
        </div>
      </div>
    `;
  }

  closeModal() {
    this.dispatchEvent(new CustomEvent('close-modal'));
  }
}

customElements.define('modal-dialog', ModalDialog);
