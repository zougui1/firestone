import { createStore } from "@xstate/store";

export const heroesStore = createStore({
  context: {
    heroCards: {} as Record<string, HTMLElement>,
  },

  on: {
    addCard: (context, event: { heroName: string; element: HTMLElement }) => {
      return {
        ...context,
        heroCards: {
          ...context.heroCards,
          [event.heroName]: event.element,
        },
      };
    },

    removeCard: (context, event: { heroName: string }) => {
      const newContext = {
        ...context,
        heroCards: {
          ...context.heroCards,
        },
      };

      delete newContext.heroCards[event.heroName];

      return newContext;
    },
  },
});
