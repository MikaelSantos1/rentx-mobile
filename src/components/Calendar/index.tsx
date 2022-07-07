import React from 'react';
import {
    Calendar  as CustomCalendars,
    LocaleConfig
}from 'react-native-calendars'
LocaleConfig.locales['pt-BR']={
    monthNames:['janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho', 'julho', 'agosto', 'setembro', 'outubro', 'novembro' , 'dezembro'],
    monthNamesShort:['Jan','Fev','Mar','Abril','Mai','Jun','Jul','Ago','Set','Out','Nov','Dez'],
    dayNames:['Domingo','Segunda','Terça','Quarta','Quinta','Sexta','Sabado'],
    dayNamesShort:['Dom','Seg','Ter','Qua','Qui','Sex','Sab'],
    today:'Hoje'
}
LocaleConfig.defaultLocale='pt-BR'
import {Feather} from '@expo/vector-icons'
import { useTheme } from 'styled-components';
export function Calendar(){
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
    />

    
  );
}