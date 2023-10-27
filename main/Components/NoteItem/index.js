import { Text } from '@rneui/themed'
import React from 'react'
import { View, Image } from 'react-native'
import Trash from '../Trash'
import { Swipeable } from 'react-native-gesture-handler'

const NoteItem = (props) => {
  return (
    <Swipeable
      renderRightActions={() =>
        Trash({ handlePress: props.eventRightAction, id: props.id })
      }
      containerStyle={{
        marginRight: 20,
      }}
    >
      <View style={{
        marginLeft: 29,
        marginTop: 20
      }}>

        <View
          style={{
            width: "100%",
            borderRadius: 20,
            backgroundColor: '#15192D',
            padding: 20,
            borderColor: "#3E3E3E",
            borderWidth: 1,
            borderStyle: 'dashed',
          }}
        >
          <Text style={{
            fontSize: 16,
            fontWeight: 700,
            fontFamily: "Open Sans",
            color: '#FFF'
          }}>{props.title}</Text>

          <Text style={{
            fontSize: 14,
            fontWeight: 400,
            fontFamily: "Open Sans",
            marginTop: 10,
            color: '#FFF',
          }}>{props.describe}</Text>
        </View>
        <View
          style={{
            width: 36,
            height: 36,
            borderRadius: 18,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#E02F99',
            position: 'absolute',
            top: -15,
            left: -10,
            borderColor: "#090B14",
            borderWidth: 3
          }}
        >
          <Image source={require('../../Assets/Note/Pin.png')} />
        </View>
      </View>
    </Swipeable>
  )
}

export default NoteItem
