import { useRouter } from 'expo-router';
import React from 'react';
import {
    Dimensions,
    Image,
    Platform,
    SafeAreaView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';

const { width, height } = Dimensions.get('window');

export default function OnboardingScreen() {
    const router = useRouter()
  const handleStart = () => {
    // Navigate to next screen
    console.log('Start pressed');
  };

  const handleLogin = () => {
    // Navigate to login screen
    console.log('Login pressed');
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#f5f5f0" />
      
      {/* Image Section */}
      <View style={styles.imageContainer}>
        <Image
          source={require(`../../assets/images/onboarding/welcome.jpg`)}
          style={styles.image}
          resizeMode="cover"
        />
        
        {/* Icon Overlay */}
        <View style={styles.iconContainer}>
          <View style={styles.iconCircle}>
            <Text style={styles.iconText}>☪</Text>
          </View>
        </View>
      </View>

      {/* Content Section */}
      <View style={styles.contentContainer}>
        <Text style={styles.title}>Trouvez la Paix dans un{'\n'}Monde Numérique</Text>
        
        <Text style={styles.subtitle}>
          Reconnectez-vous à l'essentiel. Réduisez{'\n'}
          votre temps d'écran et alignez votre cœur{'\n'}
          sur la prière.
        </Text>

        {/* Start Button */}
        <TouchableOpacity 
          style={styles.button} 
          activeOpacity={0.8}
          onPress={() => router.push("/(onboarding)/screen-time")}
        >
          <Text style={styles.buttonText}>Commencer</Text>
        </TouchableOpacity>

        {/* Login Link */}
        <View style={styles.loginContainer}>
          <Text style={styles.loginText}>Vous avez déjà un compte ? </Text>
          <TouchableOpacity onPress={handleLogin}>
            <Text style={styles.loginLink}>Se connecter</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f0',
  },
  imageContainer: {
    width: width,
    height: height * 0.55,
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  image: {
    width: width * 0.88,
    height: height * 0.5,
    borderRadius: 24,
    marginTop: 20,
  },
  iconContainer: {
    position: 'absolute',
    bottom: -30,
    alignSelf: 'center',
  },
  iconCircle: {
    width: 60,
    height: 60,
    borderRadius: 16,
    backgroundColor: '#1a4d3a',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 6,
  },
  iconText: {
    fontSize: 28,
    color: '#d4af37',
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 50,
    alignItems: 'center',
  },
  title: {
    fontSize: width < 375 ? 24 : 28,
    fontWeight: '600',
    color: '#1a4d3a',
    textAlign: 'center',
    marginBottom: 16,
    lineHeight: width < 375 ? 32 : 36,
  },
  subtitle: {
    fontSize: width < 375 ? 14 : 15,
    color: '#666',
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 32,
  },
  button: {
    width: '100%',
    maxWidth: 320,
    height: 56,
    backgroundColor: '#1a4d3a',
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#1a4d3a',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
    marginBottom: 20,
  },
  buttonText: {
    fontSize: 17,
    fontWeight: '600',
    color: '#fff',
    letterSpacing: 0.3,
  },
  loginContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  loginText: {
    fontSize: 14,
    color: '#666',
  },
  loginLink: {
    fontSize: 14,
    color: '#1a4d3a',
    fontWeight: '600',
  },
});