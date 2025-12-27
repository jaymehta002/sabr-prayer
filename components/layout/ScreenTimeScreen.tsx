import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, useWindowDimensions, View } from 'react-native';
import OnboardingScreenWrapper from './OnboardingScreenWrapper';

const ScreenTimeScreen = ({ onContinue } : {onContinue: () => void}) => {
  const { width } = useWindowDimensions();
  
  return (
    <OnboardingScreenWrapper>
      {/* Image Container */}
      <View style={styles.imageSection}>
        <View style={[styles.imageWrapper, { width: width * 0.6, height: width * 0.75 }]}>
          <Image
            // source={{ uri: 'https://images.unsplash.com/photo-1591604466107-ec97de577aff?w=600&h=600&fit=crop' }}
            source={require(`../../assets/images/onboarding/screen-timer.png`)}
            style={styles.image}
            resizeMode="cover"
          />
          <View style={styles.statsCard}>
            <Text style={styles.statsLabel}>MOYENNE / JOUR</Text>
            <Text style={styles.statsValue}>6h 42m</Text>
          </View>
        </View>
      </View>

      {/* Text Content */}
      <View style={styles.textSection}>
        <Text style={styles.title}>
          Le temps d'écran vole-t-il votre sérénité ?
        </Text>
        <Text style={styles.description}>
          Le défilement infini peut vous éloigner de vos objectifs et de votre foi. Il est temps de reprendre le contrôle.
        </Text>
      </View>

      {/* CTA Button */}
      <View style={styles.buttonSection}>
        <TouchableOpacity 
          style={styles.ctaButton}
          onPress={onContinue}
          activeOpacity={0.8}
        >
          <Text style={styles.ctaButtonText}>Je veux changer ça</Text>
        </TouchableOpacity>
      </View>
    </OnboardingScreenWrapper>
  );
};

const styles = StyleSheet.create({
  imageSection: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: 300,
    // paddingVertical: 20,
  },
  imageWrapper: {
    borderRadius: 30,
    // overflow: 'hidden',
    position: 'relative',
  },
  image: {
    borderRadius: 30,
    width: '100%',
    height: '100%',
  },
  statsCard: {
    position: 'absolute',
    bottom: -15,
    right: -15,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 14,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 5,
  },
  statsLabel: {
    fontSize: 10,
    color: '#888',
    fontWeight: '600',
    letterSpacing: 0.5,
    marginBottom: 2,
  },
  statsValue: {
    fontSize: 22,
    color: '#FF4444',
    fontWeight: '700',
  },
  textSection: {
    paddingVertical: 30,
    paddingHorizontal: '2%',
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    color: '#2F4F4F',
    textAlign: 'center',
    marginBottom: 12,
    lineHeight: 32,
  },
  description: {
    fontSize: 15,
    color: '#666',
    textAlign: 'center',
    lineHeight: 22,
  },
  buttonSection: {
    paddingVertical: 20,
    paddingBottom: 30,
  },
  ctaButton: {
    backgroundColor: '#2D5F4F',
    paddingVertical: 16,
    borderRadius: 30,
    shadowColor: '#2D5F4F',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  ctaButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
});

export default ScreenTimeScreen;
