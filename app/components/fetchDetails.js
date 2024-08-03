export default async function FetchDetails() {
	try {
		const res = await fetch('/api/details')
		const data = await res.json()
		return data
	} catch (err) {
		console.error('err', err)
		return []
	}
}
