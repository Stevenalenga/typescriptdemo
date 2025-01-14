import React, { useState, useEffect } from 'react';
import { StyleSheet, View, TouchableOpacity, Text, TextInput, Alert } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useTheme } from './ThemeContext';

export default function Login() {
  const navigation = useNavigation<StackNavigationProp<any>>();
  const { theme } = useTheme();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isFormValid, setIsFormValid] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
    return emailRegex.test(email) || phoneRegex.test(email);
  };

  const validatePassword = (password: string): string | null => {
    if (password.includes(' ')) return "Password must not contain whitespaces.";
    if (!/[A-Z]/.test(password)) return "Password must have at least one uppercase character.";
    if (!/[a-z]/.test(password)) return "Password must have at least one lowercase character.";
    if (!/\d/.test(password)) return "Password must contain at least one digit.";
    if (password.length < 8) return "Password must be at least 8 characters long.";
    return null;
  };

  useEffect(() => {
    setIsFormValid(validateEmail(email) && validatePassword(password) === null);
  }, [email, password]);

  const handleLogin = () => {
    if (isFormValid) {
      // Here you would typically make an API call to verify credentials
      // For this example, we'll just simulate a successful login
      setEmail('');
      setPassword('');
      navigation.navigate("MainTabs" as never);
    } else {
      Alert.alert('Invalid Login', 'Please enter a valid email and password.');
    }
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 20,
      backgroundColor: theme.colors.background,
    },
    inputContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      width: '100%',
      height: 50,
      borderColor: theme.colors.border,
      borderWidth: 1,
      marginBottom: 15,
      borderRadius: 10,
    },
    input: {
      flex: 1,
      height: '100%',
      paddingLeft: 15,
      paddingRight: 45,
      color: theme.colors.text,
      fontSize: 16,
    },
    eyeIcon: {
      position: 'absolute',
      right: 15,
      height: '100%',
      justifyContent: 'center',
    },
    loginButton: {
      backgroundColor: theme.colors.primary,
      padding: 15,
      borderRadius: 25,
      width: '100%',
      alignItems: 'center',
    },
    loginButtonText: {
      color: '#ffffff',
      fontSize: 18,
      fontWeight: 'bold',
    },
    socialButton: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 15,
      borderRadius: 25,
      width: '100%',
      marginTop: 15,
    },
    facebookButton: {
      backgroundColor: '#3b5998',
    },
    googleButton: {
      backgroundColor: '#db4a39',
    },
    socialIcon: {
      marginRight: 10,
      color: '#ffffff',
    },
    socialButtonText: {
      color: '#ffffff',
      fontSize: 16,
      flex: 1,
      textAlign: 'center',
    },
    signUpContainer: {
      marginTop: 20,
    },
    signUpText: {
      color: theme.colors.text,
    },
    signUpLink: {
      color: theme.colors.primary,
      fontWeight: 'bold',
    },
  });

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor={theme.colors.text + '80'} // 50% opacity
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor={theme.colors.text + '80'} // 50% opacity
          value={password}
          onChangeText={setPassword}
          secureTextEntry={!showPassword}
        />
        <TouchableOpacity
          style={styles.eyeIcon}
          onPress={() => setShowPassword(!showPassword)}
        >
          <FontAwesome
            name={showPassword ? 'eye' : 'eye-slash'}
            size={24}
            color={theme.colors.text}
          />
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        style={[styles.loginButton, !isFormValid && { opacity: 0.5 }]}
        disabled={!isFormValid}
        onPress={handleLogin}
      >
        <Text style={styles.loginButtonText}>Log In</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.socialButton, styles.facebookButton]}>
        <FontAwesome name="facebook" size={24} style={styles.socialIcon} />
        <Text style={styles.socialButtonText}>Sign in with Facebook</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.socialButton, styles.googleButton]}>
        <FontAwesome name="google" size={24} style={styles.socialIcon} />
        <Text style={styles.socialButtonText}>Sign in with Google</Text>
      </TouchableOpacity>
      <TouchableOpacity 
        style={styles.signUpContainer}
        onPress={() => navigation.navigate('SignUp' as never)}
      >
        <Text style={styles.signUpText}>Not signed up? <Text style={styles.signUpLink}>Sign Up</Text></Text>
      </TouchableOpacity>
    </View>
  );
}
