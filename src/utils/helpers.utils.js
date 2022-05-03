function removeFalsyProperties(obj) {
	const result = Object.create({});
	Object.entries(obj).forEach(([key, value]) => {
		if (value) {
			result[key] = value;
		}
	});

	return result;
}

function exclude(obj, excludedProperties) {
	const result = Object.create({});
	Object.entries(obj).forEach(([key, value]) => {
		if (!excludedProperties.includes(key)) {
			result[key] = value;
		}
	});

	return result;
}

function include(obj, includedProperties) {
	const result = Object.create({});
	Object.entries(obj).forEach(([key, value]) => {
		if (includedProperties.includes(key)) {
			result[key] = value;
		}
	});

	return result;
}

function transform(obj, transformations) {
	const srcProps = Object.keys(transformations);

	const result = Object.create({});
	Object.entries(obj).forEach(([key, value]) => {
		if (srcProps.includes(key)) {
			result[transformations[srcProps]] = value;
		} else {
			result[key] = value;
		}
	});

	return result;
}

module.exports = {
	removeFalsyProperties,
	exclude,
	include,
	transform,
};
