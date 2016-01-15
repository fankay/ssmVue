package com.kaishengit.controller;

import com.kaishengit.pojo.Movie;
import com.kaishengit.service.MovieService;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.inject.Inject;
import java.util.List;

@Controller
@RequestMapping("/movie")
public class MovieController {

    @Inject
    private MovieService movieService;

    @RequestMapping(method = RequestMethod.GET)
    @ResponseBody
    public List<Movie> list() {
        return movieService.findAll();
    }

    @RequestMapping(value = "/{id:\\d+}.json",method = RequestMethod.GET)
    @ResponseBody
    public Movie viewMovie(@PathVariable Integer id) {
        return movieService.findMovieById(id);
    }

    @RequestMapping(value = "/new",method = RequestMethod.POST)
    @ResponseBody
    public Movie newMovie(Movie movie) {
        movieService.save(movie);
        return movie;
    }

    @RequestMapping(value = "/{id:\\d+}",method = RequestMethod.DELETE)
    @ResponseBody
    public String remove(@PathVariable Integer id) {
        movieService.delMovie(id);
        return "success";
    }

    @RequestMapping(value = "/edit",method = RequestMethod.POST)
    @ResponseBody
    public String update(Movie movie) {
        movieService.editMovie(movie);
        return "success";
    }
}
