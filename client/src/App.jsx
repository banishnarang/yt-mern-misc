import { useState, useEffect } from "react";

// components
import Post from "./components/Post";
import EndAlert from "./components/EndAlert";

// api functions
import { read } from "./api/post";

const App = () => {
	const [posts, setPosts] = useState([]);
	const [skip, setSkip] = useState(0);
	const [isEnd, setIsEnd] = useState(false);

	useEffect(() => {
		fetchPosts();
	}, [skip]);

	const fetchPosts = async () => {
		try {
			const { data, error } = await read(skip);

			if (error) {
				console.log(error);
				return;
			}

			if (data?.length === 0) {
				setIsEnd(true);
				return;
			}

			// success
			setPosts([...posts, ...data]);
		} catch (error) {
			console.log(error.message);
		}
	};

	const handleScroll = (e) => {
		const { offsetHeight, scrollTop, scrollHeight } = e.target;

		if (offsetHeight + scrollTop >= scrollHeight) {
			setSkip(posts?.length);
		}
	};

	return (
		<div className="min-h-screen mt-8">
			<div className="text-center mb-14">
				<h1 className="text-4xl">MERN Miscellaneous</h1>
				<h1 className="text-3xl text-accent italic">Infinite scroll</h1>
			</div>

			<div className="h-screen overflow-scroll" onScroll={handleScroll}>
				{/* map all posts here */}
				{posts?.map((post) => (
					<Post key={post._id} {...post} />
				))}
			</div>
			{isEnd && <EndAlert />}
		</div>
	);
};

export default App;
