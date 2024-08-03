import Image from 'next/image'
import Link from 'next/link'
import ButtonCategories from './buttonCategories'
import Person from './Person'

export default function Header() {
	return (
		<header className='pt-6 mb-8 container mx-auto'>
			<div className='flex flex-row justify-between items-center'>
				<Link href='/' className='w-[200px] h-[40px] text-4xl'>
					LOGO
				</Link>
				<div className='w-2/5 relative'>
					<input
						type='search'
						spellCheck='false'
						placeholder='Введіть назву запчастини або VIN'
						className='border border-[#DEDEE2] rounded bg-[#F4F5F6] h-[44px] w-full focus:outline-none p-1 text-gray-500'
					/>
					<Image
						src='/img/search.svg'
						width={20}
						height={20}
						alt='search'
						className='absolute right-[10px] top-1/2 -translate-y-1/2 pointer'
					/>
				</div>
				<div className='flex flex-row'>
					<div className='flex flex-row items-center gap-2'>
						<Image src='/img/point.svg' width={20} height={20} alt='point' />
						<span>Київ</span>
					</div>
					<div className='flex flex-row gap-2 items-center mx-[50px] '>
						<Image src='/img/phone.svg' width={20} height={20} alt='phone' />
						<span className='font-bold'>+38(099)-666-19-81</span>
					</div>
					<Person />
				</div>
			</div>
			<div className='border w-full border-[#E3E3E8] my-6' />
			<div className='flex flex-row justify-between items-center'>
				<ButtonCategories />
				<nav className='flex flex-row gap-4 '>
					<Link href='/components_for_to'>Запчастини для ТО</Link>
					<Link href='/oils'>Автомасла</Link>
					<Link href='/original_components'>Оригінальні запчастини</Link>
					<Link href='/non-original_components'>Неоригінальні запчастини</Link>
					<Link href='/lightbulb'>Лампочки</Link>
					<Link href='/battery'>Акумулятори</Link>
				</nav>
				<button className='flex flex-row items-center border border-white rounded bg-[#F4F5F6] py-2 px-4'>
					<Image
						src='/img/shopping_cart.svg'
						width={32}
						height={32}
						alt='shopping-cart'
					/>
					<span className='mx-[10px] font-medium'>Корзина</span>
					<div className='border rounded-[50%] bg-orange-500 py-1 px-[10px] text-white text-sm'>
						2
					</div>
				</button>
			</div>
		</header>
	)
}
