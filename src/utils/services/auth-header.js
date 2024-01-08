export default function authHeader() {
	const user = JSON.parse(localStorage.getItem('user'));

	if (user && user.accessToken) {
		// return { Authorization: 'Bearer ' + user.accessToken }; // for Spring Boot back-end
		return {
			'Content-Type': 'application/json',
			'Accept-Language': 'en, en-GB, en-US, en-AU, en-IN;q=0.5',
			'x-access-token': user.accessToken,
		}; // for Node.js Express back-end
	}
	return {};
}
