import socialMrk from './social-mrk';

const createUserEndpoint = (id) => `user_profile/user-profile-get/${id}/`;

const getUser = (id) => socialMrk.get(createUserEndpoint(id));

export default getUser;
