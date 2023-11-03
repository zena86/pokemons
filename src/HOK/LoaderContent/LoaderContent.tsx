import Loader from '../../components/loader/';
import Message from '../../components/message/';
import { LoaderContentProps } from './types';

const LoaderContent = ({
  isLoading,
  errorMessage,
  children,
}: LoaderContentProps) => {
  return (
    <>
      {isLoading && <Loader />}
      {errorMessage && <Message errorMessage={errorMessage} />}
      {!isLoading && !errorMessage && children}
    </>
  );
};

export default LoaderContent;
