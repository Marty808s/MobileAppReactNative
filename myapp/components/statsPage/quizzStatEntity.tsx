import { useState, useEffect, useCallback } from "react";
import { Text, Surface, Button } from 'react-native-paper';
import { View, ScrollView, FlatList, Dimensions } from 'react-native'
import { StatEntityProps } from "@/interfaces/QuizzInterface";
import { BarChart } from 'react-native-chart-kit';


export default function StatEntity({ entity }: { entity: StatEntityProps }) {
    const screenWidth = Dimensions.get('window').width;
    const dataLength = entity.quizz.quiz_data?.length || 0;
    const chartWidth = Math.max(screenWidth - 80, dataLength * 100); // minimální šířka pro scroll

    const dataToView = {
        labels: entity.quizz.quiz_data?.map((_, index) => `${index + 1}`) || [],
        datasets: [
            {
                data: entity.quizz.quiz_data?.map((_, index) => entity.score.score) || []
            }
        ]
    };

    const chartConfig = {
        backgroundColor: '#ffffff',
        backgroundGradientFrom: '#ffffff',
        backgroundGradientTo: '#ffffff',
        decimalPlaces: 0,
        color: (opacity = 1) => `rgba(103, 22, 209, ${opacity})`,
        labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
        style: {
            borderRadius: 16
        },
        barPercentage: 0.7,
        propsForLabels: {
            fontSize: 12
        }
    };

    return (
        <Surface 
            style={{ 
                margin: 10, 
                padding: 15, 
                borderRadius: 10,
                elevation: 2
            }}
        >
            <View style={{ marginBottom: 15 }}>
                <Text style={{ 
                    fontSize: 18, 
                    fontWeight: 'bold',
                    marginBottom: 5
                }}>
                    {entity.quizz.name}
                </Text>
                <Text style={{ 
                    color: 'gray',
                    fontSize: 14
                }}>
                    Počet pokusů: {dataLength}
                </Text>
            </View>

            <ScrollView 
                horizontal 
                showsHorizontalScrollIndicator={true}
                contentContainerStyle={{ paddingRight: 10 }}
            >
                <BarChart
                    data={dataToView}
                    width={chartWidth}
                    height={300}
                    chartConfig={chartConfig}
                    verticalLabelRotation={0}
                    showValuesOnTopOfBars={true}
                    yAxisLabel=""
                    yAxisSuffix="p"
                    xAxisLabel="P"
                    fromZero={true}
                    segments={3}
                />
            </ScrollView>
        </Surface>
    )
}