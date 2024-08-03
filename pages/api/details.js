const clientPromise = require('../../lib/mongodb')

export default async (req, res) => {
	if (
		!res ||
		typeof res.status !== 'function' ||
		typeof res.json !== 'function'
	) {
		console.error(
			'Response object is not defined or does not have the expected methods.'
		)
		return
	}
	try {
		const client = await clientPromise
		const db = client.db('store')
		const details = await db.collection('details').find({}).toArray()
		return res.status(200).json(details)
	} catch (e) {
		console.error('Error fetching details:', e)
		return res.status(500).json({ error: 'Internal Server Error' })
	}
}
