<template>
	<section v-if="groupsToEdit" class="group-list-wrapper">
		<draggable
			class="group-list"
			handle=".group-wrapper"
			animation="500"
			v-model="groupsToEdit"
			@start="drag = true"
			@end="
				drag = false;
				saveGroups();
			"
			dragClass="ghost"
			ghostClass="tilted"
		>
			<div
				v-for="group in groupsToEdit"
				:key="group.id"
				class="group-wrapper"
			>
				<div class="group">
					<group-details
						:group="group"
						@updateGroup="updateGroup"
						@deleteGroup="deleteGroup"
						@saveGroups="saveGroups"
						@openBg="openBg"
					/>
				</div>
			</div>
			<div
				ref="addgroup"
				class="group-wrapper mod-add"
				:class="{ 'is-edit': isAddingGroup }"
			>
				<form v-if="isAddingGroup">
					<input
						class="group-name-input"
						type="text"
						name="name"
						ref="content"
						v-model="groupToEdit.title"
						placeholder="Enter list title…"
						autocomplete="off"
						dir="auto"
						v-click-outside="toggleGroupEdit"
					/>
					<div class="group-add-controls">
						<input
							class="btn-add-group"
							type="submit"
							value="Add list"
							@click="toggleGroupEdit"
						/>
						<a
							class="icon-lg icon-close"
							aria-label="Cancel list editing"
							@click="closeGroupEdit"
						></a>
					</div>
				</form>
				<a
					v-if="!isAddingGroup"
					class="open-add-list"
					@click="toggleGroupEdit"
				>
					<span class="icon-sm icon-add"></span>Add another list
				</a>
			</div>
		</draggable>
	</section>
	<!-- <loader v-else /> -->
</template>

<script>
import groupDetails from '@/cmps/group.details.vue';
import ClickOutside from 'vue-click-outside';
import draggable from 'vuedraggable';
export default {
	data() {
		return {
			isAddingGroup: false,
			groupsToEdit: null,
			groupToEdit: {
				id: this.makeId(),
				title: '',
				createdAt: Date.now(),
				cards: [],
			},
		};
	},
	components: {
		groupDetails,
		draggable,
	},
	methods: {
		openBg(){
			this.$emit('openBg')
		},
		saveGroups(newGroups) {
			var savedGroups;
			if (newGroups) {
				savedGroups = JSON.parse(JSON.stringify(newGroups));
			} else {
				savedGroups = JSON.parse(JSON.stringify(this.groupsToEdit));
			}
			this.$emit('boardUpdate', {
				type: 'groups',
				payload: savedGroups,
			});
		},
		updateGroup(savedGroup) {
			const idx = this.groupsToEdit.findIndex((group) => {
				return group.id === savedGroup.id;
			});
			idx !== -1
				? this.groupsToEdit.splice(idx, 1, savedGroup)
				: this.groupsToEdit.push(savedGroup);
			this.saveGroups();
		},
		saveGroup() {
			const savedGroup = { ...this.groupToEdit };
			savedGroup.id = this.makeId();
			this.updateGroup(savedGroup);
			this.groupToEdit.title = '';
		},
		deleteGroup(groupId) {
			const idx = this.groupsToEdit.findIndex((group) => {
				return group.id === groupId;
			});
			if (idx !== -1) this.groupsToEdit.splice(idx, 1);
			else return;
			this.saveGroups();
		},
		toggleGroupEdit() {
			this.isAddingGroup = !this.isAddingGroup;
			if (this.isAddingGroup) {
				this.$nextTick(() => {
					this.$refs.content.focus();
				});
			} else if (this.groupToEdit.title) this.saveGroup();
		},
		closeGroupEdit() {
			this.isAddingGroup = false;
			this.groupToEdit.title = '';
		},
		makeId(length = 5) {
			var text = '';
			var possible =
				'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
			for (var i = 0; i < length; i++) {
				text += possible.charAt(
					Math.floor(Math.random() * possible.length)
				);
			}
			return text;
		},
	},
	created() {
		this.groupsToEdit = JSON.parse(
			JSON.stringify(this.$store.getters.board.groups)
		);
	},
	mounted() {
		this.popupItem = this.$refs.addgroup;
	},
	directives: {
		ClickOutside,
	},
};
</script>
