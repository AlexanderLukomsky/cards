export enum appPath {
  MAIN = '/main',
  AUTH = '/auth/*',
  PROFILE = '/profile',
  PACKS = '/packs',
  CARDS = '/cards/:id',
  CARDS_DEFAULT = '/cards/',
  LEARNING = '/learning/:id',
  LEARNING_DEFAULT = '/learning/',
  ERROR_PAGE = '/ErrorPage',

  LOGIN = '/auth/login',
  REGISTRATION = '/auth/registration',
  RESTORE_PASSWORD = '/auth/restore-password',
  NEW_PASSWORD = '/auth/new-password/:token',
}
