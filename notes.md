# CS 260 Notes

[My startup](https://simon.cs260.click)

## Helpful links

- [Course instruction](https://github.com/webprogramming260)
- [Canvas](https://byu.instructure.com)
- [MDN](https://developer.mozilla.org)

##  GitHub notes
learned: how to fork a repository, refresher on how to push and pull files and commit


## AWS Notes

behold! A modification!

Server address: 18.232.252.246

.pem is the key/value filetype we used

From the `cs4` folder (I guess we're never filling in the full class number now) (and I just realized that's actually the folder for the other cs class. welp) in git bash: `ssh -i 260totoro.pem ubuntu@18.232.252.246`

from the cs260 folder, it's `ssh -i ../cs4/260totoro.pem ubuntu@18.232.252.246`

in console, use `exit` to exit the ssh (this won't stop or terminate the server don't worry)

domain name: oldquizletlearn260.click




## HTML Notes
the  `a` in  `a href` stands for anchor, interesting!

besides `src`, `img` has other attributes including `width` and `alt` which sets the alt text. you can just put them all in the same tag.

Apparently there's a type of section in main called `<aside>` which I'm still not sure I completely understand, apparently it's for stuff that doesn't fit the main page's content? I'm not sure how it actually gets implemented differently but we'll probably find out soon.

`div` is a block, `span` is inline

## CSS Notes

I'm never quite sure what to put in these things

in flex displays, `justify-content` aligns items on the main axis and `align-items` aligns them on the other axis. `justify-content` options: `flex-start` for beginning, `flex-end` for right side/bottom/end, `center` for center. aso other options but those are the main three i think i particularly want to remember.

## React notes

I keep learning cool things but I'm never sure what to write in here about them. idk. react seems cool. I get the feeling that this stage of the project might be better suited for One Navbar On All Pages than what I'm doing, but let's try this!

alright, I got it basically working. I'm getting the vibe that I"ll be doing a lot of stuff with parameters in the next project, but I was probably going to regardless. also not sure when we'll be adding and using databases but that'll probably be a big part of it as well.

## react part 2 notes

Javascript destructuring -- 
if t is an array, then 
`const [b,c,d] = t` will set b to t[0], c to t[1], d to t[2], etc.
If t isn't long enough, the overflowing variable(s) becomes undefined.

`const [a, b, ...c] = t` will set a and b to t[0] and t[1], and then all the rest of t is stored in c as an array, like c becomes (python) t[2:-1] (does that notation in javascript? or just python?)

you can also set a default value for the variables in the start that they'll use if the list isn't long enough to include them.

### `react.useState` uses destructuring!

<small> also you can put `code blocks` inside headers in markdown!</small>

it returns... the inital value (that it had as a parameter) and a function that updates the variable/state to whatever is input... ok, i think i understand this, some of the stuff behind the scenes is still confusing but now I get why setColor or whatever function it is never needs to be defined elsewhere in the code. 

ok so what is an effect hook...
useState is a hook, and useEffect is a hook... I feel like I'm missing some information. Like what the difference is between a state & effect, and how you would access them outside of hooks. and how they relate to needing an object or class or something.

----
use `npm install` from the root directory to turn the packages.json etc into node_modules! *Once those are in* you can run `npm run dev` with vite. if that's in the packages/node modules ofc.

---
hm. I've been installing npm things in the service folder but it's not creating new package.json files, it's adding to the ones in the surrounding folder. that's... probably okay? NOPE IT'S NOT

We need to use `npm init -y` to set up the packages to start

13 mar 2025 -- ngl i am so lost right now. Something isn't working with the server and the front end connecting and I'm not sure where the problem is bc it could be any number of things bc I'm not really sure how it's supposed to work? I'm trying to base it off of simon but there's things like. like the vite.config file which I'm not sure if we're supposed to just *make* or if there's some npm thing we should call? aaaaagh