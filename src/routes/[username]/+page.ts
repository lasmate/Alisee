import type { PageLoad } from './$types';

export const load = (async ({params, fetch}) => {
    await fetch(`someURL/${params.username}`)

    return {
        name: 'jhonDoe',
        age: 30,
        sex: false
    };
}) satisfies PageLoad;