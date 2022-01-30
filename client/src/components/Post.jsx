import React from "react";

const Post = ({ avatar, username, image, caption }) => {
	return (
		<div className="card shadow-sm bg-neutral text-accent-content mx-8 md:mx-36 lg:mx-80 mb-28">
			<div className="flex my-3">
				<div className="avatar">
					<div className="mx-4 rounded-full w-12 h-12">
						<img src={avatar} alt="avatar" />
					</div>
				</div>
				<div className="self-center font-bold">{username}</div>
			</div>
			<figure>
				<img src={image} alt="Post" />
			</figure>
			<div className="mx-4 my-3">
				<p>
					<span className="font-bold">{username}</span>
					<span className="ml-2 text-sm">{caption}</span>
				</p>
			</div>
		</div>
	);
};

export default Post;
