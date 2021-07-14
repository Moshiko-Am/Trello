import { storageService } from './async-storage.service.js';

<<<<<<< HEAD
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
		style: {
			type: 'backgroundImage',
			content:
				'https://trello-backgrounds.s3.amazonaws.com/SharedBackground/2400x1600/04fb036055ac0ee5d25791708a70cdf7/photo-1625589934405-a180c2e53aa5.jpg',
		},
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
			{
				id: 'a102',
				txt: 'Changed Color',
				createdAt: 154514,
				byMember: {
					_id: 'u102',
					fullname: 'Omri Baram',
					imgUrl: 'http://some-img',
				},
				card: {
					id: 'c101',
					title: 'Replace Logo',
				},
			},
			{
				id: 'a103',
				txt: 'Changed Color',
				createdAt: 154514,
				byMember: {
					_id: 'u103',
					fullname: 'Tom Bechar',
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
=======
var gBoards = [{
    _id: 'b101',
    title: 'Front end',
    createdAt: 1589983468418,
    createdBy: {
        _id: 'u101',
        fullname: 'Abi Abambi',
        imgUrl: 'http://some-img',
    },
    style: {
        type: 'backgroundImage',
        content: 'https://trello-backgrounds.s3.amazonaws.com/SharedBackground/2400x1600/04fb036055ac0ee5d25791708a70cdf7/photo-1625589934405-a180c2e53aa5.jpg',
    },
    labels: [{
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
    members: [{
        _id: 'u101',
        fullname: 'Tal Tarablus',
        imgUrl: 'https://www.google.com',
    }, ],
    groups: [{
            id: 'g101',
            title: 'Group 1',
            cards: [{
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
            id: 'g202',
            title: 'Group 2',
            cards: [{
                    id: 'c103',
                    title: 'Do that',
                },
                {
                    id: 'c104',
                    title: 'Help me',
                    description: 'description',
                    comments: [{
                        id: 'ZdPnm',
                        txt: 'also @yaronb please CR this',
                        createdAt: 1590999817436.0,
                        byMember: {
                            _id: 'u101',
                            fullname: 'Tal Tarablus',
                            imgUrl: 'http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg',
                        },
                    }, ],
                    checklists: [{
                        id: 'YEhmF',
                        title: 'Checklist',
                        todos: [{
                            id: '212jX',
                            title: 'To Do 1',
                            isDone: false,
                        }, ],
                    }, ],
                    members: [{
                        _id: 'u101',
                        username: 'Tal',
                        fullname: 'Tal Tarablus',
                        imgUrl: 'http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg',
                    }, ],
                    labelIds: ['l101', 'l102'],
                    createdAt: 1590999730348,
                    dueDate: 16156215211,
                    byMember: {
                        _id: 'u101',
                        username: 'Tal',
                        fullname: 'Tal Tarablus',
                        imgUrl: 'http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg',
                    },
                    style: {
                        bgColor: '#26de81',
                    },
                },
            ],
            style: {},
        },
        {
            id: 'g111',
            title: 'Group 1',
            cards: [{
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
            id: 'g121',
            title: 'Group 1',
            cards: [{
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
            id: 'g131',
            title: 'Group 1',
            cards: [{
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
            id: 'g141',
            title: 'Group 1',
            cards: [{
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
            id: 'g151',
            title: 'Group 1',
            cards: [{
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
            id: 'g161',
            title: 'Group 1',
            cards: [{
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
            id: 'g171',
            title: 'Group 1',
            cards: [{
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
            id: 'g181',
            title: 'Group 1',
            cards: [{
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
            id: 'g191',
            title: 'Group 1',
            cards: [{
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
            id: 'g201',
            title: 'Group 1',
            cards: [{
                    id: 'c101',
                    title: 'Replace logo',
                },
                {
                    id: 'c102',
                    title: 'Add Samples',
                },
            ],
        },
        
    ],
    activities: [{
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
    }, ],
}, ];
>>>>>>> dfe330affb337f492b96ee41ef42abbfabf67217

const BOARD_KEY = 'boardsDB';

export const boardService = {
	query,
	getById,
	remove,
	add,
	save,
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

function remove(boardId) {
	// return httpService.delete(`board/${boardId}`)
	return storageService.delete('board', boardId);
}
async function add(board) {
	// const addedBoard = await httpService.post(`board`, board)

	// board.byUser = userService.getLoggedinUser()
	// board.aboutUser = await userService.getById(board.aboutUserId)
	const addedBoard = storageService.post('board', board);

	return addedBoard;
}

async function save(boardToSave) {
	try {
		const savedBoard = await storageService.put(BOARD_KEY, boardToSave);
		return savedBoard;
	} catch (err) {
		console.log(`couldn't save board`, err);
	}
}
