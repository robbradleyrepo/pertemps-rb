import { Registration } from '~/types';

export default (): Registration.State => ({
  apiStatus: null,

  actionValues: {},

  flowOutroIsActive: false,

  activeTaskId: null,
  taskIntroIsActive: false,

  activeStepId: null,
  stepIntroIsActive: false,
  stepOutroIsActive: false,

  activeActionId: null,
  activeActionValue: null,
  activeDependencyActionId: null,

  activeActionSet: null,
  activeActionSetAction: null,
  activeActionSetLoop: null,
});
