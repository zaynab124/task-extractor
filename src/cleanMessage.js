function cleanMessage(msg) {
    if (!msg) return null;
  
    return msg
      .replace(/[\p{Emoji_Presentation}\p{Extended_Pictographic}]/gu, '') // supprimer TOUS les emojis
      .replace(/[\n\r\t]/g, ' ')       // sauts de ligne → espace
      .replace(/\s+/g, ' ')       // remplace plusieurs espaces par 1 seul
      .trim();                         // supprimer espaces inutiles
     
   
  }
  module.exports = cleanMessage;
  