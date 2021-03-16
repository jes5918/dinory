import React from 'react'
import { View, Text, Button} from 'react-native'

export default function NavIcon({ navigation }) {
  return (
    <View>
      <Text>NavIcon 테스트</Text>
      <Button
        title="Go to Apple"
        onPress={() => navigation.navigate('Apple')}
      />
    </View>
  )
}
