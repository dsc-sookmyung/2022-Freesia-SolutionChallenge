import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { AntDesign } from '@expo/vector-icons';
import * as Linking from 'expo-linking';
import { Divider } from "../../CommonComponent";

export default function CustomerServiceScreen({ navigation }: any) {

  const developers = [
    { "profile": "https://avatars.githubusercontent.com/u/61882016?v=4", "name": "Kim Minji", "position": "front-end", "github": "1914386", "email": "sml07113@gmail.com" },
    { "profile": "https://avatars.githubusercontent.com/u/72160826?v=4", "name": "Seo Myojin", "position": "front-end", "github": "nrj022", "email": "@" },
    { "profile": "https://avatars.githubusercontent.com/u/87821678?v=4", "name": "Kim Gagyung", "position": "back-end", "github": "GaGa-Kim", "email": "@" },
    { "profile": "http://cdn.shopify.com/s/files/1/1419/7120/products/Freesia_Single_Yellow.SHUT.jpg?v=1571439561", "name": "Choi Gahui", "position": "back-end", "github": "cutehumanS2", "email": "@" },
  ];

  const openForm = () => {
    Linking.openURL("https://forms.gle/DWogtYhXw49keegk8");
  };

  return (
    <View style={styles.container}>
      <View style={styles.developers}>
        <Text style={styles.header}>Developers</Text>
        <ScrollView horizontal>
          {developers.map((developer, index) =>
            <View key={index} style={styles.developerList}>
              <Image source={{ uri: developer.profile }} style={styles.profile} />
              <View style={styles.nameArea}>
                <Text style={styles.name}>{developer.name}</Text>
                <Text>{developer.position}</Text>
              </View>
              <View style={styles.nameArea}>
                <AntDesign name="github" size={20} color="grey" />
                <Text style={styles.text}>{developer.github}</Text>
              </View>
              <View style={styles.nameArea}>
                <AntDesign name="mail" size={20} color="grey" />
                <Text style={styles.text}>{developer.email}</Text>
              </View>
            </View>
          )}
        </ScrollView>
      </View>
      <Divider />
      <View style={styles.contactUs}>
        <Text style={styles.header}>Contact Us</Text>
        <TouchableOpacity onPress={openForm}>
          <Text style={styles.name}><AntDesign name="link" size={24} color="black" />Open Google Form</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 10,
  },
  developers: {
    flex: 2,
  },
  developerList: {
    marginRight: 40,
  },
  profile: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "grey",
  },
  nameArea: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
  },
  name: {
    fontSize: 18,
    marginRight: 10,
  },
  text: {
    color: "grey",
    marginLeft: 5,
  },
  header: {
    fontSize: 22,
    fontWeight: "bold",
    marginVertical: 10,
  },
  contactUs: {
    flex: 1,
  },
});