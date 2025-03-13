import React, { useState } from 'react';
import Slider from 'react-slick';
import '../components/style/Home.css';
import '../App.css';
import Nav from '../components/Nav';
import  ReeltalkFooter  from '../components/ReeltalkFooter';

function Home() {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (newComment.trim()) {
      setComments([...comments, newComment]);
      setNewComment('');
    }
  };

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  const featuredMovies = [
    {
      title: 'Dune: Part Two (2024)',
      imageUrl: "https://www.filma24.bike/wp-content/uploads/dune-pjesa-2-me-titra-shqip.jpg",
    },
    {
      title: 'The Beekeeper (2024)',
      imageUrl: "https://www.filma24.bike/wp-content/uploads/A7EByudX0eOzlkQ2FIbogzyazm2-1.jpg",
    },
    {
      title: 'Poor Things (2023)',
      imageUrl: "https://www.filma24.bike/wp-content/uploads/rsz_6jbvaane1nijlbgy9goc5kphaoj.png",
    },
    {
      title: 'Madame Web (2024)',
      imageUrl: "https://www.filma24.bike/wp-content/uploads/rULWuutDcN5NvtiZi4FRPzRYWSh.jpg",
    },
    {
      title: 'Argylle (2024)',
      imageUrl: "https://www.filma24.bike/wp-content/uploads/95VlSEfLMqeX36UVcHJuNlWEpwf.jpg",
    },
  ];
  return (
    <div>
      <nav>
        <Nav/>
      </nav>
      <div className='home-body'> 
        <header className="home-header">
          <h1>Mirë se vini në Kinema Online!</h1>
          <p>Shijoni filmat më të fundit dhe më të njohur.</p>
          <img src="https://static.vecteezy.com/system/resources/previews/021/850/617/non_2x/realistic-cinema-poster-vector.jpg" alt="Banner" className="banner-image" />
        </header>

        <section className="featured-movies">
          <h2>Filma të zgjedhur</h2>
          <Slider {...sliderSettings}>
            {featuredMovies.map((movie, index) => (
              <div key={index} className="movie-slide">
                <img src={movie.imageUrl} alt={movie.title} />
                <h3>{movie.title}</h3>
              </div>
            ))}
          </Slider>
        </section>

        <section className="comments-section">
          <h2>Komente</h2>
          <div className="comments-list">
            {comments.map((comment, index) => (
              <p key={index}>{comment}</p>
            ))}
          </div>
          <form onSubmit={handleCommentSubmit} className="comment-form">
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Shkruaj një koment..."
            />
            <button type="submit">Posto Komentin</button>
          </form>
        </section>
      </div>
      <ReeltalkFooter />
    </div>
  );
}

export default Home;