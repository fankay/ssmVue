package com.kaishengit.service;

import com.kaishengit.dao.MovieMapper;
import com.kaishengit.pojo.Movie;
import org.springframework.transaction.annotation.Transactional;

import javax.inject.Inject;
import javax.inject.Named;
import java.util.List;

@Named
@Transactional
public class MovieService {

    @Inject
    private MovieMapper movieMapper;

    public List<Movie> findAll() {
        return movieMapper.findAll();
    }


    public void save(Movie movie) {
        movieMapper.save(movie);
    }

    public Movie findMovieById(Integer id) {
        return movieMapper.findById(id);
    }

    public void delMovie(Integer id) {
        movieMapper.remove(id);
    }

    public void editMovie(Movie movie) {
        movieMapper.update(movie);
    }
}
