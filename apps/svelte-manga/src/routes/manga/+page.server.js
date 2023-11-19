import { error, redirect } from '@sveltejs/kit';

export const load = ({ locals }) => {

};

/** @type {import('./$types').Actions} */
export const actions = {
	manga: async (event) => {
		const data = await event.request.formData();
		const email = data.get('email');
		const password = data.get('password');
		try {
			// Authenticate the user and get the token from the server
			await event.locals.pb.collection('users').authWithPassword(email, password);
			// get their IP address
			// console.log('event', event.getClientAddress());
		} catch (err) {
			if (err.data?.data?.identity?.message) {
				throw error(err.status, `Your email ${err.data?.data?.identity?.message}`);
			} else if (err.data?.data?.password?.message) {
				throw error(err.status, `Your password ${err.data?.data?.password?.message}`);
			} else {
				throw error(err.status, err.message);
			}
		}
		throw redirect(303, '/dashboard');
	}
};
