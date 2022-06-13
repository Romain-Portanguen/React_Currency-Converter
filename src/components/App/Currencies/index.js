import PropTypes from 'prop-types';

import './currencies.scss';

function Currencies({
  isOpen, list, onCurrencyClick, inputSearchValue,
  onInputSearchChange,
}) {
  return (
    <section className={isOpen ? 'currencies currencies--open' : 'currencies'}>
      <h2 className="currencies__title">Currencies</h2>
      <input
        className="currencies__search"
        placeholder="Rechercher une devise"
        value={inputSearchValue}
        onChange={onInputSearchChange}
      />
      <ul className="currencies__list">
        {
          list.map((currency) => (
            <li
              key={currency.name}
              className="currencies__list__item"
              onClick={() => onCurrencyClick(currency.name)}
            >
              {currency.name}
            </li>
          ))
        }
      </ul>
    </section>
  );
}

Currencies.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  list: PropTypes.arrayOf( // list est un tableau...
    PropTypes.shape({ // d'objets...
      name: PropTypes.string.isRequired, // qui contient ces clés...
      rate: PropTypes.number.isRequired,
    }).isRequired, // l'objet est obligatoire...
  ).isRequired, // et le tableau aussi
  onCurrencyClick: PropTypes.func.isRequired,
  inputSearchValue: PropTypes.string.isRequired,
  onInputSearchChange: PropTypes.func.isRequired,
};

export default Currencies;
