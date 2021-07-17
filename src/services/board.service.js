import { storageService } from './async-storage.service.js';

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
            preview: 'https://trello-backgrounds.s3.amazonaws.com/SharedBackground/2400x1600/04fb036055ac0ee5d25791708a70cdf7/photo-1625589934405-a180c2e53aa5.jpg',
        },
        labels: [{
                id: 'l101',
                title: 'Done',
                color: '#61bd4f',
            },
            {
                id: 'l102',
                title: 'almost',
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
        members: [{
                _id: 'u111',
                fullname: 'Tal Tarablus',
                imgUrl: 'https://www.google.com',
            },
            {
                _id: 'u102',
                fullname: 'Tom Becharovitch',
                imgUrl: 'https://www.google.com',
            },
            {
                _id: 'u103',
                fullname: 'Omri Baramosio',
                imgUrl: 'https://www.google.com',
            },
        ],
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
                        description: 'I am going to be better than trello , just give me a chance and i will show you',
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
                            },
                            {
                                id: 'YEsdahmF',
                                title: 'Checklist2',
                                todos: [{
                                        id: '212jX',
                                        title: 'To Do 1',
                                        isDone: false,
                                    },
                                    {
                                        id: '2112jX',
                                        title: 'To 1',
                                        isDone: false,
                                    },
                                    {
                                        id: '212yX',
                                        title: 'To Do 6',
                                        isDone: true,
                                    },
                                ],
                            },
                        ],
                        members: [{
                                _id: 'u101',
                                username: 'Tal',
                                fullname: 'Tal Tarablus',
                                imgUrl: 'http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg',
                            },
                            {
                                _id: 'u123',
                                username: 'Bob',
                                fullname: 'Bobi bottomless',
                                imgUrl: 'http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg',
                            },
                        ],
                        labelIds: ['l101', 'l102'],
                        createdAt: 1590999730348,
                        dueDate: "2021-08-12",
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
            },
            {
                id: 'a102',
                txt: 'Changed Color',
                createdAt: 154514,
                byMember: {
                    _id: 'u102',
                    fullname: 'Moshiko Amsalem',
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
                    fullname: 'Tom Becharovitch',
                    imgUrl: 'http://some-img',
                },
                card: {
                    id: 'c101',
                    title: 'Replace Logo',
                },
            },
        ],
    },
    {
        _id: 'b102',
        title: 'Backend',
        createdAt: 1589983468418,
        createdBy: {
            _id: 'u101',
            fullname: 'Abi Abambi',
            imgUrl: 'http://some-img',
        },
        style: {
            type: 'backgroundImage',
            content: 'https://images.unsplash.com/photo-1497032628192-86f99bcd76bc?crop=entropy&cs=srgb&fm=jpg&ixid=MnwyNDcwNjh8MHwxfHNlYXJjaHwxMXx8b2ZmaWNlfGVufDB8fHx8MTYyNjU0OTM2NA&ixlib=rb-1.2.1&q=85',
            preview: 'https://images.unsplash.com/photo-1497032628192-86f99bcd76bc?crop=entropy&cs=srgb&fm=jpg&ixid=MnwyNDcwNjh8MHwxfHNlYXJjaHwxMXx8b2ZmaWNlfGVufDB8fHx8MTYyNjU0OTM2NA&ixlib=rb-1.2.1&q=80&w=400',
        },
        labels: [{
                id: 'l101',
                title: 'Done',
                color: '#61bd4f',
            },
            {
                id: 'l102',
                title: 'almost',
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
        members: [{
                _id: 'u111',
                fullname: 'Tal Tarablus',
                imgUrl: 'https://www.google.com',
            },
            {
                _id: 'u102',
                fullname: 'Tom Becharovitch',
                imgUrl: 'https://www.google.com',
            },
            {
                _id: 'u103',
                fullname: 'Omri Baramosio',
                imgUrl: 'https://www.google.com',
            },
        ],
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
                        description: 'I am going to be better than trello , just give me a chance and i will show you',
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
                            },
                            {
                                id: 'YEsdahmF',
                                title: 'Checklist2',
                                todos: [{
                                        id: '212jX',
                                        title: 'To Do 1',
                                        isDone: false,
                                    },
                                    {
                                        id: '2112jX',
                                        title: 'To 1',
                                        isDone: false,
                                    },
                                    {
                                        id: '212yX',
                                        title: 'To Do 6',
                                        isDone: true,
                                    },
                                ],
                            },
                        ],
                        members: [{
                                _id: 'u101',
                                username: 'Tal',
                                fullname: 'Tal Tarablus',
                                imgUrl: 'http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg',
                            },
                            {
                                _id: 'u123',
                                username: 'Bob',
                                fullname: 'Bobi bottomless',
                                imgUrl: 'http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg',
                            },
                        ],
                        labelIds: ['l101', 'l102'],
                        createdAt: 1590999730348,
                        dueDate: "2021-08-12",
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
            },
            {
                id: 'a102',
                txt: 'Changed Color',
                createdAt: 154514,
                byMember: {
                    _id: 'u102',
                    fullname: 'Moshiko Amsalem',
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
                    fullname: 'Tom Becharovitch',
                    imgUrl: 'http://some-img',
                },
                card: {
                    id: 'c101',
                    title: 'Replace Logo',
                },
            },
        ],
    },
    {
        _id: 'b103',
        title: 'Woohoo',
        createdAt: 1589983468418,
        createdBy: {
            _id: 'u101',
            fullname: 'Abi Abambi',
            imgUrl: 'http://some-img',
        },
        style: {
            type: 'backgroundImage',
            content: 'https://images.unsplash.com/photo-1606857521015-7f9fcf423740?crop=entropy&cs=srgb&fm=jpg&ixid=MnwyNDcwNjh8MHwxfHNlYXJjaHw4fHxvZmZpY2V8ZW58MHx8fHwxNjI2NTQ5MzY0&ixlib=rb-1.2.1&q=85',
            preview: 'https://images.unsplash.com/photo-1606857521015-7f9fcf423740?crop=entropy&cs=srgb&fm=jpg&ixid=MnwyNDcwNjh8MHwxfHNlYXJjaHw4fHxvZmZpY2V8ZW58MHx8fHwxNjI2NTQ5MzY0&ixlib=rb-1.2.1&q=80&w=400'
        },
        labels: [{
                id: 'l101',
                title: 'Done',
                color: '#61bd4f',
            },
            {
                id: 'l102',
                title: 'almost',
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
        members: [{
                _id: 'u111',
                fullname: 'Tal Tarablus',
                imgUrl: 'https://www.google.com',
            },
            {
                _id: 'u102',
                fullname: 'Tom Becharovitch',
                imgUrl: 'https://www.google.com',
            },
            {
                _id: 'u103',
                fullname: 'Omri Baramosio',
                imgUrl: 'https://www.google.com',
            },
        ],
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
                        description: 'I am going to be better than trello , just give me a chance and i will show you',
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
                            },
                            {
                                id: 'YEsdahmF',
                                title: 'Checklist2',
                                todos: [{
                                        id: '212jX',
                                        title: 'To Do 1',
                                        isDone: false,
                                    },
                                    {
                                        id: '2112jX',
                                        title: 'To 1',
                                        isDone: false,
                                    },
                                    {
                                        id: '212yX',
                                        title: 'To Do 6',
                                        isDone: true,
                                    },
                                ],
                            },
                        ],
                        members: [{
                                _id: 'u101',
                                username: 'Tal',
                                fullname: 'Tal Tarablus',
                                imgUrl: 'http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg',
                            },
                            {
                                _id: 'u123',
                                username: 'Bob',
                                fullname: 'Bobi bottomless',
                                imgUrl: 'http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg',
                            },
                        ],
                        labelIds: ['l101', 'l102'],
                        createdAt: 1590999730348,
                        dueDate: "2021-08-12",
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
            },
            {
                id: 'a102',
                txt: 'Changed Color',
                createdAt: 154514,
                byMember: {
                    _id: 'u102',
                    fullname: 'Moshiko Amsalem',
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
                    fullname: 'Tom Becharovitch',
                    imgUrl: 'http://some-img',
                },
                card: {
                    id: 'c101',
                    title: 'Replace Logo',
                },
            },
        ],
    },
    {
        _id: 'b104',
        title: 'Life sucks',
        createdAt: 1589983468418,
        createdBy: {
            _id: 'u101',
            fullname: 'Abi Abambi',
            imgUrl: 'http://some-img',
        },
        style: {
            type: 'backgroundImage',
            content: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?crop=entropy&cs=srgb&fm=jpg&ixid=MnwyNDcwNjh8MHwxfHNlYXJjaHw0fHxkb2dzfGVufDB8fHx8MTYyNjU0OTM0NA&ixlib=rb-1.2.1&q=85',
            preview: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?crop=entropy&cs=srgb&fm=jpg&ixid=MnwyNDcwNjh8MHwxfHNlYXJjaHw0fHxkb2dzfGVufDB8fHx8MTYyNjU0OTM0NA&ixlib=rb-1.2.1&q=80&w=400',
        },
        labels: [{
                id: 'l101',
                title: 'Done',
                color: '#61bd4f',
            },
            {
                id: 'l102',
                title: 'almost',
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
        members: [{
                _id: 'u111',
                fullname: 'Tal Tarablus',
                imgUrl: 'https://www.google.com',
            },
            {
                _id: 'u102',
                fullname: 'Tom Becharovitch',
                imgUrl: 'https://www.google.com',
            },
            {
                _id: 'u103',
                fullname: 'Omri Baramosio',
                imgUrl: 'https://www.google.com',
            },
        ],
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
                        description: 'I am going to be better than trello , just give me a chance and i will show you',
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
                            },
                            {
                                id: 'YEsdahmF',
                                title: 'Checklist2',
                                todos: [{
                                        id: '212jX',
                                        title: 'To Do 1',
                                        isDone: false,
                                    },
                                    {
                                        id: '2112jX',
                                        title: 'To 1',
                                        isDone: false,
                                    },
                                    {
                                        id: '212yX',
                                        title: 'To Do 6',
                                        isDone: true,
                                    },
                                ],
                            },
                        ],
                        members: [{
                                _id: 'u101',
                                username: 'Tal',
                                fullname: 'Tal Tarablus',
                                imgUrl: 'http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg',
                            },
                            {
                                _id: 'u123',
                                username: 'Bob',
                                fullname: 'Bobi bottomless',
                                imgUrl: 'http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg',
                            },
                        ],
                        labelIds: ['l101', 'l102'],
                        createdAt: 1590999730348,
                        dueDate: "2021-08-12",
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
            },
            {
                id: 'a102',
                txt: 'Changed Color',
                createdAt: 154514,
                byMember: {
                    _id: 'u102',
                    fullname: 'Moshiko Amsalem',
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
                    fullname: 'Tom Becharovitch',
                    imgUrl: 'http://some-img',
                },
                card: {
                    id: 'c101',
                    title: 'Replace Logo',
                },
            },
        ],
    },
    {
        _id: 'b106',
        title: 'Fullstack',
        createdAt: 1589983468418,
        createdBy: {
            _id: 'u101',
            fullname: 'Abi Abambi',
            imgUrl: 'http://some-img',
        },
        style: {
            type: 'backgroundImage',
            content: 'https://images.unsplash.com/photo-1471922694854-ff1b63b20054?crop=entropy&cs=srgb&fm=jpg&ixid=MnwyNDcwNjh8MHwxfHNlYXJjaHwxMXx8c3VufGVufDB8fHx8MTYyNjU0OTU4Ng&ixlib=rb-1.2.1&q=85',
            preview: 'https://images.unsplash.com/photo-1471922694854-ff1b63b20054?crop=entropy&cs=srgb&fm=jpg&ixid=MnwyNDcwNjh8MHwxfHNlYXJjaHwxMXx8c3VufGVufDB8fHx8MTYyNjU0OTU4Ng&ixlib=rb-1.2.1&q=80&w=400',
        },
        labels: [{
                id: 'l101',
                title: 'Done',
                color: '#61bd4f',
            },
            {
                id: 'l102',
                title: 'almost',
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
        members: [{
                _id: 'u111',
                fullname: 'Tal Tarablus',
                imgUrl: 'https://www.google.com',
            },
            {
                _id: 'u102',
                fullname: 'Tom Becharovitch',
                imgUrl: 'https://www.google.com',
            },
            {
                _id: 'u103',
                fullname: 'Omri Baramosio',
                imgUrl: 'https://www.google.com',
            },
        ],
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
                        description: 'I am going to be better than trello , just give me a chance and i will show you',
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
                            },
                            {
                                id: 'YEsdahmF',
                                title: 'Checklist2',
                                todos: [{
                                        id: '212jX',
                                        title: 'To Do 1',
                                        isDone: false,
                                    },
                                    {
                                        id: '2112jX',
                                        title: 'To 1',
                                        isDone: false,
                                    },
                                    {
                                        id: '212yX',
                                        title: 'To Do 6',
                                        isDone: true,
                                    },
                                ],
                            },
                        ],
                        members: [{
                                _id: 'u101',
                                username: 'Tal',
                                fullname: 'Tal Tarablus',
                                imgUrl: 'http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg',
                            },
                            {
                                _id: 'u123',
                                username: 'Bob',
                                fullname: 'Bobi bottomless',
                                imgUrl: 'http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg',
                            },
                        ],
                        labelIds: ['l101', 'l102'],
                        createdAt: 1590999730348,
                        dueDate: "2021-08-12",
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
            },
            {
                id: 'a102',
                txt: 'Changed Color',
                createdAt: 154514,
                byMember: {
                    _id: 'u102',
                    fullname: 'Moshiko Amsalem',
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
                    fullname: 'Tom Becharovitch',
                    imgUrl: 'http://some-img',
                },
                card: {
                    id: 'c101',
                    title: 'Replace Logo',
                },
            },
        ],
    },
    {
        _id: 'b105',
        title: 'Life\'s great!',
        createdAt: 1589983468418,
        createdBy: {
            _id: 'u101',
            fullname: 'Abi Abambi',
            imgUrl: 'http://some-img',
        },
        style: {
            type: 'backgroundImage',
            content: 'https://images.unsplash.com/photo-1541599540903-216a46ca1dc0?crop=entropy&cs=srgb&fm=jpg&ixid=MnwyNDcwNjh8MHwxfHNlYXJjaHwxNXx8ZG9nc3xlbnwwfHx8fDE2MjY1NDkzNDQ&ixlib=rb-1.2.1&q=85',
            preview: 'https://images.unsplash.com/photo-1541599540903-216a46ca1dc0?crop=entropy&cs=srgb&fm=jpg&ixid=MnwyNDcwNjh8MHwxfHNlYXJjaHwxNXx8ZG9nc3xlbnwwfHx8fDE2MjY1NDkzNDQ&ixlib=rb-1.2.1&q=80&w=400',
        },
        labels: [{
                id: 'l101',
                title: 'Done',
                color: '#61bd4f',
            },
            {
                id: 'l102',
                title: 'almost',
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
        members: [{
                _id: 'u111',
                fullname: 'Tal Tarablus',
                imgUrl: 'https://www.google.com',
            },
            {
                _id: 'u102',
                fullname: 'Tom Becharovitch',
                imgUrl: 'https://www.google.com',
            },
            {
                _id: 'u103',
                fullname: 'Omri Baramosio',
                imgUrl: 'https://www.google.com',
            },
        ],
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
                        description: 'I am going to be better than trello , just give me a chance and i will show you',
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
                            },
                            {
                                id: 'YEsdahmF',
                                title: 'Checklist2',
                                todos: [{
                                        id: '212jX',
                                        title: 'To Do 1',
                                        isDone: false,
                                    },
                                    {
                                        id: '2112jX',
                                        title: 'To 1',
                                        isDone: false,
                                    },
                                    {
                                        id: '212yX',
                                        title: 'To Do 6',
                                        isDone: true,
                                    },
                                ],
                            },
                        ],
                        members: [{
                                _id: 'u101',
                                username: 'Tal',
                                fullname: 'Tal Tarablus',
                                imgUrl: 'http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg',
                            },
                            {
                                _id: 'u123',
                                username: 'Bob',
                                fullname: 'Bobi bottomless',
                                imgUrl: 'http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg',
                            },
                        ],
                        labelIds: ['l101', 'l102'],
                        createdAt: 1590999730348,
                        dueDate: "2021-08-12",
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
            },
            {
                id: 'a102',
                txt: 'Changed Color',
                createdAt: 154514,
                byMember: {
                    _id: 'u102',
                    fullname: 'Moshiko Amsalem',
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
                    fullname: 'Tom Becharovitch',
                    imgUrl: 'http://some-img',
                },
                card: {
                    id: 'c101',
                    title: 'Replace Logo',
                },
            },
        ],
    },
    {
        _id: 'b107',
        title: 'Urgent Tasks',
        createdAt: 1589983468418,
        createdBy: {
            _id: 'u101',
            fullname: 'Abi Abambi',
            imgUrl: 'http://some-img',
        },
        style: {
            type: 'backgroundImage',
            content: 'https://images.unsplash.com/photo-1598965914211-6ec6872593a6?crop=entropy&cs=srgb&fm=jpg&ixid=MnwyNDcwNjh8MHwxfHNlYXJjaHwyMHx8c3VufGVufDB8fHx8MTYyNjU0OTU4Ng&ixlib=rb-1.2.1&q=85',
            preview: 'https://images.unsplash.com/photo-1598965914211-6ec6872593a6?crop=entropy&cs=srgb&fm=jpg&ixid=MnwyNDcwNjh8MHwxfHNlYXJjaHwyMHx8c3VufGVufDB8fHx8MTYyNjU0OTU4Ng&ixlib=rb-1.2.1&q=80&w=400',
        },
        labels: [{
                id: 'l101',
                title: 'Done',
                color: '#61bd4f',
            },
            {
                id: 'l102',
                title: 'almost',
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
        members: [{
                _id: 'u111',
                fullname: 'Tal Tarablus',
                imgUrl: 'https://www.google.com',
            },
            {
                _id: 'u102',
                fullname: 'Tom Becharovitch',
                imgUrl: 'https://www.google.com',
            },
            {
                _id: 'u103',
                fullname: 'Omri Baramosio',
                imgUrl: 'https://www.google.com',
            },
        ],
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
                        description: 'I am going to be better than trello , just give me a chance and i will show you',
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
                            },
                            {
                                id: 'YEsdahmF',
                                title: 'Checklist2',
                                todos: [{
                                        id: '212jX',
                                        title: 'To Do 1',
                                        isDone: false,
                                    },
                                    {
                                        id: '2112jX',
                                        title: 'To 1',
                                        isDone: false,
                                    },
                                    {
                                        id: '212yX',
                                        title: 'To Do 6',
                                        isDone: true,
                                    },
                                ],
                            },
                        ],
                        members: [{
                                _id: 'u101',
                                username: 'Tal',
                                fullname: 'Tal Tarablus',
                                imgUrl: 'http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg',
                            },
                            {
                                _id: 'u123',
                                username: 'Bob',
                                fullname: 'Bobi bottomless',
                                imgUrl: 'http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg',
                            },
                        ],
                        labelIds: ['l101', 'l102'],
                        createdAt: 1590999730348,
                        dueDate: "2021-08-12",
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
            },
            {
                id: 'a102',
                txt: 'Changed Color',
                createdAt: 154514,
                byMember: {
                    _id: 'u102',
                    fullname: 'Moshiko Amsalem',
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
                    fullname: 'Tom Becharovitch',
                    imgUrl: 'http://some-img',
                },
                card: {
                    id: 'c101',
                    title: 'Replace Logo',
                },
            },
        ],
    },
    {
        _id: 'b108',
        title: 'Chillin\'',
        createdAt: 1589983468418,
        createdBy: {
            _id: 'u101',
            fullname: 'Abi Abambi',
            imgUrl: 'http://some-img',
        },
        style: {
            type: 'backgroundImage',
            content: 'https://images.unsplash.com/photo-1592609931095-54a2168ae893?crop=entropy&cs=srgb&fm=jpg&ixid=MnwyNDcwNjh8MHwxfHNlYXJjaHwxfHxqYXZhc2NyaXB0fGVufDB8fHx8MTYyNjU0OTYzMA&ixlib=rb-1.2.1&q=85',
            preview: 'https://images.unsplash.com/photo-1592609931095-54a2168ae893?crop=entropy&cs=srgb&fm=jpg&ixid=MnwyNDcwNjh8MHwxfHNlYXJjaHwxfHxqYXZhc2NyaXB0fGVufDB8fHx8MTYyNjU0OTYzMA&ixlib=rb-1.2.1&q=80&w=400'
        },
        labels: [{
                id: 'l101',
                title: 'Done',
                color: '#61bd4f',
            },
            {
                id: 'l102',
                title: 'almost',
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
        members: [{
                _id: 'u111',
                fullname: 'Tal Tarablus',
                imgUrl: 'https://www.google.com',
            },
            {
                _id: 'u102',
                fullname: 'Tom Becharovitch',
                imgUrl: 'https://www.google.com',
            },
            {
                _id: 'u103',
                fullname: 'Omri Baramosio',
                imgUrl: 'https://www.google.com',
            },
        ],
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
                        description: 'I am going to be better than trello , just give me a chance and i will show you',
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
                            },
                            {
                                id: 'YEsdahmF',
                                title: 'Checklist2',
                                todos: [{
                                        id: '212jX',
                                        title: 'To Do 1',
                                        isDone: false,
                                    },
                                    {
                                        id: '2112jX',
                                        title: 'To 1',
                                        isDone: false,
                                    },
                                    {
                                        id: '212yX',
                                        title: 'To Do 6',
                                        isDone: true,
                                    },
                                ],
                            },
                        ],
                        members: [{
                                _id: 'u101',
                                username: 'Tal',
                                fullname: 'Tal Tarablus',
                                imgUrl: 'http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg',
                            },
                            {
                                _id: 'u123',
                                username: 'Bob',
                                fullname: 'Bobi bottomless',
                                imgUrl: 'http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg',
                            },
                        ],
                        labelIds: ['l101', 'l102'],
                        createdAt: 1590999730348,
                        dueDate: "2021-08-12",
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
            },
            {
                id: 'a102',
                txt: 'Changed Color',
                createdAt: 154514,
                byMember: {
                    _id: 'u102',
                    fullname: 'Moshiko Amsalem',
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
                    fullname: 'Tom Becharovitch',
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
    const addedBoard = storageService.post(BOARD_KEY, board);

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