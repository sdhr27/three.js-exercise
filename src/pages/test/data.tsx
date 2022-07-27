const buildData = [
	{
		label: '抽取源',
		children: [
			{
				id: '111',
				label: '',
				coordinate: [11, 11],
				type: 'build2',
				post: ['121'],
			},
			{
				id: '112',
				label: '',
				coordinate: [11, 11],
				type: 'build1',
			},
			{
				id: '113',
				label: '',
				coordinate: [11, 11],
				type: 'build1',
			},
		]
	},
	{
		label: '抽取源',
		children: [
			{
				id: '121',
				label: '',
				coordinate: [11, 11],
				type: 'build1',
				pre: ['111'],
			},
			{
				id: '122',
				label: '',
				coordinate: [11, 11],
				type: 'build2',
			},
		]
	},
	{
		label: '抽取源',
		children: [
			{
				id: '211',
				label: '',
				coordinate: [11, 11],
				type: 'build1',
			},
			{
				id: '212',
				label: '',
				coordinate: [11, 11],
				type: 'build1',
			},
		]
	},
	{
		label: '抽取源',
		children: [
			{
				id: '311',
				label: '',
				coordinate: [11, 11],
				type: 'build1',
			},
			{
				id: '312',
				label: '',
				coordinate: [11, 11],
				type: 'build1',
			},
			{
				id: '313',
				label: '',
				coordinate: [11, 11],
				type: 'build1',
			},
		]
	},
];

const lineData = [
	[
    [-20,5,-10],
    [30,5,-15],
    [10,5,20],
		[400,5,40]
	],
]

export default {
	buildData,
	lineData,
}
