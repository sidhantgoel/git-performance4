export default {
	EDIT_ALLOWED: ['rhitottam@appsmith.com', 'satish@appsmith.com'],
	isEditAllowed: () => {
		return (this.EDIT_ALLOWED.includes(appsmith.user.email));
	}
}