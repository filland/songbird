import React from 'react';
import { connect } from 'react-redux';

import './styles.scss';

class Loader extends React.Component {
  render() {
    const { isUserWordsLoading } = this.props;
    let styles;
    // if (isSettingsLoading || isDictionaryWordsLoading || isUserWordsLoading || isStatisticsLoading) {
    if (isUserWordsLoading) {
      styles = { display: 'block' };
    } else {
      styles = { display: 'none' };
    }
    return (
      <div className="loader main" style={styles}>
        <div className="spinner">
          <div className="spinner-cube">
            <div></div>
            <div></div>
          </div>
        </div>
      </div>
    );
  }
}

const isUserWordsLoading = (store) => false;

const mapStateToProps = (store) => ({
  isUserWordsLoading: isUserWordsLoading(store),
});

export default connect(mapStateToProps, null)(Loader);
