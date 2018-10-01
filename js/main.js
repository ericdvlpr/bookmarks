//listen for form submit
document.getElementById('myForm').addEventListener('submit',saveBookmark);

function saveBookmark(e){
	//get form value
	var	siteName = document.getElementById('siteName').value;
	var	siteUrl = document.getElementById('siteUrl').value;


	if(!validateForm(siteName,siteUrl)){
		return false;
	}
	var bookmark = {
		name: siteName,
		url:siteUrl
	}

	//localstorage
	// localStorage.setItem('test', 'Hello World');
	// localStorage.getItem('test');
	// localStorage.removeItem('test');
	if(localStorage.getItem('bookmarks')== null){
		//init array
		var bookmarks=[];
		//add to array
		bookmarks.push(bookmark);
		//set to local storage
		localStorage.setItem('bookmarks',JSON.stringify(bookmarks));

	}else{
		//get bookmarks from localstorage
		var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
		bookmarks.push(bookmark);
		//reset it to localstorage
		localStorage.setItem('bookmarks',JSON.stringify(bookmarks));
	}

	document.getElementById('myForm').reset();


	fetchBookmarks();

	//prevent form from submitting
	e.preventDefault();
}

function deleteBookmark(url){
	var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));

	for(var i = 0; i < bookmarks.length; i++){
		if(bookmarks[i].url==url){
			bookmarks.splice(i,1);
		}
	}
	localStorage.setItem('bookmarks',JSON.stringify(bookmarks));
	fetchBookmarks();
}

function fetchBookmarks(){
	var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));

	// get outputs id
	var bookmarksResults = document.getElementById('bookmarksResults');

	//buildouts
	bookmarksResults.innerHTML = "";
	for(var i = 0; i < bookmarks.length; i++){
		var name = bookmarks[i].name;
		var url = bookmarks[i].url;

		bookmarksResults.innerHTML += '<div class="well">'+
										'<h3>'+name+
										' <a class="btn btn-default" target="_blank" href="'+url+'">Visit</a>'+
										' <a onclick="deleteBookmark(\''+url+'\')" class="btn btn-danger" href="#">Delete</a>'
										'</h3/>'+'</div>';
	}
}
function validateForm(siteName,siteUrl){
	if(!siteName || !siteUrl){
		alert('Please Fill in the form');
		return false
	}


	var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
	var regex = new RegExp(expression);

	if(!siteUrl.match(regex)){
		alert('Please enter a valid url');
		return false;
	}
	return true;
}