function getData(n: number) {
	const arr = [];
	for(let i = 0; i < n; i++) {
		arr.push({
			"name": "海门",
			"value": Math.random()*1000,
			"coordinate": [Math.random()*1000, Math.random()*1000],
		})
	}
	return arr;
}

export default getData(1111);