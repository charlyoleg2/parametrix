/// <reference types="@sveltejs/kit" />
/// <reference no-default-lib="true"/>
/// <reference lib="esnext" />
/// <reference lib="webworker" />

// https://kit.svelte.dev/docs/service-workers#type-safety
const sw = self as unknown as ServiceWorkerGlobalScope;

import { base, version } from '$service-worker';

// Create a unique cache name for this deployment
const CACHE = `cache-${version}`;

// urls
const postUrl = `${base}/upload/design`;
const getUrl = `${base}/impDesign5432.js`;

const ASSETS = [getUrl];

//sw.addEventListener('install', (event) => {
//	// Create a new cache and add all files to it
//	async function addFilesToCache() {
//		const cache = await caches.open(CACHE);
//		await cache.addAll(ASSETS);
//	}
//
//	event.waitUntil(addFilesToCache());
//});

sw.addEventListener('activate', (event) => {
	// Remove previous cached data from disk
	async function deleteOldCaches() {
		for (const key of await caches.keys()) {
			if (key !== CACHE) await caches.delete(key);
		}
	}

	event.waitUntil(deleteOldCaches());
});

sw.addEventListener('fetch', (event) => {
	// only consider the two request: POST {base}/upload/design and GET {base}/impDesign5432.js
	const url = new URL(event.request.url);
	const ePOST = event.request.method === 'POST' && url.pathname === postUrl;
	const eGET = event.request.method === 'GET' && url.pathname === getUrl;
	if (!ePOST && !eGET) return;

	async function postRespond() {
		const cache = await caches.open(CACHE);
		const postBody = await event.request.blob();
		//const postBody = await event.request.text();

		cache.put(getUrl, new Response(postBody, { status: 200, statusText: 'OK' }));

		return new Response(null, { status: 201, statusText: 'OK' });
	}

	async function getRespond() {
		const cache = await caches.open(CACHE);

		// `build`/`files` can always be served from the cache
		if (ASSETS.includes(url.pathname)) {
			const response = await cache.match(url.pathname);

			if (response) {
				return response;
				//return new Response(`dbg878: version: ${version}`);
			} else {
				return new Response(`dbg781: GET URL: ${url.pathname}`);
			}
		} else {
			return new Response(`err784: Error with GET URL: ${url.pathname}`);
		}
	}

	function fallbackRespond() {
		const method = event.request.method;
		const respStr = `err233: method: ${method} :: URL: ${url.pathname}`;
		return new Response(respStr);
	}

	if (ePOST) {
		event.respondWith(postRespond());
	} else if (eGET) {
		event.respondWith(getRespond());
	} else {
		event.respondWith(fallbackRespond());
	}
});
