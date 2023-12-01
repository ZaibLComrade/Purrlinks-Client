import PropTypes from "prop-types";

export default function Search({ setSearchString }) {
	const handleSearch = e => {
		e.preventDefault();
		const searchVal = e.target.search.value;
		setSearchString(searchVal)
	}
	
	return <form className="px-4 w-max" onSubmit={ handleSearch }>   
			<label htmlFor="default-search" className="mb-2 text-sm font-medium sr-only">Search</label>
			<div className="flex items-center justify-center gap-1">
				<div className="relative">
					<div className="absolute inset-y-0 flex items-center pointer-events-none start-0 ps-3">
						<svg className="w-4 h-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
							<path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
						</svg>
					</div>
					<input type="search" name="search" className="block p-4 text-sm border rounded-lg ps-10 focus:ring-blue-500 focus:border-blue-500 " placeholder="Browse purrs..." />
					<button type="submit" className="absolute right-0 px-4 py-4 text-sm font-medium text-white rounded-lg md:-right-20 top-px bg-primary hover:bg-primary/90 focus:ring-4 focus:outline-none focus:ring-blue-300">Search</button>
				</div>
				
			</div>
		</form>
}

Search.propTypes = {
	setSearchString: PropTypes.func,
}
