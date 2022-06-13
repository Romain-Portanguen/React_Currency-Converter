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
    if (prevState.selectedCurrency !== this.state.selectedCurrency) {
      console.log('didUpdate : mise a jour du titre de la page');
      document.title = `Conversion de euros vers ${this.state.selectedCurrency}`;
    }
  }

  handleButtonClick() {
    this.setState({
      isListOpen: !this.state.isListOpen,
    });
  }

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
    if (this.state.inputSearch === '') {
      return currencyData;
    }

    return currencyData

      .filter((currency) => currency.name.toLowerCase().includes(this.state.inputSearch.toLowerCase()));
  }

  makeConversion() {
    const foundCurrency = currencyData.find((currency) => currency.name === this.state.selectedCurrency);

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
