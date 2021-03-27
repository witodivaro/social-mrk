import './add-to-friends-button.styles.scss';
import { useCallback, useMemo } from 'react';
import { FaSpinner } from 'react-icons/fa';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { addFriendStart } from '../../../redux/socials/socials.actions';
import { selectAddFriendState } from '../../../redux/socials/socials.selectors';
import CustomButton from '../../custom-button/custom-button.component';
import { FETCH_STATES } from '../../../config/fetch-states';

interface AddToFriendsProps {
  id?: number | string;
  children?: JSX.Element | string;
  className?: string;
  inverted?: boolean;
  loadingText?: string;
  successText?: string;
}

const AddToFriendsButton = ({
  id,
  inverted,
  className,
  children,
  loadingText,
  successText,
}: AddToFriendsProps) => {
  const dispatch = useAppDispatch();
  const addFriendState = useAppSelector(selectAddFriendState);

  const addToFriendsHandler = useCallback(() => {
    if (!id) return;

    dispatch(addFriendStart(+id));
  }, [id]);

  const renderedButton = useMemo(() => {
    switch (addFriendState) {
      case FETCH_STATES.SUCCESS:
        return (
          <CustomButton inverted={inverted} className={className} disabled>
            Заявка отправлена
          </CustomButton>
        );
      case FETCH_STATES.FETCHING:
        return (
          <CustomButton inverted={inverted} className={className} disabled>
            {loadingText || (
              <span className="add-to-friends-button__spinner">
                <FaSpinner />
              </span>
            )}
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
  }, [addToFriendsHandler, inverted, className, children, addFriendState]);

  return <>{renderedButton}</>;
};

export default AddToFriendsButton;
