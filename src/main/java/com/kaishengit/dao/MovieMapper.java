package com.kaishengit.dao;

import com.kaishengit.pojo.Movie;

import java.util.List;

public interface MovieMapper {

    List<Movie> findAll();

    void save(Movie movie);

    Movie findById(Integer id);

    void remove(Integer id);

    void update(Movie movie);
}
