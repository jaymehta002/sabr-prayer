import { getTotalSteps, onboardingScreens } from '@/components/layout/onboarding-config';
import OnboardingLayout from '@/components/layout/onboarding-layout';
import React, { useMemo, useState } from 'react';
import { StyleSheet, View } from 'react-native';

export default function App() {
  const [currentStep, setCurrentStep] = useState(0);
  const totalSteps = getTotalSteps();

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    } else {
      // Handle exit onboarding if needed
      console.log('Exit onboarding');
    }
  };

  const handleNext = () => {
    if (currentStep < totalSteps - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleContinue = () => {
    if (currentStep < onboardingScreens.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // Handle onboarding completion
      console.log('Onboarding completed!');
      // Navigate to main app
    }
  };

  // Preload all screens to avoid loading state during transitions
  const allScreens = useMemo(() => {
    return onboardingScreens.map((screen, index) => {
      const ScreenComponent = screen.component;
      return (
        <View
          key={screen.id}
          style={[
            styles.screenContainer,
            index === currentStep ? styles.activeScreen : styles.hiddenScreen
          ]}
        >
          <ScreenComponent onContinue={handleContinue} />
        </View>
      );
    });
  }, [currentStep]);

  return (
    <OnboardingLayout
      currentStep={currentStep}
      totalSteps={totalSteps}
      onBack={handleBack}
      onNext={handleNext}
      onPrevious={handlePrevious}
    >
      {allScreens[currentStep]}
    </OnboardingLayout>
  );
}

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
  },
  activeScreen: {
    opacity: 1,
  },
  hiddenScreen: {
    opacity: 0,
    position: 'absolute',
  },
});