import PrayerRemindersScreen from './PrayerRemindersScreen';
import ScreenTimeScreen from './ScreenTimeScreen';

export const onboardingScreens = [
  {
    id: 'screen-time',
    component: ScreenTimeScreen,
  },
  {
    id: 'prayer-reminders',
    component: PrayerRemindersScreen,
  },
//   {
//     id: 'new-screen',
//     component: NewScreen,
//   },
];

export const getTotalSteps = () => onboardingScreens.length;