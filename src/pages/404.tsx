import Message from '@/components/message/Message';

const NotFound = () => {
  return (
    <div className="container">
      <div className="wrapper">
        <Message errorMessage="custom 404 Not found" />
      </div>
    </div>
  );
};

export default NotFound;
