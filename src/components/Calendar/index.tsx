import React from 'react';
import {
    Calendar  as CustomCalendars,
    DateData,
    LocaleConfig,

}from 'react-native-calendars'
LocaleConfig.locales['pt-BR']=ptBR
LocaleConfig.defaultLocale='pt-BR'
import { generateInterval } from './generateInterval';
import {Feather} from '@expo/vector-icons'
import { useTheme } from 'styled-components';
import { ptBR } from './localeConfig';

interface MarkedDateProps{
    [date:string]:{
        color:string;
        textColor:string;
        disabled?:boolean;
        disableTouchEvent?:boolean;
    }
}
interface CalendarProps{
    marketDates:MarkedDateProps;
    onDayPress:(date:DateData)=>void;
}

 interface DayProps{
    dateString:string;
    day:number;
    month:number;
    timestamp:number;
    year:number;
}

 function Calendar({marketDates,onDayPress}:CalendarProps){
    const theme = useTheme()
  return (
    <CustomCalendars renderArrow={(direction)=>
        <Feather
        size={24}
        color={theme.colors.text}
        name={direction==='left'?"chevron-left":"chevron-right"}
        />
    
    }
    headerStyle={{
        backgroundColor:theme.colors.background_secondary,
        borderBottomWidth:0.5,
        borderBottomColor:theme.colors.text_detail,
        paddingBottom:10,
        marginBottom:10
        
    }}
    theme={{
        textDayFontFamily:theme.fonts.primary_400,
        textDayHeaderFontFamily:theme.fonts.primary_500,
        textDayHeaderFontSize:10,
        textMonthFontSize:20,
        textMonthFontFamily:theme.fonts.secondary_600,
        monthTextColor:theme.colors.title,
        arrowStyle:{
            marginHorizontal:-15
        }
    }}
    firstDay={1}
    minDate={String(new Date())}
    markingType="period"
    markedDates={marketDates}
    onDayPress={onDayPress}
    />

    
  );
}

export {MarkedDateProps,DayProps,generateInterval,Calendar}