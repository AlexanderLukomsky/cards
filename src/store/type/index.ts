import { store } from 'store';

export type AppRootStateType = ReturnType<typeof store.getState>;

export type AppDispatchType = typeof store.dispatch;
