import React from 'react';
import { StyleSheet, View } from 'react-native';

type Props = {
  totalSteps: number;
  currentStep: number;
};

export default function ProgressDots({ totalSteps, currentStep }: Props) {
  return (
    <View style={styles.container}>
      {Array.from({ length: totalSteps }).map((_, index) => (
        <View
          key={index}
          style={[
            styles.dot,
            index === currentStep && styles.activeDot,
            index < currentStep && styles.completedDot,
          ]}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#d1d5db',
  },
  activeDot: {
    backgroundColor: '#3b82f6',
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  
  completedDot: {
    backgroundColor: '#60a5fa',
  },
});
