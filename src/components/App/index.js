/* eslint-disable no-console */
/* eslint-disable max-len */
/* eslint-disable react/no-access-state-in-setstate */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prefer-stateless-function */
import React from 'react';

/* eslint-disable import/order */
// == Import
import Currencies from './Currencies';
import Header from './Header';
import Toggler from './Toggler';
import Result from './Result';

import './app.scss';

import currencyData from 'src/data/currencies';

class App extends React.Component {
  constructor(props) {
    super(props);

    // maintenant que j'ai fait mon constructeur,
    // je vais pouvoir déclarer un état
    // mon état sera un objet, qui contiendra toutes les variables amenées a changer
    // au cours de la vie du composant
    this.state = {
      isListOpen: true,
      baseAmount: 1,
      selectedCurrency: 'Swiss Franc',
      inputSearch: '',
    };

    this.handleButtonClick = this.handleButtonClick.bind(this);
    this.handleCurrencyClick = this.handleCurrencyClick.bind(this);
    this.handleBaseAmountChange = this.handleBaseAmountChange.bind(this);
    this.handleSearchInputChange = this.handleSearchInputChange.bind(this);
  }

  componentDidMount() {
    console.log('ComponentDidMount : le composant a été rendu pour la premiere fois.');
    document.title = `Conversion de euros vers ${this.state.selectedCurrency}`;
  }

  componentDidUpdate(prevProps, prevState) {
    // avec prevProps et prevState je peux comparer les anciens props / state
    // et determiner qu'est-ce qui précisément changé
    if (prevState.selectedCurrency !== this.state.selectedCurrency) {
      // et du coup je modifie mon titre que lorsque c'est nécessaire
      console.log('didUpdate : mise a jour du titre de la page');
      document.title = `Conversion de euros vers ${this.state.selectedCurrency}`;
    }
  }

  handleButtonClick() {
    this.setState({
      isListOpen: !this.state.isListOpen,
    });
  }

  // une fonction appellée lors du clic sur une devise
  // la fonction recoit en parametre la nouvelle devise selectionnée
  handleCurrencyClick(newCurrency) {
    this.setState({
      selectedCurrency: newCurrency,
    });
  }

  handleBaseAmountChange(event) {
    this.setState({
      baseAmount: event.target.valueAsNumber,
    });
  }

  handleSearchInputChange(event) {
    this.setState({
      inputSearch: event.target.value,
    });
  }

  getFilteredCurrencies() {
    // si inputSearch est vide
    if (this.state.inputSearch === '') {
      // je renvoie toutes les devises telle qu'elles
      return currencyData;
    }
    // si inputSearch contient quelque chose
    // eslint-disable-next-line no-else-return
    else {
      // je garde que les devises dont le nom contient le prédicat de recherche
      return currencyData
        // eslint-disable-next-line max-len
        .filter((currency) => currency.name.toLowerCase().includes(this.state.inputSearch.toLowerCase()));
    }
  }

  // fonction qui va calculer le montant converti
  makeConversion() {
    // plan d'action
    // a partir de la devise selectionnée (string) je vais aller chercher (.find)
    // dans mon fichier de données statiques (import currencyData plus haut)
    // la bonne devise
    const foundCurrency = currencyData.find((currency) => currency.name === this.state.selectedCurrency);

    // une fois que j'aurai la devise, je multiplierai son taux par le montant de base (baseAmount)

    const resultFloat = foundCurrency.rate * this.state.baseAmount;

    const resultFixed = Math.round(resultFloat * 100) / 100;
    return resultFixed;
  }

  render() {
    return (
      <div className="app">
        <Header
          baseAmount={this.state.baseAmount}
          onBaseAmountChange={this.handleBaseAmountChange}
        />
        {/* un composant pour activer/désactiver la liste */}
        <Toggler
          isOpen={this.state.isListOpen}
          onToggle={this.handleButtonClick}
        />
        <Currencies
          isOpen={this.state.isListOpen}
          list={this.getFilteredCurrencies()}
          inputSearchValue={this.state.inputSearch}
          onCurrencyClick={this.handleCurrencyClick}
          onInputSearchChange={this.handleSearchInputChange}
        />
        <Result
          result={this.makeConversion()}
          selectedCurrency={this.state.selectedCurrency}
        />
      </div>
    );
  }
}

// == Export
export default App;
