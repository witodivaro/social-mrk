import { MouseEvent, useCallback, useEffect, useMemo, useState } from 'react';
import { FaEnvelopeSquare, FaUserPlus } from 'react-icons/fa';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import {
  addFriendStart,
  unsubscribeStart,
} from '../../../redux/socials/socials.actions';
import { selectUnsubscribeState } from '../../../redux/socials/socials.selectors';
import CustomButton from '../../custom-button/custom-button.component';
import { FETCH_STATES } from '../../../config/fetch-states';
import ButtonSpinner from '../button-spinner/button-spinner.component.';
import AddToFriendsButton from '../add-to-friends-button/add-to-friends-button.component';

interface UnsubscribeProps {
  id?: number | string;
  children?: JSX.Element | string;
  className?: string;
  inverted?: boolean;
  loadingText?: string;
  successText?: string;
}

const UnsubscribeButton = ({
  id,
  inverted,
  className,
  children,
  loadingText,
  successText,
}: UnsubscribeProps) => {
  const dispatch = useAppDispatch();
  const unsubscribeState = useAppSelector(selectUnsubscribeState);
  const [componentFetchState, setComponentFetchState] = useState('');

  useEffect(() => {
    setComponentFetchState((prevComponentState) => {
      switch (prevComponentState) {
        case FETCH_STATES.FETCHING:
          return unsubscribeState;

        default:
          return prevComponentState;
      }
    });
  }, [unsubscribeState, setComponentFetchState]);

  const unsubscribeHandler = useCallback(
    (e: MouseEvent) => {
      e.preventDefault();

      if (!id) return;

      dispatch(unsubscribeStart(+id));
      setComponentFetchState(FETCH_STATES.FETCHING);
    },
    [id, addFriendStart]
  );

  const successButton = useMemo(
    () => (
      <AddToFriendsButton
        successText={successText ? 'Заявка отправлена' : ''}
        id={id}
        inverted
        className={className}
      >
        {successText || <FaUserPlus />}
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
            onClick={unsubscribeHandler}
          >
            {children}
          </CustomButton>
        );
    }
  }, [unsubscribeHandler, inverted, className, children, componentFetchState]);

  return <>{renderedButton}</>;
};

export default UnsubscribeButton;
