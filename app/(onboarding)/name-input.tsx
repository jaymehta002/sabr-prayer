import colors from "@/constants/Colors";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { useState } from "react";
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

export default function Name() {
  const [name, setName] = useState("");
  const router = useRouter();

  async function complete() {
    await AsyncStorage.setItem("onboarded", "true");
    await AsyncStorage.setItem("username", name);

    router.replace("/(tabs)");
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Quel est votre prénom ?</Text>

      <TextInput
        value={name}
        onChangeText={setName}
        placeholder="Votre prénom"
        style={styles.input}
      />

      <TouchableOpacity style={styles.button} disabled={!name} onPress={complete}>
        <Text style={styles.buttonText}>Continuer</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background, padding: 24, justifyContent: "center" },
  title: { fontSize: 24, color: colors.primary, marginBottom: 20, fontWeight: "600" },
  input: { backgroundColor: "#fff", padding: 16, borderRadius: 12, marginBottom: 24 },
  button: { backgroundColor: colors.primary, padding: 16, borderRadius: 30, alignItems: "center" },
  buttonText: { color: "#fff", fontSize: 16 },
});
