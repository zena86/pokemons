import Message from '../../components/message';

const NotFound = () => {
  return (
    <div className="container">
      <div className="wrapper">
        <Message errorMessage="404 Not found" />
      </div>
    </div>
  );
};

export default NotFound;
