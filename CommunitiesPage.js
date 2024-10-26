import React, { useState, useContext } from 'react';
import '../styles/Comunidades.css'; // Caminho para o CSS
import { Search, Star, User, MessageCircleHeart, HouseIcon } from 'lucide-react';
import { FavoritesContext } from '../FavoritesContext';
import { Link } from 'react-router-dom'; // Importando o Link

const CommunitiesPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [favoritedCommunities, setFavoritedCommunities] = useState(() => {
    // Inicializa as comunidades favoritas com o valor do localStorage
    const storedFavorites = localStorage.getItem('favoritedCommunities');
    return storedFavorites ? JSON.parse(storedFavorites) : [];
  });

  const communities = [
    {
      id: 1,
      title: 'Sinais de um relacionamento Abusivo',
      image: '/mulher.png',
    },
    {
      id: 2,
      title: 'Aprenda sobre auto cuidado e Autodefesa',
      image: '/self-care.jpg',
    },
    {
      id: 3,
      title: 'Mulheres na Tecnologia',
      image: '/women-tech.jpg',
    }
  ];

  // Função para alternar o estado de favoritar
  const toggleFavorite = (communityId, communityTitle, communityImage) => {
    let updatedFavorites;
    
    if (favoritedCommunities.some(c => c.id === communityId)) {
      // Remove a comunidade dos favoritos
      updatedFavorites = favoritedCommunities.filter(c => c.id !== communityId);
    } else {
      // Adiciona a comunidade aos favoritos
      const newFavorite = {
        id: communityId,
        name: communityTitle,
        imageSrc: communityImage
      };
      updatedFavorites = [...favoritedCommunities, newFavorite];
    }

    setFavoritedCommunities(updatedFavorites);
    localStorage.setItem('favoritedCommunities', JSON.stringify(updatedFavorites));
  };

  return (
    <div className="communities-container">
      {/* Sidebar permanece fixa */}
      <div className="sidebar">
        <div className="logo-container">
          <img src="/logo.png" alt="Logo" className="logo" />
        </div>
        <div className="nav-buttons">
          <button className="menu-button-active">
            <HouseIcon className="house-icon" />
          </button>
          <button className="menu-button">
            <MessageCircleHeart className="icon-menu" />
          </button>
          <Link to="/profile">
            <button className="menu-button">
              <User className="icon-menu" />
            </button>
          </Link>
        </div>
      </div>

      {/* Conteúdo principal dentro do container grandão */}
      <main className="main-content">
        <div className='container-principal'>
          <h1 className="main-title">Encontre lugares de fala aqui!</h1>
          <p className="subtitle">Faça já parte de umas das nossas comunidades.</p>

          {/* Barra de pesquisa */}
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

          {/* Lista de comunidades */}
          <div className="communities-list">
            {communities
              .filter(community => community.title.toLowerCase().includes(searchTerm.toLowerCase()))
              .map(community => (
              <div key={community.id} className="community-card">
                <img 
                  src={community.image} 
                  alt={community.title} 
                  className="community-image" 
                />
                <div className="community-info">
                  <h2 className="community-title">{community.title}</h2>
                  <div className="action-button">
                    <button className="espie-button">
                      Espie e Participe
                    </button>
                    {/* Estrela interativa */}
                    <Star
                      className={`star-icon ${favoritedCommunities.some(c => c.id === community.id) ? 'filled' : ''}`}
                      onClick={() => toggleFavorite(community.id, community.title, community.image)}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default CommunitiesPage;
