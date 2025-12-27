import { ChildrenType } from '@/lib/types';
import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';

const OnboardingScreenWrapper = ({ children } : {children: ChildrenType}) => {
  return (
    <ScrollView 
      contentContainerStyle={styles.scrollContent}
      showsVerticalScrollIndicator={false}
      bounces={false}
    >
      {children}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: '6%',
  },
});

export default OnboardingScreenWrapper;