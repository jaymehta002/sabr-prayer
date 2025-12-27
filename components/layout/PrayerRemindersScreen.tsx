import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, useWindowDimensions, View } from 'react-native';
import OnboardingScreenWrapper from './OnboardingScreenWrapper';

type Test = {
  onContinue: ()=>void
}

const PrayerRemindersScreen = ({ onContinue }: Test) => {
  const { width } = useWindowDimensions();
  
  return (
    <OnboardingScreenWrapper>
      {/* Image Container */}
      <View style={styles.imageSection}>
        <View style={[styles.imageWrapper, { width: width * 0.85, maxWidth: 400 }]}>
          <Image
            source={{ uri: 'https://images.unsplash.com/photo-1591604466107-ec97de577aff?w=600&h=600&fit=crop' }}
            style={[styles.image, { height: width * 0.85, maxHeight: 400 }]}
            resizeMode="cover"
          />
          <View style={styles.infoCard}>
            <View style={styles.cardContent}>
              <View style={styles.iconWrapper}>
                <View style={styles.iconCircle}>
                  <Text style={styles.iconText}>🕐</Text>
                </View>
              </View>
              <View style={styles.cardTextWrapper}>
                <Text style={styles.cardTitle}>Rappels de Prière</Text>
                <Text style={styles.cardSubtitle}>
                  Des rappels doux pour déconnecter et prier à l'heure.
                </Text>
              </View>
            </View>
          </View>
        </View>
      </View>

      {/* Text Content */}
      <View style={styles.textSection}>
        <Text style={styles.title}>
          Alignez vos habitudes avec vos valeurs
        </Text>
        <Text style={styles.description}>
          SabrScreen vous aide à faire une pause quand c'est important, remplaçant le bruit numérique par la paix intérieure.
        </Text>
      </View>

      {/* CTA Button */}
      <View style={styles.buttonSection}>
        <TouchableOpacity 
          style={styles.ctaButton}
          onPress={onContinue}
          activeOpacity={0.8}
        >
          <Text style={styles.ctaButtonText}>Continuer</Text>
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
    paddingVertical: 20,
  },
  imageWrapper: {
    borderRadius: 30,
    overflow: 'visible',
    position: 'relative',
  },
  image: {
    width: '100%',
    borderRadius: 30,
  },
  infoCard: {
    position: 'absolute',
    bottom: 15,
    left: 15,
    right: 15,
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 14,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 5,
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconWrapper: {
    marginRight: 12,
  },
  iconCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconText: {
    fontSize: 20,
  },
  cardTextWrapper: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#2F4F4F',
    marginBottom: 4,
  },
  cardSubtitle: {
    fontSize: 13,
    color: '#666',
    lineHeight: 18,
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

export default PrayerRemindersScreen;