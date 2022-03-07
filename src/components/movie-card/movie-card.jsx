import React from "react";
import PropTypes from "prop-types";
import "./movie-card.scss"

import { CardGroup, Container, Button, Card } from "react-bootstrap";

export class MovieCard extends React.Component {
    render () {
        const { movie, onMovieClick } = this.props;
        
        return (
            <Container>
                <CardGroup>
                    <Card id="movie-card">
                        <a><Card.Img variant="top" src={movie.ImagePath} /></a>
                        <Card.Body>
                            <Card.Title id="card-title">{movie.Title}</Card.Title>
                            <Button id="card-button" onClick={() => onMovieClick(movie)} variant="link">Show more</Button>
                        </Card.Body>
                    </Card>
                </CardGroup>
            </Container>
        )
    };
}

MovieCard.propTypes = {
    movie: PropTypes.shape({
        Title: PropTypes.string.isRequired
    }).isRequired,
    onMovieClick: PropTypes.func.isRequired
};