import React, { useState, useEffect } from 'react';
import '../styles/Comunidades.css';
import { Search, Star, User, MessageCircleHeart, HouseIcon } from 'lucide-react';
import { Link } from 'react-router-dom';

const CommunitiesPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [favoritedCommunities, setFavoritedCommunities] = useState(() => {
    const savedFavorites = localStorage.getItem('favoritedCommunities');
    return savedFavorites ? JSON.parse(savedFavorites).filter(fav => fav && fav.id) : [];
  });

  const communities = [
    { id: 1, title: 'Sinais de um relacionamento Abusivo', image: '/relacioabusivo.jpeg' },
    { id: 2, title: 'Aprenda sobre auto cuidado e Autodefesa', image: '/mulherskincuidado.jpg' },
    { id: 3, title: 'Mulheres na Tecnologia', image: '/mulhertecn.jpg' },
    { id: 4, title: 'Casa da Mulher', image: '/casadamulher.jpg' },
    { id: 5, title: 'Empoderamento Feminino', image: '/woman.jpg' },
    { id: 6, title: 'Rede de Apoio', image: '/mulheres.jpg' },
    { id: 7, title: 'Maternidade Consciente', image: '/maternidade.jpg' },
    { id: 8, title: 'Combate a Violência', image: '/violencia.png' }
  ];
  
  useEffect(() => {
    localStorage.setItem('favoritedCommunities', JSON.stringify(favoritedCommunities));
  }, [favoritedCommunities]);

  const toggleFavorite = (community) => {
    const isFavorited = favoritedCommunities.some(fav => fav && fav.id === community.id);
    const formattedCommunity = {
      src: community.image,
      title: community.title,
      id: community.id
    };

    if (isFavorited) {
      setFavoritedCommunities(favoritedCommunities.filter(fav => fav && fav.id !== community.id));
    } else {
      setFavoritedCommunities([...favoritedCommunities, formattedCommunity]);
    }
  };

  const filteredCommunities = communities.filter(community =>
    community.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="communities-container">
      <div className="sidebar">
        <div className="logo-container">
          <img src="logoaelin.png" style={{ width: '70px', height: '70px' }} alt="Logo Aelin" />
        </div>
        <div className="nav-buttons">
          <button className="menu-button-active">
            <HouseIcon className="house-icon" />
          </button>
          <button className="menu-button">
            <MessageCircleHeart className="icon-menu" />
          </button>
          <Link to="/perfil">
            <button className="menu-button">
              <User className="icon-menu" />
            </button>
          </Link>
        </div>
      </div>

      <main className="main-content">
        <div className='container-principal'>
          <h1 className="main-title">Encontre lugares de fala aqui!</h1>
          <p className="subtitle">Faça já parte de uma das nossas comunidades.</p>

          <div className="search-container">
            <Search className="search-icon" />
            <input
              type="text"
              placeholder="Pesquise aqui"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>

          <div className="communities-list">
            {filteredCommunities.length > 0 ? (
              filteredCommunities.map(community => (
                <div key={community.id} className="community-card">
                  <img 
                    src={community.image} 
                    alt={community.title} 
                    className="community-image" 
                    style={{ width: '150px', height: '150px' }} 
                  />
                  <div className="community-info">
                    <h2 className="community-title">{community.title}</h2>
                    <div className="action-button">
                      <button className="espie-button">
                        Espie e Participe
                      </button>
                      <Star
                        className={`star-icon ${favoritedCommunities.some(fav => fav && fav.id === community.id) ? 'filled' : ''}`}
                        onClick={() => toggleFavorite(community)}
                      />
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="no-results-message">Essa comunidade não foi criada ainda.</p>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default CommunitiesPage;
