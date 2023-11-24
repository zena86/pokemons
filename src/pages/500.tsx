import Message from '@/components/message/Message';

const NotFound = () => {
  return (
    <div className="container">
      <div className="wrapper">
        <Message errorMessage="custom 500 ServerError" />
      </div>
    </div>
  );
};

export default NotFound;
