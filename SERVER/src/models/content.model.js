import mongoose from 'mongoose';

const cineSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  group: {
    type: String,
    enum: ['movie', 'webseries', 'tvshow'],
    default: 'movie',
  },
  cast: {
    type: [
      {
        actors: {
          type: [
            {
              name: {
                type: String,
              },
            },
          ],
        },
      },
    ],
    required: true,
  },
});

const shelfSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  group: {
    type: String,
    enum: ['book', 'magazine'],
    default: 'book',
  },
});

const Cine = mongoose.model('Cine', cineSchema);
const Shelf = mongoose.model('Shelf', shelfSchema);

export { cineSchema, Cine, shelfSchema, Shelf };
