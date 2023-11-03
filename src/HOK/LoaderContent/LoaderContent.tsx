import Loader from '../../components/loader/';
import Message from '../../components/message/';
import { LoaderContentProps } from '../../hooks/types';

const LoaderContent = ({ respond, children }: LoaderContentProps) => {
  const { isLoading, errorMessage } = respond;
  return (
    <div>
      {isLoading && <Loader />}
      {errorMessage && <Message errorMessage={errorMessage} />}
      {
        !isLoading && !errorMessage && children
        // pokemon && <DetailDescription pokemon={pokemon}/>
      }
    </div>
  );
};

export default LoaderContent;
