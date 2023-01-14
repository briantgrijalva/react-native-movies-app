import React from 'react';
import { View, Text, FlatList } from 'react-native';
import { Cast } from '../interfaces/creditsInterface';
import { MovieFull } from '../interfaces/movieinterface';
import Icon from 'react-native-vector-icons/Ionicons';
import currencyFormatter from 'currency-formatter';
import { CastItem } from './CastItem';

interface Props {
    movieFull: MovieFull;
    cast: Cast[];
}

export const MovieDetails = ({ cast, movieFull }: Props) => {
  return (
    <>
       <View
            // eslint-disable-next-line react-native/no-inline-styles
            style={{marginHorizontal: 20}}
       >
            <View
                // eslint-disable-next-line react-native/no-inline-styles
                style={{flexDirection: 'row'}}
            >
                <Icon
                    name="star-outline"
                    color="grey"
                    size={16}
                />

                <Text> {movieFull.vote_average}</Text>

                <Text
                    // eslint-disable-next-line react-native/no-inline-styles
                    style={{marginLeft: 5}}
                >
                    - {movieFull.genres.map(g => g.name).join(', ')}
                </Text>
            </View>

            <Text
                // eslint-disable-next-line react-native/no-inline-styles
                style={{fontSize: 23, marginTop: 10, fontWeight: 'bold'}}
            >
                Story
            </Text>

            <Text
                // eslint-disable-next-line react-native/no-inline-styles
                style={{fontSize: 16}}
            >
                {movieFull.overview}
            </Text>

            <Text
                // eslint-disable-next-line react-native/no-inline-styles
                style={{fontSize: 23, marginTop: 10, fontWeight: 'bold'}}
            >
                Budget
            </Text>

            <Text
                // eslint-disable-next-line react-native/no-inline-styles
                style={{fontSize: 18}}
            >
                {currencyFormatter.format( movieFull.budget, {code: 'USD'} )}
            </Text>
       </View>

        <View
            // eslint-disable-next-line react-native/no-inline-styles
            style={{marginTop: 10, marginBottom: 100}}
        >
            <Text
                // eslint-disable-next-line react-native/no-inline-styles
                style={{fontSize: 23, marginTop: 10, fontWeight: 'bold', marginHorizontal: 20}}
            >
                Actors
            </Text>
            <FlatList
                data={cast}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({item}) => <CastItem actor={item} />}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                // eslint-disable-next-line react-native/no-inline-styles
                style={{marginTop: 10, height: 70}}
            />
            {/* <CastItem actor={cast[0]} /> */}
        </View>
    </>
  );
};
