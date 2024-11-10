import { NextApiRequest, NextApiResponse } from 'next'

export interface IFileNextApiRequest extends NextApiRequest {
	file: {
		fieldname: string
		originalname: string
		encoding: string
		mimetype: string
		destination: string
		filename: string
		path: string
		size: number
	}
}