export default function authHeader() {
	const user = JSON.parse(localStorage.getItem('user'));
	const language = document.querySelector('html')?.getAttribute('lang') || 'en, en-GB, en-US, en-AU, en-IN';

	if (user && user.accessToken) {
		// return { Authorization: 'Bearer ' + user.accessToken }; // for Spring Boot back-end
		return {
			'Content-Type': 'application/json',
			'Accept-Language': `${language};q=0.5`,
			'x-access-token': user.accessToken,
			'x-user-type': user.user_type,
		}; // for Node.js Express back-end
	}
	return {};
}
