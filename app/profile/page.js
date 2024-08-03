import { auth } from '@/config/auth'
import ProfileLayout from '../components/ProfileLayout'

export default async function Profile() {
	const session = await auth()

	if (!session) return null

	return (
		<div className='container mx-auto'>
			<ProfileLayout />
		</div>
	)
}
