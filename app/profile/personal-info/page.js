import ProfileLayout from '@/app/components/ProfileLayout'
import { auth } from '@/config/auth'

export default async function PersonalInfo() {
	const session = await auth()
	const res = await fetch(
		`http://localhost:3000/api/user/${session.user.email}`
	)
	const user = await res.json()
	if (!user) return null
	return (
		<ProfileLayout activeTab='personal-info'>
			<div className='text-2xl font-medium mb-6'>Персональная информация</div>
			<div className='border rounded-2xl bg-white p-8 shadow-2xl'>
				<form method='POST' action={`/api/user/${session.user.email}`}>
					<div className='relative  w-full mb-5 '>
						<input
							type='text'
							name='name'
							className='py-3 px-5 w-2/5 text-[18px] text-[#1B1D1F] border border-[#DEDEE2] rounded-lg focus:outline-none focus:ring-0 focus:border-blue-600 peer'
							defaultValue={user.name}
							required
						/>
						<label className='absolute text-sm text-[#55556D] duration-300 -top-2.5 left-3 z-10 scale-90 bg-white'>
							Фамілія та Ім'я
						</label>
					</div>
					<div className='relative  w-full mb-5 '>
						<input
							type='tel'
							name='phone'
							className='py-3 px-5 w-2/5 text-[18px] text-[#1B1D1F] border border-[#DEDEE2] rounded-lg focus:outline-none focus:ring-0 focus:border-blue-600 peer'
							defaultValue={user.phone}
							required
						/>
						<label className='absolute text-sm text-[#55556D] duration-300 -top-2.5 left-3 z-10 scale-90 bg-white'>
							Номер телефону
						</label>
					</div>
					<div className='relative w-full mb-5 '>
						<input
							type='email'
							name='email'
							className='py-3 px-5 w-2/5 text-[18px] text-[#1B1D1F] border border-[#DEDEE2] rounded-lg focus:outline-none focus:ring-0 focus:border-blue-600 peer'
							defaultValue={user.email}
							disabled
						/>
						<label className='absolute text-sm text-[#55556D] duration-300 -top-2.5 left-3 z-10 scale-90 bg-white'>
							Пошта
						</label>
					</div>
					<button
						type='submit'
						className='border rounded-lg bg-[#6B59CC] px-5 py-3 text-white'
					>
						Зберегти зміни
					</button>
				</form>
			</div>
		</ProfileLayout>
	)
}
