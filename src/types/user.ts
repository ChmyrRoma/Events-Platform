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
