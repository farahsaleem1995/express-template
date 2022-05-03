function removeFalsyProperties(obj) {
	const result = Object.create({});
	Object.entries(obj).forEach(([key, value]) => {
		if (value) {
			result[key] = value;
		}
	});

	return result;
}

module.exports = {
	removeFalsyProperties,
};
