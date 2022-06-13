import PropTypes from 'prop-types';
import './toggler.scss';

function Toggler({ isOpen, onToggle }) {
  return (
    <button
      className={isOpen ? 'toggler toggler--open' : 'toggler'}
      type="button"
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
