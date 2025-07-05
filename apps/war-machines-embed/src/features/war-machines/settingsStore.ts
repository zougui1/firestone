import { createStore } from '@xstate/store';

export interface TargetCampaignState {
  ignoreRequirements: boolean;
}

const defaultData: TargetCampaignState = {
  ignoreRequirements: false,
};

export const settingsStore = createStore({
  context: defaultData,

  on: {
    updateIgnoreRequirements: (context, event: { value: boolean; }) => {
      return {
        ...context,
        ignoreRequirements: event.value,
      };
    },
  },
});
