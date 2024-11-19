// Avatares.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Avatares.css';

const Avatares = () => {
  const [selectedImage, setSelectedImage] = useState(localStorage.getItem('selectedAvatar') || 'fotoperfil.png');
  const navigate = useNavigate();

  const handleImageClick = (imageId) => {
    setSelectedImage(imageId); // Define o identificador como selecionado
  };

  const handleSave = () => {
    // Salva o avatar selecionado no localStorage
    localStorage.setItem('selectedAvatar', selectedImage);
    navigate('/perfil'); // Navega para a página de perfil
  };

  return (
    <div className="container">
      <div className="profile">
        <img 
          src={
            selectedImage === 'abraxoslaranja'
              ? 'abraxoslaranja.png'
              : selectedImage === 'abraxosazul'
              ? 'abraxosazul.png'
              : selectedImage === 'abraxosroxo'
              ? 'abraxosroxo.png'
              : selectedImage === 'abraxospreto'
              ? 'abraxospreto.png'
              : 'fotoperfil.png'
          } 
          alt="Avatar" 
          className="avatar" 
        />
        <h2 className="profile-name">Rayssa Maravilhosa</h2>
      </div>
      <div className="selection-grid">
        <div className={`selection-container ${selectedImage === 'abraxoslaranja' ? 'selected' : ''}`}>
          <img src="abraxoslaranja.png" alt="Option 1" className="selection-item" onClick={() => handleImageClick('abraxoslaranja')} />
        </div>
        <div className={`selection-container ${selectedImage === 'abraxosazul' ? 'selected' : ''}`}>
          <img src="abraxosazul.png" alt="Option 2" className="selection-item" onClick={() => handleImageClick('abraxosazul')} />
        </div>
        <div className={`selection-container move-left ${selectedImage === 'abraxosroxo' ? 'selected' : ''}`}>
          <img src="abraxosroxo.png" alt="Option 3" className="selection-item" onClick={() => handleImageClick('abraxosroxo')} />
        </div>
        <div className={`selection-container ${selectedImage === 'abraxospreto' ? 'selected' : ''}`}>
          <img src="abraxospreto.png" alt="Option 4" className="selection-item" onClick={() => handleImageClick('abraxospreto')} />
        </div>
      </div>
      <button className="save-button" onClick={handleSave}>Salvar</button>
    </div>
  );
};

export default Avatares;
