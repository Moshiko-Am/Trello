<template>
	<section v-if="groups" class="group-list">
		<div
			v-for="group in groups"
			v-bind:key="group.id"
			class="group-wrapper"
		>
			<div class="group">
				<group-details :group="group" />
			</div>
		</div>
	</section>
	<!-- <loader v-else /> -->
</template>

<script>
import groupDetails from '@/cmps/group.details.vue';
export default {
	props: {
		groups: Array,
	},
	components: {
		groupDetails,
	},
	// data() {
	//   return {
	//     groups: [
	//       {
	//         id: "g101",
	//         title: "Group 1",
	//         cards: [
	//           {
	//             id: "c101",
	//             title: "Replace logo",
	//           },
	//           {
	//             id: "c102",
	//             title: "Add Samples",
	//           },
	//         ],
	//       },
	//       {
	//         id: "g102",
	//         title: "Group 2",
	//         cards: [
	//           {
	//             id: "c103",
	//             title: "Do that",
	//           },
	//           {
	//             id: "c104",
	//             title: "Help me",
	//             description: "description",
	//             comments: [
	//               {
	//                 id: "ZdPnm",
	//                 txt: "also @yaronb please CR this",
	//                 createdAt: 1590999817436.0,
	//                 byMember: {
	//                   _id: "u101",
	//                   fullname: "Tal Tarablus",
	//                   imgUrl:
	//                     "http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg",
	//                 },
	//               },
	//             ],
	//             checklists: [
	//               {
	//                 id: "YEhmF",
	//                 title: "Checklist",
	//                 todos: [
	//                   {
	//                     id: "212jX",
	//                     title: "To Do 1",
	//                     isDone: false,
	//                   },
	//                 ],
	//               },
	//             ],
	//             members: [
	//               {
	//                 _id: "u101",
	//                 username: "Tal",
	//                 fullname: "Tal Tarablus",
	//                 imgUrl:
	//                   "http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg",
	//               },
	//             ],
	//             labelIds: ["l101", "l102"],
	//             createdAt: 1590999730348,
	//             dueDate: 16156215211,
	//             byMember: {
	//               _id: "u101",
	//               username: "Tal",
	//               fullname: "Tal Tarablus",
	//               imgUrl:
	//                 "http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg",
	//             },
	//             style: {
	//               bgColor: "#26de81",
	//             },
	//           },
	//         ],
	//         style: {},
	//       },
	//     ],
	//   };
	// },
};
</script>
