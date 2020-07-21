import { Candidate } from '~/types';

const defaultRegistrationId = '80F5A952-6A6C-4CE3-A992-156960D69389';

export default (): Candidate.State => ({
  auth: null,
  registrationId: defaultRegistrationId,
});
