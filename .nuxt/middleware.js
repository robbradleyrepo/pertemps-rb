const middleware = {}

middleware['candidate/authenticated'] = require('..\\middleware\\candidate\\authenticated.ts');
middleware['candidate/authenticated'] = middleware['candidate/authenticated'].default || middleware['candidate/authenticated']

middleware['candidate/notAuthenticated'] = require('..\\middleware\\candidate\\notAuthenticated.ts');
middleware['candidate/notAuthenticated'] = middleware['candidate/notAuthenticated'].default || middleware['candidate/notAuthenticated']

middleware['consultant/authenticated'] = require('..\\middleware\\consultant\\authenticated.ts');
middleware['consultant/authenticated'] = middleware['consultant/authenticated'].default || middleware['consultant/authenticated']

middleware['consultant/notAuthenticated'] = require('..\\middleware\\consultant\\notAuthenticated.ts');
middleware['consultant/notAuthenticated'] = middleware['consultant/notAuthenticated'].default || middleware['consultant/notAuthenticated']

export default middleware
