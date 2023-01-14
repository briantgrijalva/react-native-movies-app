import { useState, useEffect } from 'react';
import movieDB from '../api/movieDB';
import { Cast, CreditsResponse } from '../interfaces/creditsInterface';
import { MovieFull } from '../interfaces/movieinterface';

interface MovieDetails {
    isLoading: boolean;
    movieFull?: MovieFull;
    cast: Cast[];
}

export const useMovieDetails = (movieId : number) => {

    const [state, setState] = useState<MovieDetails>({
        isLoading: true,
        movieFull: undefined,
        cast: [],
    });

    const getMovieDetails = async () => {

        const movieDetailsPromise =  movieDB.get<MovieFull>(`/${movieId}`);
        const castPromise = movieDB.get<CreditsResponse>(`/${movieId}/credits`);

        const [castPromiseResp, movieDetailsPromiseResp] = await Promise.all([castPromise, movieDetailsPromise]);

        setState({
            isLoading: false,
            movieFull: movieDetailsPromiseResp.data,
            cast: castPromiseResp.data.cast,
        });
    };

    useEffect(() => {
      getMovieDetails();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return {
        ...state,
    };
};
