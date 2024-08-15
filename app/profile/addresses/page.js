import ProfileLayout from '@/app/components/ProfileLayout'
import { auth } from '@/config/auth'
import ButtonAddress from '@/app/components/ButtonAddress'
import TypeAddresses from '@/app/components/TypeAddresses'

export default async function Addresses() {
	const session = await auth()

	try {
		const resUser = await fetch(
			`http://localhost:3000/api/user/user?email=${session.user.email}`
		)
		if (!resUser.ok) throw new Error('Failed to fetch user data')
		const user = await resUser.json()

		const resAddresses = await fetch(
			`http://localhost:3000/api/user/address?user_id=${user._id}`
		)
		const addresses = await resAddresses.json()

		if (!user) return null
		if (!addresses) return null

		return (
			<ProfileLayout activeTab='addresses'>
				<div className='text-2xl font-medium mb-3.5 text-[#1B1D1F]'>
					Мої адреси
				</div>
				<div className='border rounded bg-white p-5 shadow-2xl'>
					{addresses.length > 0 ? (
						<TypeAddresses addresses={addresses} user_id={user._id} />
					) : (
						<div>Адреса не знайдено</div>
					)}
					<ButtonAddress user_id={user._id} />
				</div>
			</ProfileLayout>
		)
	} catch (error) {
		console.error('Error fetching data:', error)
		return <div>Произошла ошибка при загрузке данных</div>
	}
}
