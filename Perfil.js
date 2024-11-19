import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Perfil.css';
import { HouseIcon, MessageCircleHeart, User, Star } from 'lucide-react';

const ProfilePage = () => {
  const [avatar, setAvatar] = useState('fotoperfil.png');
  const [carouselIndex, setCarouselIndex] = useState(0);
  const [favoriteCommunities, setFavoriteCommunities] = useState([]);
  const navigate = useNavigate();
  const imagesPerPage = 4;

  const carouselImages = [
    { src: "casadamulher.jpg", title: "Casa da Mulher" },
    { src: "woman.jpg", title: "Empoderamento Feminino" },
    { src: "mulheres.jpg", title: "Rede de Apoio" },
    { src: "maternidade.jpg", title: "Maternidade Consciente" },
    { src: "mulherskincuidado.jpg", title: "Auto Cuidado" },
    { src: "violencia.png", title: "Combate à Violência" },
    { src: "mulhertecn.jpg", title: "Mulheres na Tecnologia" },
    { src: "relacioabusivo.jpeg", title: "Relacionamento Abusivo" }
  ];

  useEffect(() => {
    const savedAvatar = localStorage.getItem('selectedAvatar');
    if (savedAvatar) {
      setAvatar(savedAvatar);
    }

    const savedFavorites = localStorage.getItem('favoritedCommunities');
    if (savedFavorites) {
      const parsedFavorites = JSON.parse(savedFavorites);
      setFavoriteCommunities(parsedFavorites);
    }
  }, []);

  const toggleFavorite = (community) => {
    const isFavorited = favoriteCommunities.some(fav => fav.src === community.src);
    const updatedFavorites = isFavorited
      ? favoriteCommunities.filter(fav => fav.src !== community.src)
      : [...favoriteCommunities, community];

    setFavoriteCommunities(updatedFavorites);
    localStorage.setItem('favoritedCommunities', JSON.stringify(updatedFavorites));
  };

  const goToAvatar = () => {
    navigate('/avatares');
  };

  const goToCommunities = () => {
    navigate('/communities');
  };

  const handleScrollLeft = () => {
    setCarouselIndex(prevIndex => Math.max(prevIndex - imagesPerPage, 0));
  };

  const handleScrollRight = () => {
    setCarouselIndex(prevIndex =>
      Math.min(prevIndex + imagesPerPage, carouselImages.length - imagesPerPage)
    );
  };

  return (
    <div className="profile-page">
      <div className="menu">
        <div className="logo-aelin">
          <img src="logoaelin.png" style={{ width: '70px', height: '70px' }} alt="Logo Aelin" />
        </div>
        <div className="menu-items">
          <button className="menu-button" onClick={goToCommunities}>
            <HouseIcon className="icon-menu" />
          </button>
          <button className="menu-button">
            <MessageCircleHeart className="icon-menu" />
          </button>
          <button className="menu-button-active">
            <User className="user-icon" />
          </button>
        </div>
      </div>
      <div className="content">
        <div className="profile-card">
          <div className="profile-info">
            <div className="avatar-edit-container">
              <img src={avatar === 'abraxoslaranja' ? 'abraxoslaranja.png' : avatar === 'abraxosazul' ? 'abraxosazul.png' : avatar === 'abraxosroxo' ? 'abraxosroxo.png' : avatar === 'abraxospreto' ? 'abraxospreto.png' : 'fotoperfil.png'} alt="Profile" className="avatar" />
              <button className="edit-avatar-button" onClick={goToAvatar}>
                <img src="lapiseditar.png" alt="Edit Icon" className="edit-icon" />
              </button>
            </div>
            <h1 className="profile-name">Rayssa Maravilhosa</h1>
            <div className="communities-count">
              <div className="communities-info">
                <span className="community-number">{favoriteCommunities.length}</span>
                <h2 className="communities-title">
                  {favoriteCommunities.length === 1 ? 'Comunidade' : 'Comunidades'}
                </h2>
              </div>
              <button className="explore-button" onClick={goToCommunities}>
                Explorar
              </button>
            </div>
            <div className="divider-line"></div>

            <div className="favorite-communities-container">
              {favoriteCommunities.length > 0 ? (
                favoriteCommunities.map((community, index) => (
                  <div className="community-button" key={index}>
                    <div className="community-image-container">
                      <img src={community.src} alt={community.title} className="community-image" />
                      <button className="favorite-button" onClick={() => toggleFavorite(community)}>
                        <Star
                          className={`star-icon ${favoriteCommunities.some(fav => fav.src === community.src) ? 'filled' : ''}`}
                        />
                      </button>
                    </div>
                    <p className="community-text">{community.title}</p>
                  </div>
                ))
              ) : (
                <p className="no-favorites-message">Favorite uma comunidade e ela aparecerá aqui, experimente!</p>
              )}
            </div>

            <div className="divider-line recommendations"></div>

            <div className="carousel-container">
              <button className="carousel-button left" onClick={handleScrollLeft}>
                <img src="esquerda.png" alt="Scroll Left" />
              </button>
              <div className="carousel">
                <div className="carousel-track">
                  {carouselImages.slice(carouselIndex, carouselIndex + imagesPerPage).map((community, index) => (
                    <div className="carousel-image-container" key={index}>
                      <img src={community.src} alt={community.title} className="carousel-image" />
                      <button className="favorite-button" onClick={() => toggleFavorite(community)}>
                        <Star
                          className={`star-icon ${favoriteCommunities.some(fav => fav.src === community.src) ? 'filled' : ''}`}
                        />
                      </button>
                      <p className="community-text">{community.title}</p>
                    </div>
                  ))}
                </div>
              </div>
              <button className="carousel-button right" onClick={handleScrollRight}>
                <img src="direita.png" alt="Scroll Right" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
