import PropTypes from 'prop-types';
import './result.scss';

function Result({ result, selectedCurrency }) {
  return (
    <section className="result">
      <p className="result__amount">{result}</p>
      <p className="result__currency">{selectedCurrency}</p>
    </section>
  );
}

Result.propTypes = {
  result: PropTypes.number.isRequired,
  selectedCurrency: PropTypes.string.isRequired,
};

export default Result;
