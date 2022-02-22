export const makeCursor = (uuid: string) =>
	Buffer.from("cursor_" + uuid).toString("base64");
