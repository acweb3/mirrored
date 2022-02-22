export const formatDate = new Intl.DateTimeFormat("en", {
	timeStyle: "short",
	dateStyle: "short",
}).format;
