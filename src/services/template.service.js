import { utilService } from './util.service.js';

export const templateService = {
	query,
};

var gTemplates = [
	{
		title: 'Business',
		createdAt: Date.now(),
		createdBy: {
			_id: '',
			fullname: '',
			imgUrl: 'http://some-img',
		},
		style: {
			type: 'backgroundImage',
			content: require('@/assets/img/templates/business-large.jpg'),
			preview: require('@/assets/img/templates/business-small.jpg'),
		},
		labels: [
			{
				id: 'l101',
				title: 'Done',
				color: '#61bd4f',
			},
			{
				id: 'l102',
				title: 'Almost',
				color: '#f2d600',
			},
			{
				id: 'l103',
				title: 'Nice',
				color: '#ff78cb',
			},
			{
				id: 'l104',
				title: 'Bad',
				color: '#eb5a46',
			},
		],
		members: [],
		groups: [
			{
				id: utilService.makeId(),
				title: 'Your Template List',
				cards: [
					{
						id: utilService.makeId(),
						title: 'Make a business plan',
					},
					{
						id: utilService.makeId(),
						title: 'Add Samples',
					},
				],
			},
		],
		activities: [],
	},
	{
		title: 'Design',
		createdAt: Date.now(),
		createdBy: {
			_id: '',
			fullname: '',
			imgUrl: 'http://some-img',
		},
		style: {
			type: 'backgroundImage',
			content: require('@/assets/img/templates/design-large.jpg'),
			preview: require('@/assets/img/templates/design-small.jpg'),
		},
		labels: [],
		members: [],
		groups: [
			{
				id: utilService.makeId(),
				title: 'Your Template List',
				cards: [
					{
						id: utilService.makeId(),
						title: 'Make your first design',
					},
					{
						id: utilService.makeId(),
						title: 'Add Samples',
					},
				],
			},
		],
		activities: [],
	},
	{
		title: 'Education',
		createdAt: Date.now(),
		createdBy: {
			_id: '',
			fullname: '',
			imgUrl: 'http://some-img',
		},
		style: {
			type: 'backgroundImage',
			content: require('@/assets/img/templates/education-large.jpg'),
			preview: require('@/assets/img/templates/education-small.jpg'),
		},
		labels: [],
		members: [],
		groups: [
			{
				id: utilService.makeId(),
				title: 'Your Template List',
				cards: [
					{
						id: utilService.makeId(),
						title: 'Prepare your first lesson',
					},
					{
						id: utilService.makeId(),
						title: 'Add Samples',
					},
				],
			},
		],
		activities: [],
	},
	{
		title: 'Marketing',
		createdAt: Date.now(),
		createdBy: {
			_id: '',
			fullname: '',
			imgUrl: 'http://some-img',
		},
		style: {
			type: 'backgroundImage',
			content: require('@/assets/img/templates/marketing-large.jpg'),
			preview: require('@/assets/img/templates/marketing-small.jpg'),
		},
		labels: [],
		members: [],
		groups: [
			{
				id: utilService.makeId(),
				title: 'Your Template List',
				cards: [
					{
						id: utilService.makeId(),
						title: 'Make your first marketing plan',
					},
					{
						id: utilService.makeId(),
						title: 'Add Samples',
					},
				],
			},
		],
		activities: [],
	},
];

function query() {
	return gTemplates;
}
