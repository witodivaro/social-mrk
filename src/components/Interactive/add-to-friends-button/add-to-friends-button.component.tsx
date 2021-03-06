import { MouseEvent, useCallback, useEffect, useMemo, useState } from 'react';
import { FaEnvelopeSquare } from 'react-icons/fa';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { addFriendStart } from '../../../redux/socials/socials.actions';
import { selectAddFriendState } from '../../../redux/socials/socials.selectors';
import CustomButton from '../../custom-button/custom-button.component';
import { FETCH_STATES } from '../../../config/fetch-states';
import ButtonSpinner from '../button-spinner/button-spinner.component.';

interface AddToFriendsProps {
  id?: number | string;
  children?: JSX.Element | string;
  className?: string;
  inverted?: boolean;
  loadingText?: string;
  successText?: string;
  isSent?: boolean;
}

const AddToFriendsButton = ({
  id,
  inverted,
  className,
  children,
  loadingText,
  successText,
  isSent,
}: AddToFriendsProps) => {
  const dispatch = useAppDispatch();
  const addFriendState = useAppSelector(selectAddFriendState);
  const [componentFetchState, setComponentFetchState] = useState('');

  useEffect(() => {
    setComponentFetchState((prevComponentState) => {
      switch (prevComponentState) {
        case FETCH_STATES.FETCHING:
          return addFriendState;

        default:
          return prevComponentState;
      }
    });
  }, [addFriendState, setComponentFetchState]);

  const addToFriendsHandler = useCallback(
    (e: MouseEvent) => {
      e.preventDefault();

      if (!id) return;

      dispatch(addFriendStart(+id));
      setComponentFetchState(FETCH_STATES.FETCHING);
    },
    [id, addFriendStart]
  );

  const successButton = useMemo(
    () => (
      <CustomButton inverted={inverted} className={className} disabled>
        {successText || <FaEnvelopeSquare />}
      </CustomButton>
    ),
    [successText, inverted, className, successText]
  );

  const renderedButton = useMemo(() => {
    if (isSent) {
      return successButton;
    }

    switch (componentFetchState) {
      case FETCH_STATES.SUCCESS:
        return successButton;
      case FETCH_STATES.FETCHING:
        return (
          <CustomButton inverted={inverted} className={className} disabled>
            {loadingText || <ButtonSpinner />}
          </CustomButton>
        );
      default:
        return (
          <CustomButton
            inverted={inverted}
            className={className}
            onClick={addToFriendsHandler}
          >
            {children}
          </CustomButton>
        );
    }
  }, [
    addToFriendsHandler,
    inverted,
    className,
    children,
    componentFetchState,
    isSent,
  ]);

  return <>{renderedButton}</>;
};

export default AddToFriendsButton;
