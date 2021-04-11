import { MouseEvent, useCallback, useEffect, useMemo, useState } from 'react';
import { FaEnvelopeSquare, FaUserPlus } from 'react-icons/fa';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { removeFriendStart } from '../../../redux/socials/socials.actions';
import { selectRemoveFriendState } from '../../../redux/socials/socials.selectors';
import CustomButton from '../../custom-button/custom-button.component';
import { FETCH_STATES } from '../../../config/fetch-states';
import ButtonSpinner from '../button-spinner/button-spinner.component.';
import AddToFriendsButton from '../add-to-friends-button/add-to-friends-button.component';

interface AddToFriendsProps {
  id?: number | string;
  children?: JSX.Element | string;
  className?: string;
  inverted?: boolean;
  loadingText?: string;
  successText?: string;
}

const RemoveFromFriendsButton = ({
  id,
  inverted,
  className,
  children,
  loadingText,
  successText,
}: AddToFriendsProps) => {
  const dispatch = useAppDispatch();
  const removeFriendState = useAppSelector(selectRemoveFriendState);
  const [componentFetchState, setComponentFetchState] = useState('');

  useEffect(() => {
    setComponentFetchState((prevComponentState) => {
      switch (prevComponentState) {
        case FETCH_STATES.FETCHING:
          return removeFriendState;

        default:
          return prevComponentState;
      }
    });
  }, [removeFriendState, setComponentFetchState]);

  const renoveFromFriendsHandler = useCallback(
    (e: MouseEvent) => {
      e.preventDefault();

      if (!id) return;

      dispatch(removeFriendStart(+id));
      setComponentFetchState(FETCH_STATES.FETCHING);
    },
    [id, removeFriendStart]
  );

  const successButton = useMemo(
    () => (
      <AddToFriendsButton
        id={id}
        className={className}
        inverted={!inverted}
        successText={successText ? 'Заявка отправлена' : ''}
      >
        {successText ? 'Добавить в друзья' : <FaUserPlus />}
      </AddToFriendsButton>
    ),
    [successText, inverted, className, successText]
  );

  const renderedButton = useMemo(() => {
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
            onClick={renoveFromFriendsHandler}
          >
            {children}
          </CustomButton>
        );
    }
  }, [
    renoveFromFriendsHandler,
    inverted,
    className,
    children,
    componentFetchState,
  ]);

  return <>{renderedButton}</>;
};

export default RemoveFromFriendsButton;
