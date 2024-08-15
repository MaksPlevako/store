export default function CommentSlider({ comments }) {
	return (
		<div className='flex flex-cols justify-center gap-4'>
			{comments.map(comment => (
				<div key={comment._id} className='p-4 bg-white rounded shadow-md'>
					<div className='flex items-center space-x-2'>
						<div>{comment.comment}</div>
					</div>
					<p>{comment.rating}</p>
				</div>
			))}
		</div>
	)
}
