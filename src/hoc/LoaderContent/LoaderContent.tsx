import Loader from '../../components/loader/';
import Message from '../../components/message/';
import { LoaderContentProps } from './types';
// import { useSelector } from 'react-redux';
// import { RootState } from '../../redux/store';

const LoaderContent = ({
  isLoading,
  errorMessage,
  children,
}: LoaderContentProps) => {
  // const isLoading = useSelector((state: RootState) => state.loadMain.isLoading);
  return (
    <>
      {isLoading && <Loader />}
      {errorMessage && <Message errorMessage={errorMessage} />}
      {!isLoading && !errorMessage && children}
    </>
  );
};

export default LoaderContent;
