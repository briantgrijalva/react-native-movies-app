import { StackScreenProps } from '@react-navigation/stack';
import React from 'react';
import { Dimensions, Image, ScrollView, StyleSheet, Text, View, ActivityIndicator, TouchableOpacity } from 'react-native';
// import { Movie } from '../interfaces/movieinterface';
import { RootStackParams } from '../navigation/Navigation';

// import Icon from 'react-native-vector-icons/Ionicons';
import { useMovieDetails } from '../hooks/useMovieDetails';
import { MovieDetails } from '../components/MovieDetails';
import Icon from 'react-native-vector-icons/Ionicons';

const screenHeight = Dimensions.get('screen').height;

interface Props extends StackScreenProps<RootStackParams, 'DetailScreen'> {

}

export const DetailScreen = ( { route, navigation }: Props ) => {

    const movie = route.params;
    const uri = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
    const { cast, movieFull, isLoading } = useMovieDetails(movie.id);


  return (

    <ScrollView>
        <View style={styles.imageContainer}>
            <View style={styles.imageBorder}>
                <Image
                    source={{ uri }}
                    style={styles.posterImage}
                />
            </View>
        </View>

        <View style={styles.marginContainer}>
            <Text style={styles.subTitle}>{movie.original_title}</Text>
            <Text style={styles.title}>{movie.title}</Text>
        </View>

        {
            isLoading ? (
                <ActivityIndicator
            // eslint-disable-next-line react-native/no-inline-styles
                    style={{marginTop: 20}}
                    size={30}
                    color="grey"
                />
            ) : (
                <MovieDetails movieFull={movieFull!} cast={cast}/>
            )
        }
        <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
        >
            <Icon
                color="white"
                name="arrow-back-outline"
                size={50}
            />
        </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
    posterImage: {
        flex: 1,
    },
    imageContainer: {
        width: '100%',
        height: screenHeight * 0.7,
        // overflow: 'hidden',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 10,
        },
        shadowOpacity: 0.24,
        shadowRadius: 7,
        elevation: 9,
        borderBottomEndRadius: 25,
        borderBottomStartRadius: 25,
    },
    imageBorder: {
        overflow: 'hidden',
        borderBottomEndRadius: 25,
        borderBottomStartRadius: 25,
        flex: 1,
    },
    marginContainer: {
        marginHorizontal: 20,
        marginTop: 20,
    },
    subTitle: {
        fontSize: 16,
        opacity: 0.8,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    backButton: {
        position: 'absolute',
        top: 30,
        left: 5,
        elevation: 9,
        zIndex: 1,
    },
});
