const createMarkdown = (dimensions, points, image, imgSize) => {
	const mask =
		image && imgSize
			? `<image
			xlinkHref={image}
			mask="url(#mask)"
			x="${dimensions.width / 2 - imgSize.width / 2}"
			y="${dimensions.height / 2 - imgSize.height / 2}"
			transformOrigin={"center"}
		/>`
			: '<rect width="100%" height="100%" background=black mask="url(#mask)" transformOrigin={"center"} />';

	const pointText = points.map((p) => {
		return `<polygon points={"${p.map((e) => `${e.x},${e.y} `)}"}/>`;
	});

	const text = `<svg
				width="${dimensions.width}px"
				height="${dimensions.height}px"
				viewBox="0 0 ${dimensions.width} ${dimensions.height}"
				preserveAspectRatio="xMidYMid slice"
			>
				<defs>
					<filter id="filter">
						<feGaussianBlur stdDeviation="5" />
					</filter>
					<mask id="mask">
					${pointText}
					</mask>
				</defs>
				${mask}
			</svg>`;
	return text;
};

export { createMarkdown };
