import { LitElement, html, css } from 'lit';

class PokemonList extends LitElement {
  static properties = {
    pokemonData: { type: Array }
  };

  static styles = css `
    .pokemon-container {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
    }

    .pokemon-card {
      border: 1px solid #ccc;
      border-radius: 10px;
      margin: 10px;
      width: 250px;
      padding: 15px;
      text-align: center;
      background-color: #fff;
      cursor: pointer;
    }

    .pokemon-card img {
      max-width: 100px;
    }

    .title {
      text-align: center;
      font-size: 19px;
      color: red;
    }
  `;

  render() {
    return html`
      <div class="title"> 
        <h2>Lista de Pokemones</h2>
      </div>
      <div class="pokemon-container">
        ${this.pokemonData.map(pokemon => html`
          <div class="pokemon-card" @click=${() => this.handleClick(pokemon)}>
            <h3>${pokemon.name}</h3>
            <p>Tipo: ${pokemon.type}</p>
            <img src="/images/${pokemon.image}" alt="${pokemon.name}">
          </div>
        `)}
      </div>
    `;
  }

  handleClick(pokemon) {
    this.dispatchEvent(new CustomEvent('select-pokemon', {
      detail: pokemon
    }));
  }
}

customElements.define('pokemon-list', PokemonList);
