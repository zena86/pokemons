import style from './style.module.scss';

const Loader = () => {
  return (
    <div aria-label="Loading..." role="status" className={style.loader}>
      <div className={style.item}>
        <div className={style['loader-pulse']}></div>
      </div>
    </div>
  );
};

export default Loader;
