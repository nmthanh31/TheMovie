import React, {useState} from 'react';
import {Calendar, LocaleConfig} from 'react-native-calendars';
import {View, TouchableOpacity, StyleSheet} from 'react-native';
import {Text} from '@rneui/base';

LocaleConfig.locales['fr'] = {
  monthNames: [
    'Janvier',
    'Février',
    'Mars',
    'Avril',
    'Mai',
    'Juin',
    'Juillet',
    'Août',
    'Septembre',
    'Octobre',
    'Novembre',
    'Décembre',
  ],
  monthNames: [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ],
  monthNamesShort: [
    'Jan.',
    'Feb.',
    'Mar',
    'Apr',
    'May',
    'June',
    'July.',
    'Aug',
    'Sept.',
    'Oct.',
    'Nov.',
    'Dec.',
  ],
  dayNames: [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'ThursDay',
    'Friday',
    'Saturday',
  ],
  dayNamesShort: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
};
LocaleConfig.defaultLocale = 'fr';
const CalendarComp = props => {
  return (
    <View>
      <Calendar
        markingType={'custom'}
        headerStyle={{
          borderRadius: 10,
          backgroundColor: '#202538',
          // height:50,
        }}
        onDayPress={day => {
          props.setSelected(day.dateString);
        }}
        markedDates={{
          [props.selected]: {
            customStyles: {
              container: {
                backgroundColor: '#15192D',
                borderColor: '#F7BE13',
                borderWidth: 2,
              },
              text: {
                color: 'white',
              },
            },
          },
        }}
        theme={{
          calendarBackground: '#15192D',
          arrowColor: '#F7BE13',
          dayTextColor: '#FFFFFF',
          textDisabledColor: '#878D95',
          monthTextColor: '#888',
          textDayFontSize: 16,
          textMonthFontSize: 16,
          arrowWidth: 13.5,
          arrowHeight: 7.5,
          todayTextColor: '#F7BE13',
        }}
        style={{
          width: '100%',
          height: 330,
        }}
      />
    </View>
  );
};
export default CalendarComp;
