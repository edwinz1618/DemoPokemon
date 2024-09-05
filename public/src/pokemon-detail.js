import { LitElement, html, css } from 'lit';

class PokemonDetail extends LitElement {
  static properties = {
    pokemon: { type: Object }
  };

  static styles = css`
    .evolutions {
      margin-top: 10px;
    }

    .evolution {
      border-top: 1px solid #ccc;
      padding-top: 10px;
      margin-top: 10px;
      text-align: center;
    }

    .title {
      text-align: center;
      font-size: 19px;
      color: red;
    }

    .subtitle {
      text-align: center;
      font-size: 20px;
    }

    .btnReturn {
      width: 125px;
      height: 36px;
      border-radius: 25px;
      border: 0px;
      background: #1b6ef3;
      color: white;
      font-size: 18px;
    }

    .btnUpdate {
      width: 125px;
      height: 36px;
      border-radius: 10px;
      border: 0px;
      background: #34a853;
      color: white;
      font-size: 18px;
    }

`;


  render() {
    return html`
     <button class="btnReturn"  @click=${this.handleBack}> < Regresar </button>
      <div class="title"><h2 style="margin-top: 0px">Evoluciones de ${this.pokemon.name}</h2></div>
      <div>        
        ${this.pokemon.evolutions.length > 0
        ? html`
            ${this.pokemon.evolutions.map(evolution => html`
              <div class="evolution">
                <h4>${evolution.name}</h4>
                <p>Tipo: ${evolution.type}</p>
                <img src="/images/${evolution.image}" alt="${evolution.name}">
                <form>
                  <label>
                    Nombre:
                    <input type="text" id="pokemon-name" value="${evolution.name}">
                  </label>
                  <label>
                    Tipo:
                    <input type="text" id="pokemon-type" value="${evolution.type}">
                  </label>
                  <label style="display: none">
                    <input type="text" id="pokemon-id" value="${evolution.id}">
                  </label>
                </form>
                <div style="margin-top: 10px">
                  <button class="btnUpdate" @click="${this.updateButtonClick}">Actualizar</button>                  
                </div>
              </div>
            `)}
            <label>
              Repetido:
              <input type="checkbox" @change=${this.handleCheckboxChange}>
            </label>
          `
        : html`<div class="subtitle"><p>No hay evoluciones disponibles..</p></div>`
      }       
      </div>
    `;
  }

  updateButtonClick() {
    const name = this.shadowRoot.getElementById('pokemon-name').value;
    const type = this.shadowRoot.getElementById('pokemon-type').value;
    const id = this.shadowRoot.getElementById('pokemon-id').value;

    const storedPokemon = JSON.parse(localStorage.getItem('pokemonList')) ?? [];
    if (storedPokemon.length > 0) {
      storedPokemon.forEach(pokemon => {
        if (pokemon.evolutions && pokemon.evolutions.length > 0) {
          pokemon.evolutions.forEach(evolution => {
            if (evolution.id === id) {
              evolution.name = name;
              evolution.type = type;
              console.log(`Evolución actualizada: ID ${evolution.id} -> ${evolution.name}`);
            }
          });
        }
      });
      localStorage.setItem('pokemonList', JSON.stringify(storedPokemon));
      this.dispatchEvent(new CustomEvent('show-modal-confirm'));
    }
  }

  handleBack() {
    this.dispatchEvent(new CustomEvent('back'));
  }

  handleCheckboxChange(e) {
    if (e.target.checked) {
      this.dispatchEvent(new CustomEvent('show-modal'));
    }
  }
}

customElements.define('pokemon-detail', PokemonDetail);
