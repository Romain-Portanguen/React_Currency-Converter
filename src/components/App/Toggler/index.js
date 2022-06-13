import PropTypes from 'prop-types';
import './toggler.scss';

// le composant Toggler recoit une prop de type fonction...
function Toggler({ isOpen, onToggle }) {
  return (
    <button
      // si isOpen est vrai, j'applique la classe toggler et toggler--open
      // sinon, juste toggler
      className={isOpen ? 'toggler toggler--open' : 'toggler'}
      type="button"
      // ...et l'appelle lors du clic
      onClick={onToggle}
    >
      =
    </button>
  );
}

Toggler.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onToggle: PropTypes.func.isRequired,
};

export default Toggler;
