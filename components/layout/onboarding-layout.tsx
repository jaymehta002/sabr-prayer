import React, { useEffect, useRef } from 'react';
import {
    Animated,
    Dimensions,
    PanResponder,
    Platform,
    SafeAreaView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

const { width } = Dimensions.get('window');
const SWIPE_THRESHOLD = width * 0.2; // Reduced threshold for easier swiping

interface OnboardingLayoutProps {
  currentStep: number;
  totalSteps: number;
  onBack: () => void;
  onNext: () => void;
  onPrevious: () => void;
  children: React.ReactNode;
}

const OnboardingLayout: React.FC<OnboardingLayoutProps> = ({
  currentStep,
  totalSteps,
  onBack,
  onNext,
  onPrevious,
  children
}) => {
  const translateX = useRef(new Animated.Value(0)).current;
  const opacity = useRef(new Animated.Value(1)).current;
  const isAnimating = useRef(false);

  // Fade in new screen when step changes
  useEffect(() => {
    if (isAnimating.current) {
      isAnimating.current = false;
      return;
    }
    
    // Quick fade in for new content
    opacity.setValue(0);
    translateX.setValue(0);
    
    Animated.timing(opacity, {
      toValue: 1,
      duration: 200,
      useNativeDriver: true,
    }).start();
  }, [currentStep]);

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => !isAnimating.current,
      onMoveShouldSetPanResponder: (_, gestureState) => {
        // Only respond to horizontal swipes
        const isHorizontal = Math.abs(gestureState.dx) > Math.abs(gestureState.dy);
        const hasMinMovement = Math.abs(gestureState.dx) > 5;
        return !isAnimating.current && isHorizontal && hasMinMovement;
      },
      onPanResponderMove: (_, gestureState) => {
        // Block swipes at boundaries
        const isAtStart = currentStep === 0;
        const isAtEnd = currentStep === totalSteps - 1;
        
        if ((gestureState.dx > 0 && isAtStart) || (gestureState.dx < 0 && isAtEnd)) {
          // Rubber band effect at boundaries
          translateX.setValue(gestureState.dx * 0.15);
          opacity.setValue(1 - Math.abs(gestureState.dx) * 0.0003);
          return;
        }
        
        // Normal swipe with resistance
        const resistance = 0.8;
        translateX.setValue(gestureState.dx * resistance);
        const progress = Math.min(Math.abs(gestureState.dx) / width, 1);
        opacity.setValue(1 - progress * 0.4);
      },
      onPanResponderRelease: (_, gestureState) => {
        const velocity = gestureState.vx;
        const displacement = gestureState.dx;
        
        // Check if swipe meets threshold or has high velocity
        const shouldNavigate = 
          Math.abs(displacement) > SWIPE_THRESHOLD || 
          Math.abs(velocity) > 0.5;
        
        const isAtStart = currentStep === 0;
        const isAtEnd = currentStep === totalSteps - 1;
        
        if (shouldNavigate && !isAnimating.current) {
          // Swipe right -> previous
          if (displacement > 0 && !isAtStart) {
            isAnimating.current = true;
            animateOut(width, onPrevious);
          }
          // Swipe left -> next
          else if (displacement < 0 && !isAtEnd) {
            isAnimating.current = true;
            animateOut(-width, onNext);
          } else {
            resetPosition();
          }
        } else {
          resetPosition();
        }
      },
      onPanResponderTerminate: () => {
        resetPosition();
      },
    })
  ).current;

  const animateOut = (toValue: number, callback: () => void) => {
    Animated.parallel([
      Animated.timing(translateX, {
        toValue,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(opacity, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start(() => {
      callback();
    });
  };

  const resetPosition = () => {
    Animated.parallel([
      Animated.spring(translateX, {
        toValue: 0,
        useNativeDriver: true,
        friction: 7,
        tension: 50,
      }),
      Animated.timing(opacity, {
        toValue: 1,
        duration: 150,
        useNativeDriver: true,
      }),
    ]).start();
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />

      {/* Header with Back Button and Progress Dots */}
      <View style={styles.header}>
        <View style={styles.sideContainer}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={onBack}
            activeOpacity={0.7}
          >
            <Text style={styles.backArrow}>←</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.dotsContainer}>
          {[...Array(totalSteps)].map((_, index) => (
            <Animated.View
              key={index}
              style={[
                styles.dot,
                index === currentStep && styles.dotActive
              ]}
            />
          ))}
        </View>

        <View style={styles.sideContainer} />
      </View>

      {/* Content with Swipe Gestures */}
      <Animated.View
        style={[
          styles.content,
          {
            transform: [{ translateX }],
            opacity,
          },
        ]}
        {...panResponder.panHandlers}
      >
        {children}
      </Animated.View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAF9F6',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: width * 0.05,
    paddingTop: Platform.OS === 'android' ? (StatusBar.currentHeight || 0) + 16 : 16,
    paddingBottom: 16,
  },
  sideContainer: {
    width: 44,
    alignItems: 'flex-start',
  },
  backButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  backArrow: {
    fontSize: 22,
    color: '#2F4F4F',
    includeFontPadding: false,
    textAlign: 'center',
    marginTop: Platform.OS === 'android' ? -2 : 0,
  },
  dotsContainer: {
    flexDirection: 'row',
    gap: 8,
    flex: 1,
    justifyContent: 'center',
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#D5D5D5',
    // transition: 'background-color 0.3s',
  },
  dotActive: {
    backgroundColor: '#2F4F4F',
    width: 24,
  },
  content: {
    flex: 1,
  },
});

export default OnboardingLayout;