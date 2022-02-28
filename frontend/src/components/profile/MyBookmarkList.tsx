import { StyleSheet, Text, View } from "react-native";

export default function MyBookmarkList() {
  return (
    <View style={styles.container}>
      <Text>My Bookmark List</Text>
    </View>
  )

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})