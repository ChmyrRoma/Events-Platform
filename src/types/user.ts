export interface UserProfile {
  about: string;
  avatar: string;
  backgroundImageUrl: string | null;
  calendars: object[];
  contactsSyncedAt: Date | null;
  email: string;
  hasPassword: boolean;
  id: number;
  identities: Identity[];
  isGameplanOnboarded: boolean;
  isHomeOnboarded: boolean;
  isTeeupOnboardingPassed: boolean;
  name: string;
  nickname: string;
  primaryLocation: string;
  settings: UserSettings;
  timezone: string;
  userType: number;
}

interface Identity {
  id: number;
  title: string;
  type: string;
  userId: number;
  provider: string;
}

interface UserSettings {
  notificationLevel: string;
  emailNotifications: boolean;
}

export interface IRegister {
  avatar: string
  avatarType: string
  captcha: string
  country: string
  deviceId: string
  email: string
  firstName: string
  id: number
  lastname: string
  locale: string
  name: string
  password: string
  timezone: string
  type: string
  username: string
}

export interface IContactInfo {
  createdAt: string
  createdat: string
  designation: number
  id: number
  isNotification: boolean
  isPublic: boolean
  isVerificationPending: boolean
  isVerified: boolean
  typeId: number
  typeid: number
  updatedAt: string
  updatedat: string
  value: string
}
