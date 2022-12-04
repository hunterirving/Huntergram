window.addEventListener('DOMContentLoaded', (event) => {
	/*disable image dragging*/
	addEventListener('dragstart',function(e){e.preventDefault()});

	/*store references to select elements*/
	cover_sheet = document.getElementById('cover_sheet');
	page_container = document.getElementById('page_container');
	big_image = document.getElementById('big_image');
	bio_container = document.getElementById('bio_container');
	description_container = document.getElementById('description_container');
	stats_container = document.getElementById('stats_container');
	content_container = document.getElementById('content_container');
	disappearing_border = document.getElementById('disappearing_border');
	heart = document.getElementById('heart');

	/*add event listener (and hideable class) to each 'content' div*/
	all_content = document.querySelectorAll('.content');
	all_content.forEach(content => {
		content.addEventListener('mousedown', embiggen);
		content.classList.add('fadeable');
	});

	/*add fadeable class to other divs*/
	bio_container.classList.add('fadeable');
	huntergram_logo.classList.add('fadeeable');
	huntergram_logo_container.classList.add('fadeable');
	description_container.classList.add('fadeable');
	stats_container.classList.add('fadeable');	
});

function embiggen(event) {
	/*if it exists, re-enable (the now old) active_content's fadeability*/
	if (typeof active_content !== 'undefined') {
		active_content.classList.add('fadeable');
	}

	/*store a reference to the selected 'content' div*/
	active_content = event.target.parentNode;

	/*temporarily freeze scrolling*/
	document.body.classList.add('stop-scrolling');

	/*set big_image src to user selection and make it visible*/
	big_image.src = event.target.src;
	big_image.style.display = "block";

	/*enable unbiggen trigger*/
	cover_sheet.style.pointerEvents = "auto";
	cover_sheet.addEventListener('click', unbiggen);
	
	/*allow big_image to recieve pointerEvents (for liking)*/
	big_image.style.cursor = "pointer";
	big_image.style.pointerEvents = "auto";

	/*fade out UI*/
	all_content.forEach(content => {
		content.classList.add('hidden');
	});
	bio_container.classList.add('hidden');
	huntergram_logo_container.classList.add('hidden');
	description_container.classList.add('hidden');
	stats_container.classList.add('hidden');
	disappearing_border.style.borderColor = "var(--pure_black)";
}

function unbiggen(event) {
	/*"like leak" protection*/
	heart.classList.add('no_animation');

	/*disable unbiggen trigger*/
	cover_sheet.style.pointerEvents = "none";
	cover_sheet.removeEventListener('click', unbiggen);

	/*disable pointerEvents for big_image (disable liking)*/
	big_image.style.cursor = "auto";
	big_image.style.pointerEvents = "none";
	
	/*re-enable scrolling*/
	document.body.classList.remove('stop-scrolling');

	/*fade in UI*/
	all_content.forEach(content => {
		if (content == active_content) {
			content.classList.remove('fadeable');
			content.classList.remove('hidden');
		}
		else {
			content.classList.remove('hidden');
		}
	});
	bio_container.classList.remove('hidden');
	huntergram_logo_container.classList.remove('hidden');
	description_container.classList.remove('hidden');
	stats_container.classList.remove('hidden');
	disappearing_border.style.borderColor = "var(--dark_grey)";

	/*hide big_image*/
	big_image.style.display = "none";
}

function incrementFollowerCount() {
	var follower_count = document.getElementById('follower_count');
	var value = parseInt(follower_count.innerHTML, 10);
	value = isNaN(value) ? 0 : value;
	value++;
	follower_count.innerHTML = value;
}

function toggleLike() {
	/*disable "like leak" protection*/
	heart.classList.remove('no_animation');

	/*update like state and  graphic*/
	if(active_content.classList.contains('liked')) {
		active_content.classList.remove('liked');
		heart.src="resources/empty_heart.svg";
	}
	else {
		active_content.classList.add('liked');
		heart.src="resources/filled_heart.svg";
	}

	/*play animation (hacky workaround since quickly removing and re-adding animation classes didn't work)*/
	if(!heart.classList.contains('heart_anim')){
		heart.classList.add('heart_anim');
	}
	else {
		heart.classList.toggle('alt');
	}
}

/* You can use this to obfuscate your email address enough that bots won't bother finding it. */
function rot(str) {
	var input     = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
	var output    = 'NOPQRSTUVWXYZABCDEFGHIJKLMnopqrstuvwxyzabcdefghijklm';
	var index     = x => input.indexOf(x);
	var translate = x => index(x) > -1 ? output[index(x)] : x;
	return str.split('').map(translate).join('');
}

function message() {
	window.location.replace("m" + "a" + "i" + "l" + "t" + "o" + ":" + rot("LbheEbgngrqRznvyNqqerffUrer") + "@yoursite.com?subject=( 1 ) Unread Message · huntergram");
}
