import { storageService } from './async-storage.service.js';

var gBoards = [
	{
		_id: 'b101',
		title: 'Front end',
		createdAt: 1589983468418,
		createdBy: {
			_id: 'u101',
			fullname: 'Abi Abambi',
			imgUrl: 'http://some-img',
		},
		style: {},
		labels: [
			{
				id: 'l101',
				title: 'Done',
				color: '#519839',
			},
			{
				id: 'l102',
				title: 'almost',
				color: '#f2d600',
			},
		],
		members: [
			{
				_id: 'u101',
				fullname: 'Tal Tarablus',
				imgUrl: 'https://www.google.com',
			},
		],
		groups: [
			{
				id: 'g101',
				title: 'Group 1',
				cards: [
					{
						id: 'c101',
						title: 'Replace logo',
					},
					{
						id: 'c102',
						title: 'Add Samples',
					},
				],
			},
			{
				id: 'g102',
				title: 'Group 2',
				cards: [
					{
						id: 'c103',
						title: 'Do that',
					},
					{
						id: 'c104',
						title: 'Help me',
						description: 'description',
						comments: [
							{
								id: 'ZdPnm',
								txt: 'also @yaronb please CR this',
								createdAt: 1590999817436.0,
								byMember: {
									_id: 'u101',
									fullname: 'Tal Tarablus',
									imgUrl:
										'http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg',
								},
							},
						],
						checklists: [
							{
								id: 'YEhmF',
								title: 'Checklist',
								todos: [
									{
										id: '212jX',
										title: 'To Do 1',
										isDone: false,
									},
								],
							},
						],
						members: [
							{
								_id: 'u101',
								username: 'Tal',
								fullname: 'Tal Tarablus',
								imgUrl:
									'http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg',
							},
						],
						labelIds: ['l101', 'l102'],
						createdAt: 1590999730348,
						dueDate: 16156215211,
						byMember: {
							_id: 'u101',
							username: 'Tal',
							fullname: 'Tal Tarablus',
							imgUrl:
								'http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg',
						},
						style: {
							bgColor: '#26de81',
						},
					},
				],
				style: {},
			},
		],
		activities: [
			{
				id: 'a101',
				txt: 'Changed Color',
				createdAt: 154514,
				byMember: {
					_id: 'u101',
					fullname: 'Abi Abambi',
					imgUrl: 'http://some-img',
				},
				card: {
					id: 'c101',
					title: 'Replace Logo',
				},
			},
		],
	},
];

const BOARD_KEY = 'boardsDB';

export const boardService = {
	query,
	getById,
};

query();

async function query() {
	try {
		const boards = await storageService.query(BOARD_KEY);
		if (!boards.length) {
			storageService.postMany(BOARD_KEY, gBoards);
			return gBoards;
		}
		return boards;
	} catch (err) {
		console.log(err);
	}
}

async function getById(boardId) {
	try {
		const board = await storageService.get(BOARD_KEY, boardId);
		return board;
	} catch (err) {
		console.log(err);
	}
}
