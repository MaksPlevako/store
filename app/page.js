import Slider from './components/Slider'
import Categories from './components/categories'
import Oil from './components/Oil'
import Banners from './components/banners'
import Recommendation from './components/recommendation'
import OftenBuy from './components/oftenBuy'

export default function Home() {
	return (
		<div className='container mx-auto'>
			<Slider />
			<Categories />
			<Oil />
			<Banners />
			<Recommendation />
			<OftenBuy />
		</div>
	)
}
