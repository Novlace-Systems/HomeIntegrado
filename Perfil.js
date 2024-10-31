// Perfil.js
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Perfil.css';
import { HouseIcon, MessageCircleHeart, User } from 'lucide-react';

const ProfilePage = () => {
  const [avatar, setAvatar] = useState('fotoperfil.png');
  const [carouselIndex, setCarouselIndex] = useState(0);
  const navigate = useNavigate();
  const imagesPerPage = 4;

  const carouselImages = [
    "casadamulher.jpg", "woman.jpg", "mulheres.jpg", "casadamulher.jpg",
    "imagem.png", "imagem.png", "imagem.png", "imagem.png"
  ];

  useEffect(() => {
    const savedAvatar = localStorage.getItem('selectedAvatar');
    if (savedAvatar) {
      setAvatar(savedAvatar);
    }
  }, []);

  const goToAvatar = () => {
    navigate('/avatares');
  };

  const goToCommunities = () => {
    navigate('/communities');  // Navega para a página de comunidades
  };

  const handleScrollLeft = () => {
    setCarouselIndex(prevIndex => Math.max(prevIndex - imagesPerPage, 0));
  };

  const handleScrollRight = () => {
    setCarouselIndex(prevIndex => 
      Math.min(prevIndex + imagesPerPage, carouselImages.length - imagesPerPage)
    );
  };

  const addToFavorites = (image) => {
    console.log(`Adicionado ${image} aos favoritos!`);
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
              <img src={avatar} alt="Profile" className="avatar" />
              <button className="edit-avatar-button" onClick={goToAvatar}>
                <img src="lapiseditar.png" alt="Edit Icon" className="edit-icon" />
              </button>
            </div>
            <h1 className="profile-name">Rayssa Maravilhosa</h1>
            <div className="communities-count">
              <div className="communities-info">
                <span className="community-number">0</span>
                <h2 className="communities-title">Comunidades</h2>
              </div>
              <button className="explore-button" onClick={goToCommunities}>Explorar</button>
            </div>
            <div className="divider-line"></div>
            
            <div className="favorite-communities-container">
              <p className="no-favorites-message">Favorite uma comunidade e ela aparecerá aqui, experimente!</p>
            </div>

            <div className="divider-line recommendations"></div>

            <div className="carousel-container">
              <button className="carousel-button left" onClick={handleScrollLeft}>
                <img src="esquerda.png" alt="Scroll Left" />
              </button>
              <div className="carousel">
                <div className="carousel-track">
                  {carouselImages.slice(carouselIndex, carouselIndex + imagesPerPage).map((image, index) => (
                    <div className="carousel-image-container" key={index}>
                      <img src={image} alt={`Recomendação ${index + 1}`} className="carousel-image" />
                      <button className="favorite-button" onClick={() => addToFavorites(image)}>
                        <img src="estrela.png" alt="Adicionar aos favoritos" />
                      </button>
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
