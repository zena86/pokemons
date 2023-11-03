import Loader from '../../components/loader/';
import Message from '../../components/message/';
import { LoaderContentProps } from './types';

const LoaderContent = ({ respond, children }: LoaderContentProps) => {
  const { isLoading, errorMessage } = respond;
  return (
    <>
      {isLoading && <Loader />}
      {errorMessage && <Message errorMessage={errorMessage} />}
      {!isLoading && !errorMessage && children}
    </>
  );
};

export default LoaderContent;
