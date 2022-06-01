import React from "react";
import axios from 'axios';

import { connect } from 'react-redux';

import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";

import { setMovies } from '../../actions/actions';

import MoviesList from '../movies-list/movies-list'; 

import { LoginView } from '../login-view/login-view';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { RegistrationView } from '../registration-view/registration-view';
import { DirectorView } from '../director-view/director-view'; 
import { GenreView } from '../genre-view/genre-view';
import { ProfileView } from "../profile-view/profile-view";
import { NavbarView } from '../navbar-view/navbar-view';
import userData from '../profile-view/profile-view';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

import './main-view.scss';

class MainView extends React.Component {

  constructor(){
    super();
    this.state = {
      selectedMovie: null,
      directors: [],
      genres:[],
      user: null,
      movies: [],
      FavoriteMovies: [],
      u: {},
    };
  }

    getMovies(token){
      axios.get('https://movieanorak.herokuapp.com/movies', {
      headers: { Authorization: `Bearer ${token}`}
    })
    .then(response => {
      this.props.setMovies(response.data);
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  componentDidMount(){
    let accessToken = localStorage.getItem('token');
    if(accessToken !== null){
      this.setState({
        user: localStorage.getItem('user'),
      });
      this.getMovies(accessToken);
    }
    }

  /* When a user successfully logs in, this function updates the `user` property in state to that *particular user*/

  onLoggedIn(authData) {
    // console.log(authData);
    this.setState({
      u: authData.user,
      user: authData.user.Username,
      FavoriteMovies: authData.user.FavoriteMovies,
    });

    localStorage.setItem('token', authData.token);
    localStorage.setItem('user', authData.user.Username);
    // localStorage.setItem('favoriteMovies', authData.user.Favorites);
    this.getMovies(authData.token);
  }

  onLoggedOut(){
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.setState({
      user: null
    });
  };


  render() {

    let { movies } = this.props;
    
    const { user, selectedMovie, directors, genres, FavoriteMovies } = this.state;

    return(
      <Router>
        <Button id="logout-button" onClick={() => { this.onLoggedOut() }}>Logout</Button>
        <NavbarView user={user} />  
        <Container>

        <Row className="main-view justify-content-md-center">


          <Route exact path="/" render={() => {
            if (!user) return <Col>
              <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
            </Col>
            if (movies.length === 0) return <div className="main-view" />;
           
            return <MoviesList movies={movies}/>;

          }} />

        <Route exact path="/login" render={() => {
            if (user) {
              return <Redirect to="/" />;
                }
              return <LoginView onLoggedIn={(data) => this.onLoggedIn(data)} />
        }} />

        <Route path="/register" render={() => {
          if (user) return <Redirect to="/" />
          return <Col>
          <RegistrationView />
          </Col>
        }} />

        <Route exact path="/movies/:movieId" render ={({ match, history }) => {
          if (!user) { 
          return (
            <Col>
              <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
            </Col>
          );
                        }

                        if (movies.length === 0) {
                            return <div className="movie-view" />;
                        }

                        return (

                        <Col md={8}>
                                <MovieView movie={movies.find(m => m._id === match.params.movieId)} 
                                onBackClick={() => history.goBack()} />
                            </Col>
                        );
                    }} />

<Route exact path="/director/:name" render={({ match, history }) => {
                        if (!user) {
                            return (
                                <Col>
                                    <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
                                </Col>
                            );
                        }
                        
                        if (movies.length === 0)  {
                            return <div className="movie-view" />;
                        }

                        return (
                            <Col md={8}>
                                    <DirectorView 
                                    director={movies.find(m => m.Director.Name === match.params.name).Director} 
                                    onBackClick={() => history.goBack()} 
                                    movies={movies.filter(movie => movie.Director.Name === match.params.name)} />
                            </Col>
                        );
                    }} />

<Route path="/genre/:name" render={({ match, history }) => {
                        if (!user) {
                            return (
                                <Col>
                                    <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
                                </Col>
                            );
                        }

                        if (movies.length === 0)  {
                            return <div className="movie-view" />;
                        }

                        return (
                            <Col md={8}>
                                <GenreView
                                    genre={movies.find(m => m.Genre.Name === match.params.name).Genre}
                                    onBackClick={() => history.goBack()}
                                    movies={movies.filter(movie => movie.Genre.Name === match.params.name)} />
                            </Col>
                        );
                    }} />

          

            <Route exact path="/users/:Username" render={({ history }) => {
                        if (!user) {
                            return (
                                <Col>
                                    <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
                                </Col>
                            );
                        }

                        return (
                            <Col md={8}>
                                <ProfileView movies={movies} onBackClick={() => history.goBack()} />
                            </Col>
                        );
                    }} />

          <Route path={'/users/${user}'}
        render={({match, history}) => {
          if(!user) return <Redirect to="/" />
          return <Col>
            <UserUpdate user={user} 
            onBackClick={() => history.goBack()}/>
          </Col>
        }} />
        
         </Row>
         </Container>
        </Router> 
          
          );    
        }
      }

      let mapStateToProps = state => {
        return { movies: state.movies }
      }

      export default connect(mapStateToProps, { setMovies } )(MainView);