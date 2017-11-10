# Beyond Tube

TL;DR: [App deployed here](https://repo-lbrspevozl.now.sh/), code up there ^^

**Wadup Beyond chaps**

I've started a few universal React/Webpack shaped projects recently and found
the boilerplates/frameworks/starter kits available to be a bit.. shit. For 
lack of a more appropriate adjective.

There's https://github.com/kriasoft/react-starter-kit which is passable but
is just full of terrifying code and is just depressing to work with.

There's https://zeit.co/blog/next which is very well put together but aims
to completely abstract the Webpack configuration and build process, which is
a nice idea in theory but just doesn't work in practice, Webpack offers too
much valuable functionality and flexibility to be able to abstraced well.

And there are others that are immature/outdated/written by noobs.

I've been working on a foundation for universal React/Webpack apps a bit and
took this as an oppurtunity to build a little app on it. I think it's a solid
little build.

Anyway, life story aside, here's some more relevant stuff

## More Relevant Stuff

### About The App

It's using

- Webpack
- React v16
- React Router v4
- Redux
- Redux Saga
- Jest

I've aimed for simplicity and readability. The tech guys will be able to look
through the codebase and not get as angry as usual when looking at other peoples
code. The entire app, framework included weighs in at 924 lines of code.

### TODO

In real life, I would have cross browser tested more thoroughly. I
know there's one nasty bug in IE11 that's a show stopper, I'll probably try
and patch it up over the weekend before I get found out. See if you can spot it 🤗

The truncation of the video details on the list page is a pain as you all well
know. I'd put some more time in to that.

There's a loading page that is shown when navigating to the index page when
video data hasn't been loaded. That needs styling.

I didn't create responsive styles for the video description page. I don't feel
bad about it.

In production, I'd be more careful to santize the state output. It's very
unlikely that attack code would originate from a Google API but you have to be
safe by default.

The styles are basic. The entire stylesheet is less than 1kb.  It looks
fine, but for a real build I'd add header/footer and spend more time on
a cohesive feel.

It's mostly accessible. I'd spend more time ensuring keyboard/screen reader
usability if I was on the payroll and it was required.

Error checking and correction.. There's not much in the way of it. For a real
app responses from the API would need to be handled with a lot more care.

Testing; the server tests spin up an instance of the app for each test. It can
take a few seconds. I'd seperate these from the unit tests. The google API needs
mocking. 
