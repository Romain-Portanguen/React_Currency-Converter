import PropTypes from 'prop-types';

// import du fichier scss
import './header.scss';

function Header({ baseAmount, onBaseAmountChange }) {
  return (
    <header className="header">
      <h1 className="header__title">Converter</h1>
      <input
        className="header__input"
        type="number"
        min="1"
        placeholder="Montant a convertir"
        value={baseAmount}
        onChange={onBaseAmountChange}
      />
      <p className="header__amount">{baseAmount} euro</p>
    </header>
  );
}

Header.propTypes = {
  baseAmount: PropTypes.number.isRequired,
  onBaseAmountChange: PropTypes.func.isRequired,
};

export default Header;
