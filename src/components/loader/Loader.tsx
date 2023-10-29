import { Component } from 'react';
import style from './style.module.scss';

class Loader extends Component {
  render() {
    return (
      <div aria-label="Loading..." role="status" className={style.loader}>
        <div className={style.item}>
          <div className={style['loader-pulse']}></div>
        </div>
      </div>
    );
  }
}

export default Loader;
