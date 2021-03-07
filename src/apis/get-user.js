import socialMrk from './social-mrk';

const createUserEndpoint = (id) => `user_profile/get/${id}/`;

const getUser = (id) => socialMrk.get(createUserEndpoint(id));

export default getUser;
