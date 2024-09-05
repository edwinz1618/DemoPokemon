import { LitElement, html } from 'lit';
import './pokemon-list.js';
import './pokemon-detail.js';
import './modal-dialog.js';
import './modal-confirm.js';

class PokemonApp extends LitElement {
  static properties = {
    pokemonData: { type: Array },
    selectedPokemon: { type: Object },
    showEvolutions: { type: Boolean },
    showModal: { type: Boolean },
    showModalConfirm: { type: Boolean },
  };

  constructor() {
    super();
    this.pokemonData = [];
    this.selectedPokemon = null;
    this.showEvolutions = false;
    this.showModal = false;
    this.showModalConfirm = false;
    this.fetchPokemonData();
  }

  handleSelectPokemon(pokemon) {
    this.selectedPokemon = pokemon;
    this.showEvolutions = true;
  }

  handleBack() {
    this.selectedPokemon = null;
    this.showEvolutions = false;
    const storedPokemon = JSON.parse(localStorage.getItem('pokemonList')) ?? [];
    if (storedPokemon.length > 0) {
      this.pokemonData = storedPokemon;
    }
  }

  handleShowModal() {
    this.showModal = true;
  }

  handleCloseModal() {
    this.showModal = false;
  }

  handleShowModalConfirm() {
    this.showModalConfirm = true;
  }

  handleCloseModalConfirm() {
    this.showModalConfirm = false;
  }

  render() {
    return html`
      ${this.showEvolutions
        ? html`<pokemon-detail
                  .pokemon=${this.selectedPokemon}
                  @back=${this.handleBack}
                  @show-modal=${this.handleShowModal}
                  @show-modal-confirm=${this.handleShowModalConfirm}>
               </pokemon-detail>`
        : html`<pokemon-list
                  .pokemonData=${this.pokemonData}
                  @select-pokemon=${(e) => this.handleSelectPokemon(e.detail)}>
               </pokemon-list>`}
      ${this.showModal ? html`<modal-dialog @close-modal=${this.handleCloseModal}></modal-dialog>` : ''}
      ${this.showModalConfirm ? html`<modal-confirm @close-modal=${this.handleCloseModalConfirm}></modal-confirm>` : ''}
    `;
  }

  async fetchPokemonData() {
    try {
      const response = await fetch('http://localhost:3000/pokemon');
      if (!response.ok) {
        throw new Error('Error al obtener los pokemones');
      }
      const data = await response.json();
      this.pokemonData = data;
    } catch (error) {
      console.error('Error:', error);
    }
    localStorage.setItem('pokemonList', JSON.stringify(this.pokemonData));
  }
}

customElements.define('pokemon-app', PokemonApp);
