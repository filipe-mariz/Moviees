import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import Movies from '../model/Movies';
import moviesView from '../view/MoviesView';
import * as Yup from 'yup';

export default {
  async create(request: Request, response: Response) {
		const {
			name,
			time,
			price,
			description,
			data_born,
			data_end
		} = request.body;

		const movieRepository = await getRepository(Movies);

		const requestImages = request.files as Express.Multer.File[];
    	const image = requestImages.map(image => {
      		return { path: image.filename }
    	})

		const movieExists = await movieRepository.findOne({ where: { name }})
		if (movieExists) {
			return response.status(400).json({
				message: "Movie already exists"
			});
		}

		const data = {
			name,
			time,
			price,
			description,
			data_born,
			data_end,
			image
		}

		const schemma = Yup.object().shape({
			name: Yup.string().required(),
			time: Yup.string().required(),
			price: Yup.number().required(),
			description: Yup.string().required(),
			data_born: Yup.date().required(),
			data_end: Yup.date().required(),
			image: Yup.array(Yup.object().shape({
				path: Yup.string().required(),
			})),
		})

		await schemma.validate(data, {
      abortEarly: false
		})
		
		const employ = movieRepository.create(data);
		await movieRepository.save(employ);

		return response.status(200).json({
      message: "employee created"
    })
	},

	async viewOne(request: Request, response: Response) {
		const { id } = request.params

    	const movies = await getRepository(Movies).findOneOrFail(id);

    	return response.status(200).json(moviesView.Render(movies))
	},

	async viewAll(request: Request, response: Response) {
		const moviesRepository = getRepository(Movies);
	
		const movies = await moviesRepository.find();
	
		return response.status(200).json(moviesView.renderMany(movies))
	},

	async destroy(request: Request, response: Response) {
		const results = await getRepository(Movies).delete(request.params.id)
	
		return response.status(200).json({ message: 'User deleted'});
	}
}