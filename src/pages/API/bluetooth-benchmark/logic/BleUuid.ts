export function shortUUID(uuid : string) : string {
	const upper = uuid.toUpperCase()
	if (upper.length == 36 && upper.substring(0, 4) == '0000' && upper.substring(8) == '-0000-1000-8000-00805F9B34FB') return upper.substring(4, 8)
	return uuid
}
