import mongoose from "mongoose";

const movieSchema = new mongoose.Schema({
  room: { 
    type: Number, 
    required: true, 
    enum: [1, 2, 3, 4] // Restringe os valores possíveis para as salas
  },
  name: { type: String, required: true },
  synopsis: { type: String, required: true },
  image: { type: String, required: true }, // URL ou caminho da imagem
  ticketPrice: { type: Number, required: true, min: 0 },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Movie", movieSchema);
