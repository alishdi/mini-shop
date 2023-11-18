const image=document.getElementById('profile-img')
image.addEventListener('click',()=>{
	document.getElementById('status-options').classList.toggle('active')
})
$(".expand-button").click(function() {
  $("#profile").toggleClass("expanded");
	$("#contacts").toggleClass("expanded");
});

$("#status-options").click(() => {
	$("#status-options").toggleClass("active");
	$("#contacts").toggleClass("expanded");

})